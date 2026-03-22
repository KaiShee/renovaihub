import { NextResponse } from "next/server";

const typeMultipliers = {
  Kitchen: 1.35,
  Bathroom: 1.25,
  "Full Home": 1.5,
  Exterior: 1.1,
  Commercial: 1.65,
};

const getNumberEnv = (name, fallback) => {
  const value = Number(process.env[name]);
  return Number.isFinite(value) ? value : fallback;
};

const ESTIMATOR_BASE_RATE_PER_SQFT = getNumberEnv("ESTIMATOR_BASE_RATE_PER_SQFT", 115);
const ESTIMATOR_MIN_AREA = getNumberEnv("ESTIMATOR_MIN_AREA", 100);
const ESTIMATOR_MIN_BUDGET = getNumberEnv("ESTIMATOR_MIN_BUDGET", 5000);
const ESTIMATOR_RUSH_MONTH_THRESHOLD = getNumberEnv("ESTIMATOR_RUSH_MONTH_THRESHOLD", 4);
const ESTIMATOR_RUSH_PREMIUM = getNumberEnv("ESTIMATOR_RUSH_PREMIUM", 1.18);
const ESTIMATOR_LOW_RANGE_FACTOR = getNumberEnv("ESTIMATOR_LOW_RANGE_FACTOR", 0.88);
const ESTIMATOR_HIGH_RANGE_FACTOR = getNumberEnv("ESTIMATOR_HIGH_RANGE_FACTOR", 1.16);

export async function POST(request) {
  try {
    const payload = await request.json();
    const {
      name,
      email,
      projectType,
      areaSqft,
      budget,
      targetMonths,
    } = payload;

    if (!name || !email || !projectType || !areaSqft || !budget || !targetMonths) {
      return NextResponse.json(
        { error: "Missing required fields for estimate generation." },
        { status: 400 }
      );
    }

    const safeArea = Math.max(Number(areaSqft), ESTIMATOR_MIN_AREA);
    const safeBudget = Math.max(Number(budget), ESTIMATOR_MIN_BUDGET);
    const safeMonths = Math.max(Number(targetMonths), 1);

    const typeFactor = typeMultipliers[projectType] || 1.2;
    const complexityCost = safeArea * ESTIMATOR_BASE_RATE_PER_SQFT * typeFactor;
    const schedulePremium =
      safeMonths < ESTIMATOR_RUSH_MONTH_THRESHOLD ? ESTIMATOR_RUSH_PREMIUM : 1.0;

    const recommended = complexityCost * schedulePremium;
    const estimatedMin = Math.round(recommended * ESTIMATOR_LOW_RANGE_FACTOR);
    const estimatedMax = Math.round(recommended * ESTIMATOR_HIGH_RANGE_FACTOR);

    const budgetGap = recommended - safeBudget;
    const timelinePlan = [
      "Week 1-2: Scope confirmation and contractor alignment",
      "Week 3-4: Material selections and permit prep",
      "Execution phase: Build in milestone sprints with weekly reviews",
      budgetGap > 0
        ? `Budget risk detected: add about $${Math.round(budgetGap).toLocaleString()} contingency or reduce scope`
        : "Budget range is healthy for this scope",
    ];

    return NextResponse.json({
      lead: {
        name,
        email,
        projectType,
      },
      estimatedMin,
      estimatedMax,
      timelinePlan,
    });
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }
}
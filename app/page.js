"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const projectTypes = [
  "Kitchen",
  "Bathroom",
  "Full Home",
  "Exterior",
  "Commercial",
];

const processStages = [
  {
    title: "Initial Consultation",
    description:
      "We visit your site, understand your priorities, and align scope, budget, and timeline from day one.",
    image: "/images/Stage1.jpeg",
  },
  {
    title: "Proposal & Planning",
    description:
      "You receive a clear proposal with scope options, pricing visibility, and practical execution sequencing.",
    image: "/images/Stage2.jpeg",
  },
  {
    title: "Execution & Coordination",
    description:
      "Our team coordinates trades, materials, and milestones so progress stays controlled and transparent.",
    image: "/images/Stage3.jpeg",
  },
  {
    title: "Completion & Handover",
    description:
      "Final checks, quality touch-ups, and handover with confidence that every detail is complete.",
    image: "/images/Stage4.jpeg",
  },
];

export default function HomePage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "Kitchen",
    areaSqft: "",
    budget: "",
    targetMonths: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [estimate, setEstimate] = useState(null);

  const canSubmit = useMemo(() => {
    return (
      form.name.trim() &&
      form.email.trim() &&
      form.areaSqft.trim() &&
      form.budget.trim() &&
      form.targetMonths.trim()
    );
  }, [form]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus("");
    setEstimate(null);
    setLoading(true);

    try {
      const response = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          areaSqft: Number(form.areaSqft),
          budget: Number(form.budget),
          targetMonths: Number(form.targetMonths),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to calculate estimate.");
      }

      setEstimate(data);
      setStatus("Estimate generated and lead captured successfully.");
    } catch (error) {
      setStatus(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-shell">
      <div className="mesh" aria-hidden="true" />

      <section className="panel home-hero-panel">
        <div className="home-hero-wrap">
          <div className="hero-copy">
            <p className="kicker">RenovAIHub</p>
            <h1>Plan smart. Build confidently. Deliver on time.</h1>
            <p className="lede">
              A modern renovation workflow that helps clients understand each stage before
              work starts, from consultation to handover.
            </p>
            <div className="cta-row">
              <Link href="/projects" className="btn-primary">
                See Project Process
              </Link>
              <Link href="/contact" className="btn-ghost">
                Talk to Our Team
              </Link>
            </div>
          </div>

          <div className="logo-stage">
            <Image
              src="/images/Logo.jpeg"
              alt="RenovAIHub brand logo"
              width={360}
              height={360}
              className="hero-logo"
              priority
            />
            <p className="logo-tag">Trusted Renovation Planning Partner</p>
          </div>
        </div>
      </section>

      <section className="panel home-process-panel">
        <div className="home-process-head">
          <p className="kicker">Our Process</p>
          <h2>Four clear steps your renovation will go through</h2>
          <p>
            Show clients exactly what happens at each stage, so expectations are aligned and
            delivery is smoother.
          </p>
        </div>

        <div className="process-showcase">
          {processStages.map((stage, index) => (
            <article
              key={stage.title}
              className={`process-showcase-card ${index % 2 === 1 ? "reverse" : ""}`}
            >
              <div className="process-showcase-image">
                <Image
                  src={stage.image}
                  alt={stage.title}
                  width={720}
                  height={480}
                  className="stage-image"
                />
              </div>
              <div className="process-showcase-copy">
                <p className="process-step-label">Step {String(index + 1).padStart(2, "0")}</p>
                <h3>{stage.title}</h3>
                <p>{stage.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Project Estimator</h2>
        <form onSubmit={onSubmit} className="estimator-form">
          <label>
            Full name
            <input name="name" value={form.name} onChange={onChange} required />
          </label>

          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={onChange} required />
          </label>

          <label>
            Project type
            <select name="projectType" value={form.projectType} onChange={onChange}>
              {projectTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <label>
            Area (sqft)
            <input
              name="areaSqft"
              type="number"
              min="100"
              value={form.areaSqft}
              onChange={onChange}
              required
            />
          </label>

          <label>
            Budget (USD)
            <input
              name="budget"
              type="number"
              min="5000"
              value={form.budget}
              onChange={onChange}
              required
            />
          </label>

          <label>
            Target timeline (months)
            <input
              name="targetMonths"
              type="number"
              min="1"
              value={form.targetMonths}
              onChange={onChange}
              required
            />
          </label>

          <button disabled={!canSubmit || loading} type="submit">
            {loading ? "Calculating..." : "Generate Estimate"}
          </button>
        </form>

        <p className="status" role="status">
          {status}
        </p>

        {estimate ? (
          <article className="result" aria-live="polite">
            <h3>Estimated Range</h3>
            <p>
              ${estimate.estimatedMin.toLocaleString()} - ${estimate.estimatedMax.toLocaleString()}
            </p>
            <h4>Suggested Roadmap</h4>
            <ol>
              {estimate.timelinePlan.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </article>
        ) : null}
      </section>
    </main>
  );
}
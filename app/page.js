"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const projectTypes = [
  "Kitchen",
  "Bathroom",
  "Full Home",
  "Exterior",
  "Commercial",
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
    <main className="page-shell home-page">
      <div className="mesh" aria-hidden="true" />
      <section className="home-hero">
        <div className="home-hero-copy">
          <p className="kicker">RenovAIHub</p>
          <h1>Build with confident planning, then execute with worker precision.</h1>
          <p className="lede">
            A high-trust renovation platform for scope, timeline and budget control.
            Show clients every step clearly and move from estimate to execution faster.
          </p>
          <div className="home-cta-row">
            <Link href="/projects" className="home-btn home-btn-primary">
              Explore Project Flow
            </Link>
            <Link href="/contact" className="home-btn home-btn-ghost">
              Start A Conversation
            </Link>
          </div>
          <div className="hero-stat-row" aria-label="Platform highlights">
            <article className="hero-stat">
              <span>Lead Time</span>
              <strong>-22%</strong>
            </article>
            <article className="hero-stat">
              <span>Budget Visibility</span>
              <strong>Real-time</strong>
            </article>
            <article className="hero-stat">
              <span>Process Steps</span>
              <strong>4 Stages</strong>
            </article>
          </div>
        </div>

        <div className="worker-stage" aria-hidden="true">
          <div className="worker-grid">
            <span className="cube c1" />
            <span className="cube c2" />
            <span className="cube c3" />
            <span className="cube c4" />
            <span className="cube c5" />
            <span className="cube c6" />
            <span className="cube c7" />
            <span className="cube c8" />
            <span className="cube c9" />
          </div>

          <div className="worker worker-a">
            <span className="worker-helmet" />
            <span className="worker-head" />
            <span className="worker-body" />
          </div>

          <div className="worker worker-b">
            <span className="worker-helmet" />
            <span className="worker-head" />
            <span className="worker-body" />
          </div>

          <span className="light-beam" />
        </div>
      </section>

      <section className="content-grid home-pillars">
        <article className="panel home-panel">
          <h3>Scope Intelligence</h3>
          <p>
            We break large renovation goals into practical, staged execution scopes so teams
            can approve faster.
          </p>
        </article>
        <article className="panel home-panel">
          <h3>Budget Signal Engine</h3>
          <p>
            Get informed budget ranges and timeline pressure warnings before committing to
            contractor schedules.
          </p>
        </article>
        <article className="panel home-panel">
          <h3>Weekly Execution Rhythm</h3>
          <p>
            Keep stakeholders aligned through clear milestones, procurement checkpoints, and
            progress narratives.
          </p>
        </article>
      </section>

      <section className="panel estimator-panel">
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
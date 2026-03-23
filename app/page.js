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
    <main className="page-shell home-layout">
      <section className="home-hero-banner full-bleed">
        <Image
          src="/images/Stage2.jpeg"
          alt="Construction and renovation background"
          fill
          priority
          className="hero-banner-image"
        />
        <div className="hero-banner-overlay" />
        <div className="hero-banner-inner site-container">
          <p className="hero-label">RenovAIHub</p>
          <h1>Reliable. Affordable. Trusted renovation partner.</h1>
          <p>
            Seamless end-to-end renovation delivery with transparent process, controlled
            timeline and quality handover.
          </p>
          <div className="hero-actions">
            <Link href="/projects" className="hero-btn primary">
              View Projects
            </Link>
            <Link href="/contact" className="hero-btn ghost">
              Get A Quote
            </Link>
          </div>
        </div>
      </section>

      <section className="home-intro-section">
        <div className="intro-copy-block">
          <p className="kicker">Into Renovation</p>
          <h2>Built for clear client communication from day one</h2>
          <p>
            Our team works closely with clients from consultation to completion, prioritizing
            safety, efficiency and practical planning at every stage.
          </p>
          <Link href="/contact" className="btn-primary">
            Start Free Consultation
          </Link>
        </div>
        <div className="intro-logo-block">
          <Image
            src="/images/Logo.jpeg"
            alt="RenovAIHub logo"
            width={520}
            height={520}
            className="intro-logo"
          />
        </div>
      </section>

      <section className="home-process-strip">
        <div className="home-process-headline">
          <h2>Project Stages</h2>
          <p>
            A systematic 4-stage approach to keep every renovation smooth, accountable and
            client-friendly.
          </p>
        </div>
        <div className="home-process-grid">
          {processStages.map((stage, index) => (
            <article key={stage.title} className="home-process-item">
              <span className="process-badge">{String(index + 1).padStart(2, "0")}</span>
              <h3>{stage.title}</h3>
              <p>{stage.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-gallery-section">
        {processStages.map((stage, index) => (
          <article key={`${stage.title}-image`} className="gallery-row">
            <div className="gallery-image-wrap">
              <Image
                src={stage.image}
                alt={`${stage.title} visual`}
                width={960}
                height={620}
                className="gallery-image"
              />
            </div>
            <div className="gallery-copy-wrap">
              <p className="kicker">Step {String(index + 1).padStart(2, "0")}</p>
              <h3>{stage.title}</h3>
              <p>{stage.description}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="panel home-estimator-panel">
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

      <section className="home-cta-band full-bleed">
        <div className="site-container cta-band-inner">
          <h2>Ready to Start Your Project?</h2>
          <p>Contact us for a free consultation and let&apos;s plan your renovation properly.</p>
          <div className="cta-row">
            <Link href="/contact" className="btn-primary">
              Get A Quote
            </Link>
            <a href="https://wa.me/601131228278" className="btn-ghost" target="_blank" rel="noreferrer">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
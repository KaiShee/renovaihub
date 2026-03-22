const services = [
  {
    title: "AI Scope Definition",
    description:
      "Translate rough renovation ideas into detailed work packages, dependencies, and delivery checkpoints.",
  },
  {
    title: "Cost Planning",
    description:
      "Estimate realistic range bands with sensitivity analysis for timeline pressure and finish-grade upgrades.",
  },
  {
    title: "Vendor Coordination",
    description:
      "Generate bid-ready summaries and handoff packets that reduce confusion between owners and contractors.",
  },
  {
    title: "Execution Tracking",
    description:
      "Monitor phase completion and flag milestone risk early before delays cascade into rework.",
  },
];

export const metadata = {
  title: "RenovAIHub | Services",
  description: "Explore RenovAIHub services for renovation planning and execution.",
};

export default function ServicesPage() {
  return (
    <main className="stack-page">
      <section className="hero compact">
        <p className="kicker">Services</p>
        <h1>Built to support every stage of a renovation cycle.</h1>
        <p className="lede">
          From concept framing to handover, these services help teams make faster, cleaner
          decisions with fewer surprises.
        </p>
      </section>

      <section className="content-grid two">
        {services.map((service) => (
          <article key={service.title} className="panel">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
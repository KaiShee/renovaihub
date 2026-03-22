export default function ProcessTimeline() {
  const steps = [
    {
      number: 1,
      title: "Initial Consultation",
      description: "We will conduct a site visit with the client to understand the scope of work, budget and the timeline.",
      icon: "🤝",
    },
    {
      number: 2,
      title: "Proposal Stage",
      description: "We create detailed plans, proposals and costing based on your requirements.",
      icon: "📋",
    },
    {
      number: 3,
      title: "Discussion & Execution",
      description: "Meet with the client to discuss the proposal if there are any changes to the plans, then our skilled team executes the project according to the approved plans and specifications.",
      icon: "👷",
    },
    {
      number: 4,
      title: "Completion & Handover",
      description: "We conduct a final inspection, make any necessary adjustments, and hand over the completed project.",
      icon: "✅",
    },
  ];

  return (
    <section className="process-section">
      <div className="site-container">
        <div className="process-header">
          <h2>Our Project Process</h2>
          <p>We follow a systematic approach to ensure quality and efficiency in every project</p>
        </div>

        <div className="timeline-container">
          {steps.map((step) => (
            <div key={step.number} className={`timeline-step step-${step.number}`}>
              <div className="timeline-dot">{step.number}</div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

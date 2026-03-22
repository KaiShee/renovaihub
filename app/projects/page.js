const projects = [
  {
    name: "Harbor Kitchen Modernization",
    scope: "Kitchen",
    outcome: "Delivered 3 weeks earlier with 8% under revised budget plan.",
  },
  {
    name: "Greenline Office Retrofit",
    scope: "Commercial",
    outcome: "Reduced fit-out downtime by sequencing trades with dependency mapping.",
  },
  {
    name: "Hillcrest Full Home Refresh",
    scope: "Full Home",
    outcome: "Avoided permit bottlenecks through early risk signals and phased submissions.",
  },
];

export const metadata = {
  title: "RenovAIHub | Projects",
  description: "Sample renovation projects coordinated with RenovAIHub workflows.",
};

export default function ProjectsPage() {
  return (
    <main className="stack-page">
      <section className="hero compact">
        <p className="kicker">Projects</p>
        <h1>Examples of renovation delivery outcomes.</h1>
        <p className="lede">
          A quick look at how structured planning and weekly execution visibility can improve
          confidence and project velocity.
        </p>
      </section>

      <section className="content-grid">
        {projects.map((project) => (
          <article key={project.name} className="panel">
            <p className="pill">{project.scope}</p>
            <h3>{project.name}</h3>
            <p>{project.outcome}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
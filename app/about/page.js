export const metadata = {
  title: "RenovAIHub | About",
  description: "Learn about the RenovAIHub mission and approach.",
};

export default function AboutPage() {
  return (
    <main className="stack-page">
      <section className="hero compact">
        <p className="kicker">About</p>
        <h1>We help teams renovate with less uncertainty.</h1>
        <p className="lede">
          RenovAIHub was created for owners, designers, and delivery teams who need a practical
          control center for real renovation work, not just spreadsheet chaos.
        </p>
      </section>

      <section className="panel">
        <h3>Our Method</h3>
        <ul className="clean-list">
          <li>Define scope clearly before contractor alignment.</li>
          <li>Build budget ranges with confidence intervals.</li>
          <li>Convert strategy into weekly execution rituals.</li>
        </ul>
      </section>
    </main>
  );
}
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

export default function Home() {
  return (
    <Layout
      title="Field charging cases"
      description="Documentation for rugged field charging cases, built so drone and reconnaissance positions do not have to depend on EcoFlow."
    >
      <main className="container margin-vert--xl">
        <h1>Fuck Ecoflow</h1>
        <p>
          Documentation for a rugged charging case — a box you can open and
          start working from — so field positions can charge tablets and
          batteries without depending on expensive EcoFlow stations that are
          hard to carry in and harder to evacuate.
        </p>
        <p>
          <Link className="button button--primary button--lg" to="/docs/intro">
            Start here
          </Link>{' '}
          <Link
            className="button button--secondary button--lg"
            to="/docs/charging-station"
          >
            Charging station
          </Link>{' '}
          <Link
            className="button button--secondary button--lg"
            to="/docs/00-problem/problem-statement/english-version"
          >
            Why this exists
          </Link>
        </p>
      </main>
    </Layout>
  );
}

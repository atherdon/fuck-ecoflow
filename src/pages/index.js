import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

export default function Home() {
  return (
    <Layout
      title="Documentation"
      description="Engineering notes, charging-station cases, and field documentation">
      <main className="container margin-vert--xl">
        <h1>Fuck Ecoflow documentation</h1>
        <p>
          Engineering notes, charging-station cases, communication material,
          team information, and product experiments.
        </p>
        <p>
          <Link className="button button--primary button--lg" to="/docs/communication/intro">
            Open documentation
          </Link>
        </p>
      </main>
    </Layout>
  );
}

import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import Layout from '@theme/Layout';

export default function Home() {
  return (
    <Layout
      title={translate({
        id: 'homepage.title',
        message: 'Field charging cases',
      })}
      description={translate({
        id: 'homepage.description',
        message:
          'Documentation for rugged field charging cases, built so drone and reconnaissance positions do not have to depend on EcoFlow.',
      })}
    >
      <main className="container margin-vert--xl">
        <h1>Fuck Ecoflow</h1>
        <p>
          <Translate id="homepage.intro">
            Documentation for a rugged charging case — a box you can open and
            start working from — so field positions can charge tablets and
            batteries without depending on expensive EcoFlow stations that are
            hard to carry in and harder to evacuate.
          </Translate>
        </p>
        <p>
          <Link className="button button--primary button--lg" to="/docs/intro">
            <Translate id="homepage.button.startHere">Start here</Translate>
          </Link>{' '}
          <Link
            className="button button--secondary button--lg"
            to="/docs/charging-station"
          >
            <Translate id="homepage.button.chargingStation">
              Charging station
            </Translate>
          </Link>{' '}
          <Link
            className="button button--secondary button--lg"
            to="/docs/00-problem/problem-statement"
          >
            <Translate id="homepage.button.whyThisExists">
              Why this exists
            </Translate>
          </Link>
        </p>
      </main>
    </Layout>
  );
}

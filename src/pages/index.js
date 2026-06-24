import React from 'react';
import Link from '@docusaurus/Link';

export default function Home() {
  return (
    <main style={{padding: '4rem 1rem', textAlign: 'center'}}>
      <h1>Fuck Ecoflow Docs</h1>
      <p>Project documentation and working notes.</p>
      <p>
        <Link to="/docs/communication/intro">Open the documentation</Link>
      </p>
    </main>
  );
}

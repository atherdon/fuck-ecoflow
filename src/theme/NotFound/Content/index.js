import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';

export default function NotFoundContent({ className }) {
  return (
    <main className={clsx('container margin-vert--xl', className)}>
      <div className="row">
        <div className="col col--6 col--offset-3">
          <Heading as="h1" className="hero__title">
            Page not found
          </Heading>
          <p>
            That address is not a page on this site. These starting points may
            help:
          </p>
          <ul>
            <li>
              <Link to="/docs/intro">Start here</Link>
            </li>
            <li>
              <Link to="/docs/how-to-read-this-site">
                How to read this site
              </Link>
            </li>
            <li>
              <Link to="/docs/charging-station">Charging station</Link>
            </li>
            <li>
              <Link to="/docs/00-problem/problem-statement/english-version">
                Problem statement
              </Link>
            </li>
            <li>
              <Link to="/docs/team">Team</Link>
            </li>
            <li>
              <Link to="/docs/reports">Reports</Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}

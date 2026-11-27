import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';

export default function NotFoundContent({ className }) {
  return (
    <main className={clsx('container margin-vert--xl', className)}>
      <div className="row">
        <div className="col col--6 col--offset-3">
          <Heading as="h1" className="hero__title">
            <Translate id="theme.NotFound.title">Page not found</Translate>
          </Heading>
          <p>
            <Translate id="notFound.intro">
              That address is not a page on this site. These starting points may
              help:
            </Translate>
          </p>
          <ul>
            <li>
              <Link to="/docs/intro">
                <Translate id="notFound.link.startHere">Start here</Translate>
              </Link>
            </li>
            <li>
              <Link to="/docs/glossary">
                <Translate id="notFound.link.glossary">Glossary</Translate>
              </Link>
            </li>
            <li>
              <Link to="/docs/charging-station">
                <Translate id="notFound.link.chargingStation">
                  Charging station
                </Translate>
              </Link>
            </li>
            <li>
              <Link to="/docs/00-problem/problem-statement">
                <Translate id="notFound.link.problemStatement">
                  Problem statement
                </Translate>
              </Link>
            </li>
            <li>
              <Link to="/docs/team">
                <Translate id="notFound.link.team">Team</Translate>
              </Link>
            </li>
            <li>
              <Link to="/docs/reports">
                <Translate id="notFound.link.reports">Reports</Translate>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}

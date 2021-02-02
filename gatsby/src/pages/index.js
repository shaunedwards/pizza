import React from 'react';

import SEO from '../components/SEO';
import ItemGrid from '../components/ItemGrid';
import { HomePageGrid } from '../styles/Grids';
import useLatestData from '../utils/useLatestData';
import LoadingGrid from '../components/LoadingGrid';

function HotSlices({ hotSlices }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark">Hot Slices</span>
      </h2>
      <p>Come and get them while they're hot!</p>
      {!hotSlices && <LoadingGrid count={4} />}
      {hotSlices && !hotSlices?.length && (
        <p>Looks like the case is empty at the moment...</p>
      )}
      {hotSlices?.length && <ItemGrid items={hotSlices} />}
    </div>
  );
}

function CurrentlySlicing({ slicemasters }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark">Active Slicers</span>
      </h2>
      <p>Standing by with their pizza wheels!</p>
      {!slicemasters && <LoadingGrid count={4} />}
      {slicemasters && !slicemasters?.length && (
        <p>Sorry, we're closed! Check back tomorrow...</p>
      )}
      {slicemasters?.length && <ItemGrid items={slicemasters} />}
    </div>
  );
}

export default function HomePage() {
  const { hotSlices, slicemasters } = useLatestData();
  return (
    <>
      <SEO title="Hot Now" />
      <div className="center">
        <h1>The Best Pizza Downtown!</h1>
        <p>Open 11am to 11pm every single day</p>
        <HomePageGrid>
          <CurrentlySlicing slicemasters={slicemasters} />
          <HotSlices hotSlices={hotSlices} />
        </HomePageGrid>
      </div>
    </>
  );
}

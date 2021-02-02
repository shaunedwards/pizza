import React from 'react';

import Layout from './src/components/Layout';
import { OrderProvider } from './src/components/OrderContext';

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}

export function wrapRootElement({ element }) {
  return <OrderProvider>{element}</OrderProvider>;
}

export function shouldUpdateScroll({
  routerProps: { location },
  getSavedScrollPosition,
}) {
  const pagesToRetainScrollPosition = ['pizzas', 'topping', 'slicemasters'];
  const retainScrollPosition = pagesToRetainScrollPosition.some((page) =>
    location.pathname.includes(page)
  );
  if (retainScrollPosition) {
    const currentPosition = getSavedScrollPosition(location);
    window.scrollTo(currentPosition || [0, 0]);
    return false;
  }
}

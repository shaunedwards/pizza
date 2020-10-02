import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/SEO';
import PizzaList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';

export default function PizzasPage({ data, pageContext }) {
  const { topping } = pageContext;
  const pizzas = data.pizzas.nodes;
  return (
    <>
      <SEO title={topping ? `Pizzas With ${topping}` : 'All Pizzas'} />
      <ToppingsFilter />
      <PizzaList pizzas={pizzas} />
    </>
  );
}

export const query = graphql`
  query PizzaQuery($topping: String) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { eq: $topping } } } }
    ) {
      nodes {
        id
        name
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;

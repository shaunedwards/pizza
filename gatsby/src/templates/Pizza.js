import React from 'react';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import SEO from '../components/SEO';

const PizzaGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  @media (max-width: 800px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
  @media (max-width: 540px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`;

export default function SinglePizzaPage({ data }) {
  const { pizza } = data;
  const isVegetarian = pizza.toppings.every((topping) => topping.vegetarian);
  return (
    <>
      <SEO title={pizza.name} image={pizza.image?.asset?.fluid?.src} />
      <PizzaGrid>
        <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
        <div>
          <h2 className="mark">{pizza.name}</h2>
          <ul>
            {pizza.toppings.map((topping) => (
              <li key={topping.id}>{topping.name}</li>
            ))}
          </ul>
          {isVegetarian && <p>** Suitable for vegetarians **</p>}
        </div>
      </PizzaGrid>
    </>
  );
}

export const query = graphql`
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      id
      name
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        id
        name
        vegetarian
      }
    }
  }
`;

import React from 'react';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';
import styled from 'styled-components';

const NameStyles = styled.h2`
  margin-top: -2.5rem;
  z-index: 2;
  font-size: 4rem;
  position: relative;
  transform: rotate(-1deg);
`;

export default function SingleSlicemasterPage({ data }) {
  const { slicemaster } = data;
  return (
    <div className="center">
      <Img fluid={slicemaster.image.asset.fluid} alt={slicemaster.name} />
      <NameStyles>
        <span className="mark">{slicemaster.name}</span>
      </NameStyles>
      <p>{slicemaster.description}</p>
    </div>
  );
}

export const query = graphql`
  query($slug: String!) {
    slicemaster: sanityPerson(slug: { current: { eq: $slug } }) {
      name
      description
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;

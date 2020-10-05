import { useState, useEffect } from 'react';

const gql = String.raw;

const fields = gql`
  _id
  name
  image {
    asset {
      url
      metadata {
        lqip
      }
    }
  }
`;

export default function useLatestData() {
  const [hotSlices, setHotSlices] = useState();
  const [slicemasters, setSlicemasters] = useState();
  useEffect(() => {
    async function fetchStoreSettings() {
      const response = await fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: gql`
            query {
              settings: StoreSettings(id: "downtown") {
                hotSlices {
                  ${fields}
                }
                activeSlicemasters {
                  ${fields}
                }
              }
            }
          `,
        }),
      });
      const { data } = await response.json();
      setHotSlices(data.settings.hotSlices);
      setSlicemasters(data.settings.activeSlicemasters);
    }
    fetchStoreSettings();
  }, []);
  return {
    hotSlices,
    slicemasters,
  };
}

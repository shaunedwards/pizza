import dotenv from 'dotenv';

dotenv.config();

export default {
  siteMetadata: {
    title: 'Slicks Slices',
    siteUrl: 'https://pizza.sme.dev',
    description: 'The best pizza place in town!',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: '0h8bfptx',
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};

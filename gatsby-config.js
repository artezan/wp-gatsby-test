module.exports = {
  siteMetadata: {
    title: 'Gatsby + WordPress Starter',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        // The base url to your WP site. www.theartezan.xyz wpdemo.gatsbycentral.com us-central1-kigali-162302.cloudfunctions.net/function-2
        baseUrl: 'us-central1-kigali-162302.cloudfunctions.net/function-2',
        // WP.com sites set to true, WP.org set to false
        hostingWPCOM: false,
        // The protocol. This can be http or https.
        protocol: 'https',
        // Use 'Advanced Custom Fields' Wordpress plugin
        useACF: false,
        auth: {
          jwt_user: process.env.WP_USER,
          jwt_pass: process.env.WP_PASSWORD,
          jwt_base_path: '/jwt-auth/v1/token',
        },
        // Set to true to debug endpoints on 'gatsby build'
        verboseOutput: false,
        plugins: [
          {
            resolve: `gatsby-wordpress-inline-images`,
            options: {
              baseUrl: `us-central1-kigali-162302.cloudfunctions.net/function-2`,
              protocol: `https`,
              postTypes: ['post', 'page'],
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: 'WPGraphQL',
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: 'wpgraphql',
        // Url to query from
        url: 'https://us-central1-kigali-162302.cloudfunctions.net/function-2/graphql',
      },
    },
    {
      resolve: 'gatsby-wpgraphql-inline-images',
      options: {
        wordPressUrl:
          'https://us-central1-kigali-162302.cloudfunctions.net/function-2/',
        uploadsUrl:
          'https://us-central1-kigali-162302.cloudfunctions.net/function-2/wp-content/uploads/',
        processPostTypes: ['Post'],
        graphqlTypeName: 'WPGraphQL',
        generateWebp: true
        /* httpHeaders: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        } */
      },
    },

    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      // Removes unused css rules
      resolve: 'gatsby-plugin-purgecss',
      options: {
        // Activates purging in gatsby develop
        develop: true,
        // Purge only the main css file
        purgeOnly: ['/all.sass'],
      },
    }, // must be after other CSS plugins
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}

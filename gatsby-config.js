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
        // The base url to your WP site. www.theartezan.xyz wpdemo.gatsbycentral.com
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
          jwt_base_path: "/jwt-auth/v1/token"
        },
        // Set to true to debug endpoints on 'gatsby build'
        verboseOutput: false,
        plugins: [
          {
            resolve: `gatsby-wordpress-inline-images`,
            options: {
              baseUrl: `us-central1-kigali-162302.cloudfunctions.net/function-2`,
              protocol: `https`
            }
          }
        ]
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

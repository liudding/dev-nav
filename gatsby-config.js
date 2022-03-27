module.exports = {
  siteMetadata: {
    title: 'DevNav',
    description: 'A navigation site for developers',
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [
    "gatsby-plugin-webpack-bundle-analyser-v2",
    "gatsby-plugin-offline",
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [
          require("tailwindcss"),
          require("./tailwind.config.js"), // Optional: Load custom Tailwind CSS configuration
        ],
      },
    },
    `gatsby-plugin-postcss`,
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        "trackingId": "sss"
      }
    }, "gatsby-plugin-image", "gatsby-plugin-react-helmet", "gatsby-plugin-sitemap", {
      resolve: 'gatsby-plugin-manifest',
      options: {
        "icon": "src/images/icon.png"
      }
    },
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    `gatsby-transformer-csv`,
    `gatsby-transformer-json`,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "./src/images/"
      },
      __key: "images"
    }, {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "pages",
        "path": "./src/pages/"
      },
      __key: "pages"
    }, {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
        ignore: [`**/\.*`], // ignore files starting with a dot
      },
    }, `gatsby-plugin-mdx`, {
      resolve: `gatsby-transformer-remark`,
      options: {
        // Footnotes mode (default: true)
        footnotes: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        plugins: [
          // {
          //   resolve: `gatsby-remark-images`,
          //   options: {
          //     // It's important to specify the maxWidth (in pixels) of
          //     // the content container as this plugin uses this as the
          //     // base for generating different widths of each image.
          //     maxWidth: 590,
          //     linkImagesToOriginal: false
          //   },
          // }
        ],
      },
    }, {
      resolve: 'gatsby-plugin-local-search',
      options: {
        // unique index name
        name: 'apps',
        engine: 'flexsearch',
        engineOptions: {
          // charset: "latin",
          encode: false,
          tokenize: function (str) {
            let content = str;
            if (str.startsWith('{')) {
              content = "";
              const doc = JSON.parse(str)
              for (const key in doc) {
                content += ' ' + doc[key]
              }
            }

            const latin = content.toLowerCase().replace(/[^\w]+/g, " ").split(" ").filter(i => !!i)
            const chinese = content.replace(/[\x00-\x7F]/g, " ").split(" ").filter(i => !!i)
            const tokens = latin.concat(chinese).filter(i => !!i && i.length > 0)

            return tokens
          },
          resolution: 9,
          filter: [
            // array blacklist
            "in",
            "into",
            "is",
            "isn't",
            "it",
            "it's"
          ]
        },

        query: `
          {
            allAppsJson(filter: {name: {ne: ""}}) {
              nodes {
                id
                cate3
                category
                name
                tags
                desc
                url
                logo
              }
            }
          }
        `,
        ref: 'id',

        // List of keys to index. The values of the keys are taken from the
        // normalizer function below.
        // Default: all fields
        index: ['name', 'tags', 'desc'],

        // List of keys to store and make available in your UI. The values of
        // the keys are taken from the normalizer function below.
        // Default: all fields
        // store: ['id', 'path', 'title'],

        // Function used to map the result from the GraphQL query. This should
        // return an array of items to index in the form of flat objects
        // containing properties to index. The objects must contain the `ref`
        // field above (default: 'id'). This is required.
        normalizer: ({ data }) =>
          data.allAppsJson.nodes.map((node) => ({
            id: node.id,
            name: node.name,
            category: node.category,
            tags: node.tags.join(" "),
            desc: node.desc,
            url: node.url,
            logo: node.logo
          })),
      },
    },]
};
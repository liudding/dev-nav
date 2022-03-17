const config = {
    gatsby: {
      pathPrefix: '/',
      siteUrl: 'https://hasura.io',
      gaTrackingId: null,
      trailingSlash: false,
    },
    header: {
      logo: 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/brand.svg',
      logoLink: 'https://hasura.io/learn/',
      title:
        "<a href='https://hasura.io/learn/'><img class='img-responsive' src='https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/learn-logo.svg' alt='Learn logo' /></a>",
      githubUrl: 'https://github.com/hasura/gatsby-gitbook-boilerplate',
      helpUrl: '',
      tweetText: '',
      social: `<li>
              <a href="https://twitter.com/hasurahq" target="_blank" rel="noopener">
                <div class="twitterBtn">
                  <img src='https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/twitter-brands-block.svg' alt={'Twitter'}/>
                </div>
              </a>
            </li>
              <li>
              <a href="https://discordapp.com/invite/hasura" target="_blank" rel="noopener">
                <div class="discordBtn">
                  <img src='https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/discord-brands-block.svg' alt={'Discord'}/>
                </div>
              </a>
            </li>`,
      links: [{ text: '', link: '' }],
      search: {
        enabled: false,
        indexName: '',
        algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
        algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
        algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY,
      },
    },
    sidebar: {
      navOrder: [],
      collapsedNav: [
        '/codeblock', // add trailing slash if enabled above
      ],
      links: [{ text: 'Hasura', link: 'https://hasura.io' }],
      frontline: false,
      ignoreIndex: true,
      title:
        "<a href='https://hasura.io/learn/'>graphql </a><div class='greenCircle'></div><a href='https://hasura.io/learn/graphql/react/introduction/'>react</a>",
    },
    siteMetadata: {
      title: 'Nave',
      description: 'A navigation site for developers',
      siteUrl: `https://www.yourdomain.tld`
    }
  };
  
  module.exports = config;
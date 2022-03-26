const config = {
    gatsby: {
      pathPrefix: '/',
      siteUrl: '',
      gaTrackingId: null,
      trailingSlash: false,
    },
    header: {
      logo: '',
      logoLink: '',
      title: "",
      githubUrl: '',
      helpUrl: '',
      tweetText: '',
      social: ``,
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
      collapsedNav: [],
      links: [{ text: '', link: '' }],
      frontline: false,
      ignoreIndex: true,
    }
  };
  
  module.exports = config;
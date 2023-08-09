import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // title: "Research Data Lab",
  // description: "How-to guides for the users of the Research Data Lab.",
  // themeConfig: {
  //   // https://vitepress.dev/reference/default-theme-config
  //   nav: [
  //     { text: 'Home', link: '/' },
  //     { text: 'Examples', link: '/markdown-examples' }
  //   ],

  //   sidebar: [
  //     {
  //       text: 'Examples',
  //       items: [
  //         { text: 'Markdown Examples', link: '/markdown-examples' },
  //         { text: 'Runtime API Examples', link: '/api-examples' }
  //       ]
  //     }
  //   ],

  //   socialLinks: [
  //     { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
  //   ]
  // }


  title: "Research Data Lab",
  description: "How-to guides for the users of the Research Data Lab.",
  srcDir: "content",
  lastUpdated: true,
  appearance: false,
  markdown: {
      lineNumbers: true,
      typographer: true,
      defaultHighlightLang: "python",
  },
  // scrollOffset: 48,
  assetsDir: './assets',
  themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      // we don't need logo, nav, sociallinks
      logo: {src: '/darden.webp'},
      nav: [
          {text: "Guides", link: "/guides/"},
          {text: "Databases", link: "/databases/"},
          {text: "Contact Us", link: "/contact"},
      ],
      sidebar: [
          {
              text: "Guides",
              link: "/guides/",
              items: [
                  {
                      text: "Getting Started",
                      link: "/guides/getting-started",
                  },
                  {
                      text: "Making a Query",
                      link: "/guides/making-a-query/",
                      items: [
                        {text: "Using a SQL Client", link: "/guides/making-a-query/using-a-sql-client"},
                        {text: "Using Python", link: "/guides/making-a-query/using-python/"},
                        {text: "Using R", link: "/guides/making-a-query/using-r/"},
                      ]
                  },
                  {
                      text: "Using SQL",
                      link: "guides/using-sql",
                  },
                  {
                      text: "Best Practices",
                      link: "guides/best-practices",
                  },
              ],
          },
          {
              text: "Databases",
              link: "/databases/",
              items: [
                  { text: "Database 1", link: "databases/database1" },
                  { text: "Database 2", link: "databases/database2" },
                  {
                      text: "SEC Databases",
                      link: "databases/sec-databases/",
                      items: [
                          { text: "Database 3", link: "databases/sec-databases/database3" },
                      ],
                  },
              ],
          },
          
      ],
  },
})

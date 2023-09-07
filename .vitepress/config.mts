import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
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
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        // we don't need logo, nav, sociallinks
        nav: [
            { text: "Guides", link: "/guides/" },
            { text: "Databases", link: "/databases/" },
            { text: "Contact Us", link: "/contact" },
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
                            {
                                text: "Using a SQL Client",
                                link: "/guides/making-a-query/using-a-sql-client",
                            },
                            {
                                text: "Using Python",
                                link: "/guides/making-a-query/using-python/",
                            },
                            {
                                text: "Using R",
                                link: "/guides/making-a-query/using-r/",
                            },
                        ],
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
                link: "/databases/about",
                items: [
                    { text: "General Info", link: "/databases/about" },
                    {
                        text: "List of All Databases",
                        link: "/databases/list/by-name",
                        items: [
                            {
                                text: "By Name",
                                link: "/databases/list/by-name",
                            },
                            {
                                text: "By Source",
                                link: "/databases/list/by-source",
                            },
                        ],
                    },
                    { text: "🌐 IMDb Non-Commercial Database" },
                    {
                        text: "🌐 BLS Quarterly Census of Employment and Wages Database",
                    },
                ],
            },
        ],
    },
});

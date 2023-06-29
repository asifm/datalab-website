import { defineConfig } from "vitepress";

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
    // scrollOffset: 48,
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        // we don't need logo, nav, sociallinks
        sidebar: [
            {
                text: "Databases",
                items: [
                    { text: "Database 1", link: "databases/database1" },
                    { text: "Database 2", link: "databases/database2" },
                ],
            },
            {
                text: "Getting Started Guides",
                items: [
                    {
                        text: "API Examples",
                        link: "guides/api-examples",
                    },
                    { text: "Markdown", link: "guides/markdown-examples" },
                ],
            },
        ],
    },
});

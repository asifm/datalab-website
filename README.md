# Website for Darden Research Data Lab

TODO: Flesh out this README with details about the site's architecture, features, and how to use it.

NOTE: Not everything in this README has been implemented yet. Also, some details are likely to change as the site is developed. This README will eventually reflect such changes.

## Architecture

TODO

<!-- A well-designed website architecture should make it easy for users to find the information they are looking for, and should provide a clear and intuitive path for users to navigate through the site. It should also be scalable and flexible enough to accommodate future changes and updates to the site's content and functionality. -->

<!-- ### Page Types

### Page Hierarchies

### Navigation -->

## Guide for Content Writers and Editors

### Write in Markdown

Use [Markdown](https://www.markdownguide.org) to write content for the site. The site uses GitHub Flavored Markdown, which is a superset of standard Markdown.

Learn the Markdown syntax [here](https://www.markdownguide.org/basic-syntax) or [here](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax).

Strongly recommended: Use a Markdown Linter to check for errors and inconsistencies. If you use Visual Studio Code as your text editor, install the [Markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) extension.

### Features

#### Writing Code

Write code using code blocks. Use three backticks (\`\`\`) to start and end a code block. Add the language name after the opening code fence to get syntax highlighting; e.g.:

````
```python
def hello():
    print("Hello, world!")
```
````
will produce:

```python
def hello():
    print("Hello, world!")
```

Syntax highlighting comes with some useful [advanced features](https://vitepress.dev/guide/markdown#syntax-highlighting-in-code-blocks).

#### Linking

To link to another page of this site, use the page's file name without the file extension, e.g. `[link text](page-name)`. See more details [here](https://vitepress.dev/guide/markdown#links) about linking to pages in other directories and linking to specific sections of a page.

#### Callouts

Use the `:::` syntax as follows to draw attention to important information. See more details [here](https://vitepress.dev/guide/markdown#custom-containers).

````
::: info
This is an info box.
:::
````

The above will produce a callout box that visually stands out from the rest of the content.

Supported callout types:
- `::: info`
- `::: tip`
- `::: warning`
- `::: danger`
- `::: details`

The last one is a special callout type that can be used to hide content behind a toggle button. Example:

````
::: details Click here to see the hidden content.
This is the hidden content.
:::
````

TODO: Do we need more/different callout types?

#### Tables

[How to create tables in Markdown](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/organizing-information-with-tables).

For a large or complex table, it might be easier to create it in Excel and then convert it to Markdown using a tool like [this](https://www.tablesgenerator.com/markdown_tables) or [this](https://markdown-convert.com/en/tool/table).

#### Images

TODO

#### Diagrams

Create text-based diagrams using [Mermaid syntax](https://mermaid.js.org/config/Tutorials.html).

#### Footnotes

TODO

#### Downloadable Files

TODO

#### Table of contents

Generated automatically from the headings in the page. To disable, set `outline` to `false` in the page's front matter. Note that Vitepress uses the term "outline" instead of "table of contents".

### Directory Structure

The site's content lives in the `./content/` directory. You'll write all your Markdown files here. Optionally, you can organize them into sub-directories, where each sub-directory can represent a thematic section of the site.

Following is a simplified view of the site's directory structure:

```md
. (project root)
├── content/            # all .md files
│   ├── index.md        # home page
│   ├── databases/      
│   │   ├── filea.md
│   │   └── fileb.md
│   └── guides/
│       └── filea.md
├── .vitepress/
│   ├── theme/
│   │   └── index.js    # theme entry
│   ├── config.js       # site config
│   └── dist/           # site generated
├── package.json
└── node_modules/
```

Note that the above is different from the default structure created by Vitepress. The revised structure provides better separation between the site's content and code. Content writers and editors should not need to touch any files outside of the `./content/` directory.

TODO: When, where and how to update links as new content is added.


### Adding a New Page

1. Create a new Markdown file in the `./content/` directory or its relevant sub-directory. Make sure to name the file with `.md` extension. The file name will be used in the page's URL, e.g. `./somedir/new-page.md` will be accessible at `https://[TODO-subdomain].darden.virginia.edu/somedir/new-page.html`.

2. At the top of the file, add the page's metadata within a pair of triple dashes (see more details in the front matter section below). Example:

    ```yaml
    ---
    title: Page Title
    description: Page description.
    layout: doc
    ---
    ```

3. Add content to the page using Markdown syntax.

### Publishing Changes

A Git-based workflow is used to publish changes to the site. The repo has three branches: `dev`, `preview` and `main`.

To publish your changes to the live site, simply push them to the `main` branch. To preview your changes before publishing, push them to the `preview` branch (published at TODO). 

### Front Matter

Page front matter is written in `yaml`. Following are the fields available for use:

- `title`: This will be displayed at the top of the page and used as the page's title in search results. (TODO check if content should start with h1 or h2)
- `description`: A brief description of the page. This will be shown at the top of the page to provide a quick preview of the content. It will also be used as the page's meta description, which is used by search engines to display a page's description in search results.
- `layout`: The layout to use for the page. The default layout is `doc`, which is used for most pages. The `home` layout is used for the home page. 
- `lastUpdated`: Set to `false` to *not* display the date the page was last updated. The default value is `true`. The timestamp displayed is the date the page was last modified in Git.
- `outline`: Set to `false` to *not* display the table of contents. The default value is `true`.

All fields are optional. The `title` and `description` fields are strongly recommended if SEO is important for the page.

## Guide for Developers/Designers

The site uses [Vitepress](https://vitepress.dev), a static site generator built on top of Vue 3.

### Configuration

<https://vitepress.dev/reference/site-config>

TODO

### Page Layouts

TODO

### Deployment

The site is hosted on [GitHub Pages](https://docs.github.com/en/pages). The `dev` branch is used for development and the `main` branch for production. In addition, content writers and editors can use the `preview` branch to preview changes before publishing them to the live site.

URLs for the published branches: TODO

#### GitHub Actions

The site is deployed using GitHub Actions. The workflow is defined in `.github/workflows/deploy.yml` (TODO). Every push to any of the branches triggers the workflow, which then builds and deploys the updated site for the respective branch.

### Custom Domain

A [custom domain is configured](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site) to show the `main` branch at TODO-subdomain.darden.virginia.edu. 

### Visual Design

TODO

### UX Checklist

- Compliant with [Darden's brand guidelines](https://www.darden.virginia.edu/brand)
- Compliant with [Web Content Accessibility Guidelines](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- Responsive to all screen sizes
- Fast to load
- Easy to navigate
- Easy to read
- Easy to search
- Easy to find

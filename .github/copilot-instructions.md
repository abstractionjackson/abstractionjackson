# Copilot Instructions

## Hugo Site Structure

This is a Hugo static site using the "jump" theme located in `themes/jump/`.
Styles should be added to the theme in `themes/jump/assets/css/main.scss`.
Layouts should be added to the theme in `themes/jump/layouts/`, unless explicitly specified otherwise. This includes partials and shortcodes.
Content appears at the site level in `content/` and is organized by section.

## GitHub Repository Link Feature

Content front matter can include a `repo` parameter to display GitHub repository links:

- Org-mode files: `#+repo: https://github.com/username/repo`
- Markdown files: `repo: https://github.com/username/repo` in YAML front matter
- Renders as GitHub octocat icon with "View on GitHub" text
- Appears after tags in post/page headers
- Implementation in `themes/jump/layouts/_partials/github-repo-link.html`

## Content Types

- Portfolio items in `content/portfolio/` with archetype in `archetypes/portfolio/`
- Activities are posted to `/activity/<date>/<datetime>.org` using a archetype in `archetypes/activity/`
- Dreams in `content/dream/` with archetype in `archetypes/dream/`
- Notes in `content/note/`
- Sketches in `content/sketch/`
- Culinary content in `content/culinary/`

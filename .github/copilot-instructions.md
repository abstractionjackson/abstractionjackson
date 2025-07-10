# Copilot Instructions

## Hugo Site Structure

This is a Hugo static site without a theme.
Styles are located in `assets/css/` with the main file at `assets/css/main.scss` and partials in `assets/css/partials/`.
Layouts are located in `layouts/` and include partials and shortcodes.
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

## Activity Data Structure

Activity data has been migrated from org-mode files to JSON format in `data/activity/`:

- **JSON Data**: One file per date (`YYYY-MM-DD.json`) containing all activity entries
- **Schemas**: Located in `data/` directory:
  - `activity-date.schema.json` - Schema for date objects with date, rating, and entries array
  - `activity-entry.schema.json` - Schema for individual activity entries with date, draft, title, performedAt, rating, tags, and content fields
- **Documentation**: `data/README.md` contains full documentation of the data structure

When working with activity data, reference these schemas to understand the expected structure and validation rules.

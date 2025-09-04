# Project Features

- The project is a static website for a software engineer's blog.
- The blog is organized into sections. Posts to a given section may have one or more categories, and one or more tags.
- In addition to the blog, the site may have other pages, like About, or Contact.

# Project Technologies

- The site is built on Hugo. Therefore, Hugo's file system conventions apply, and sections appear under content/section-name.
- Content is written in Markdown, and contains front matter in TOML format.
- Structure posts as an index.md file under a folder named for the post's slug, under the section folder.
- The site uses Sass in .scss files for styling. The styles are modularized into partials that map to Hugo's layouts (like base, home, single, list, etc). Partials for sitewide styles exist, as well.
- The site also uses Bulma CSS, and customizations appear under the Sass partial, "\_bulma.scss". When adding, or otherwise applying styles, always prefer to use Bulma.
- JavaScript is used when necessary.

# Style Guidelines

- Mobile-first, responsive design.
- Emphasis on legibilitiy.
-

+++
date = '2026-01-06T14:32:51-08:00'
draft = false
title = 'Build a Modular Markdown Resume with Hugo Shortcodes, AI, and AlpineJS'
+++

Building a resume can be tricky. Unlike the free-form prose of a cover letter, resumes combine structured information like date ranges with sentence fragments like role summaries or experience bullet points. What's more, no universal resume format exists; the only "correct" resume is the one that leads to a job offer. Of course, we have a rough understanding of the component parts of a resume, and the fact that many repeat over the course of the document allow software engineers (that's us!) to design systems for composing, managing, and rendering beautiful, accurate resumes.

A few core technolgo allow us to solve the problems of a resume without structure. While the computer science principles of modularity, abstraction, instantiation, and composability all apply here, and many different approaches could lead to our goal, I have chosen to use Markdown HTML, CSS, Hugo, and JavaScript to build a system for building and maintaining your professional resume. Along the way, I'll demonstrate how AI can be leveraged to accelerate the development process of this, and similar, applications.

This post includes many code snippets that live on my [GitHub](https://github.com/abstractionjackson) as `gists`.

# Why not Word?

Word processors like Google Docs offer a quick document-building solution for users who waive the right to customize. At first, this approach feels viable -- I'm able to paste in a template that has the font set, the headings and text sized porportionally, and examples of each section filled in with placeholders like "Bob Smith", "Assistant to the Regional Manager", and "My Company, LLC". All you have to do, it seems, is replace the text with your personal data, and hit print!

Unfortunately, we've all experienced the frustration of fiddling when a company name or bullet point runs long, and the document format breaks down. Are we supposed to fiddle with the GUI breakpoints that seem to spawn new geometries when dragged across the screen? And what if we should try to paste text from another document like a previous resume? The chance of "blowing up" the format is -- again -- non-zero.

Our solution is to write the actual content in plain text, or -- rather -- plain text's **slighty** evolved sibling, Markdown.

This allows us to seperate the content from formatting concerns, which CSS can handle, and we'll get to later. Markdown resumes became popular for their simplicity, and you could easily use the syntax alone to produce a basic resume document. But the format is extensible, and soon we'll explore how Hugo's Markdown processing allows us to implement modular, composable resume documents using *shortcodes*.

# Markdown Gives us Headings, Links, and Bullets

What more could you ask for?

A resume certainly needs a heading for each section ("Experience", "Education", and maybe more), and usually includes "hypertext" like an email address, location, and phone number. Also, we likely want to list high points in our professional experience using a bulleted list, and Markdown supports their creation through use of the `-` character.

---
title: "Using AI and Emacs to Build a Values-Based Agenda"
date: 2025-08-20T09:33:52-07:00
draft: false
featured: true
summary: As an Emacs user who doesn't know Lisp, I rely on LLMs to add features to my agenda tools. The agenda views that ship with Emacs Org Mode offer a bounty of features in their own right, and I would reccomend those interested in productivty and time management to investigate the software. However, the authors of Org Mode could not possibly have predicted my idiosyncratic productivity needs, and so I am required to build them myself. Fortunately, Emacs is highly extensible; unfortunately, it is written in Lisp.
---

As an Emacs user who doesn't know Lisp, I rely on LLMs to add features to my agenda tools. The agenda views that ship with Emacs Org Mode offer a bounty of features in their own right, and I would reccomend those interested in productivty and time management to investigate the software. However, the authors of Org Mode could not possibly have predicted my idiosyncratic productivity needs, and so I am required to build them myself. Fortunately, Emacs is highly extensible; unfortunately, it is written in Lisp.

# Feature Request: Associate TODO Agenda Items with a Value

Cal Newport lays out a system for engineering your life around a set of core values. I want to align my agenda with such a system, and recognized in Org Mode the opportunity to collect and define my values such that I could reference them from a task. Say I want to live up to the value of Test-Driven Development, I would need a means of identifying what tasks embody TDD. While Org Mode provides a _tag_ feature that could -- in theory -- be used to group tasks around a value, in practice I find that tags work best to associate tasks on their characteristics, like `TODO Write Unit Tests :mocha:chai:`, where the `:` denotes a tag.

Thankfully, tasks in Org Mode can have custom properties, stored in "drawer" under the task heading. With this in mind, I know I could establish an association between task and value headings. The development work, then, would be to design an interface for creating these associations in an automated fashionl Eventually, I would want to query the data for stats like, "How many minutes did I spend on tasks with value A?", or "What value has the most tasks with state TODO?". You could even feed well-defined tasks to an LLM, and ask for a summary of the work that went towards a given value, but that's a ways away. For the time being, I needed an LLM just to write the Lisp that would implement my system.

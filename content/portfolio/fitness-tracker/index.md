+++
date = 2025-08-25T13:44:50-07:00
draft = false
featured = false
title = "Building a Python CLI for Resistance Exercise Tracking"
categories = ['development']
tags = ['python', 'cli', 'data', 'JSON', 'Emacs',]
summary = '''
As a self-described jock who codes, I was not satisfied by the apps named in our ice-breaker, and set about to build my own fitness tracker, a CLI focused on helping resistance trainers (read: other jocks) better understand their performance, and strategize based on effectively-captured data.
'''
landing = true
[[resources]]
name = 'preview'
src = 'images/preview.png'
+++

I recently took part in a group ice-breaker, "App & App", that asked each of us to name our favorite appetizer, and favorite application. I went extremely high-brow with steak tartar (sp?) and Hoopla, but most people went with some iteration of breadsticks and social media. In fact, of the sixty-some-odd apps mentioned, only MyFitnessPal and Strava appeared from the fitness category. While we love to count our likes and friends, fitness can be more difficult to quantify, and therefore less available to the end-user. Resistance training, in particular, presents unqiue challenges around data-capture that to-date wearables and smart equipment has only partially solved.

As a self-described jock who codes, I was not satisfied by the apps named in our ice-breaker, and set about to build my own fitness tracker, a CLI focused on helping resistance trainers (read: other jocks) better understand their performance, and strategize based on effectively-captured data.

# Repetition is Key: an Atomic Data Model for Resistance Exercise

At the core of my application would be a robust, extensible data model that strives for atomicity. In training, we perform at a given time one workout, exercise, set, and rep. These would be the primiative types foundational to my data. As a user, I want to know about what my last workout entailed, so I can program the next according to some type of algorithm (more on resistance programming, later). Also, I want to look over my performance for given exercise as an indicator of progress. Was I able to add weight to my Bench, while keeping the number of sets and reps consistent? Users probably know this, intuitively, but capturing these data points removes the guesswork.

# Leveraging Emacs for Improved Data Capture

After defining a robust data model, I set out to record my workouts. Data capture is central to the user experience, and I wanted the application to reduce friction when my user sits down to plan or summarize their workout. As a general rule, developers should aim to automate repetive tasks, and make seamless CRUD operations. The task of the developer is to identify moments when the application requires user input, and opportunities where it can automate data capture. This dynamic represents the application's value proposition; why not use a ruler to draw rows and columns on paper, and write in the date, exercise, weight, sets, etc.?

Of course, there's more than one way to skin a cat. Workout trackers have been built on spreadsheets, CLIs, and desktop computing frameworks, and each has it's own advantages -- and disadvantages -- relative to paper, and one another. The CLI-first approach I took when prototyping `train` -- the working title for this application -- has two major advantages. First, it allows for extremely simple data capture, provided you're comfortable in the terminal. As a CLI user, I can issue commands like `train add workout` to create a workout object in storage, or `train add exercise --name Bench` to surface a prompt for the workout to update, and a sort of form to complete regarding exercise performance details. Second, I'm able to call the commands from other applications, making my core logic extensible. For instance, in developing an Emacs integration, I write a Lisp function `train-exercise-get-recent` that calls the CLI with the exercise name at point. Similarly, I could write a GUI that takes a click event, and calls `train detail exercise` with the text my user clicked.

In architectural terms, JSON schema is the model; the prompts, Emacs buffer, or GUI window is the view; and the CLI is the controller. Convenient to the developer, the CLI has a nice, minimal view layer in the terminal.

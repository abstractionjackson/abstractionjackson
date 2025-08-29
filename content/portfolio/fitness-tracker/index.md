+++
date = 2025-08-25T13:44:50-07:00
draft = false
featured = false
title = "Building a Python CLI for Resistance Exercise Performance Tracking"
categories = ['development']
tags = ['python', 'cli', 'data', 'JSON']
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

+++
date = '2025-06-13T14:55:36-07:00'
draft = true
featured = false
title = 'Launch Club'
categories = ['design']
tags = ['wordpress', 'gymmaster', 'e-commerce']
+++

![golf](/content/portfolio/launch-club/landing.png)

<amall>The Landing Page at launchclubgolf.com</small>

# E-Commerce Website Maintance: Integrations, Content Management, and Performance Optimizations for Launch Club Golf

## Payments and Scheduling Services to Improve UI/UX

[launchclubgolf.com](https://launchclubgolf.com) is home online to the Minneapolis golf simulator that shares its name. Managed via WordPress CMS, the site features not only promotional and informational content, but interactive e-commerce integrations for scheduling and payments. I joined the project in 2024 to help business owner Jason Gillis implement these features, and the result was improved User Experience (UX) and increased customer traffic.

> ...[Jackson] added to my vision with creative solutions
>
> - Jason Gillis, Owner

<!-- ![Launch Club Cards](/content/portfolio/launch-club/launch-club-cards.png) -->

## Leveraging the WordPress Elementor Plugin for a Mobile-First Redesign

When it comes to e-commerce, accessability is key. Every customer who tries to visit the site from a mobile device with a poor signal, only to be met with scroll bars and broken images is a customer forfeit, and for small businesses like Jason's, such an outcome is unacceptable. He wisely chose WordPress to manage site hosting and content, and began to use their Elementor system to build the User Interface (UI). Things were going great, because Elementor comes with responsive CSS baked-in, untill his payment processing needs demanded an integration.

In order to couple the widgets his payment system, GymMaster, provides, Jason needed an engineer with JavaScript and HTML/CSS knowledge. I consulted over a productive client meeting in which the scope of the issue became understood. As a software engineer with five years of web development experience, I had worked on low-code systems like Elementor, but no two are exactly alike. My initial approach was to understand the widget, discover how it could be integrated with Elementor, and implement the code required to do so.

## Black-Box Widgets

The GymMaster payments widget was essentially a `script` tag and a `src` attribute. Embedded in the page, the script would fetch JavaScript from the url at `src`. As such, developers cannot tampber with the functionality of the payment system. On the downside, neither can we customize the layout and appearance of the widget.

My solution was to wrap the funtionality in homegrown HTML/CSS. Had this been a bespoke website, like my [portfolio](https://abstractionjackson.com/), I would have been able to update source code directly, but Elementor is a layer of abstraction through which I would need to manipulate the styles. I set about every developer's favorite task: reading the manual.

## Comprehensive Documentation

## Custom Components to the Rescue

## Project Outcomes

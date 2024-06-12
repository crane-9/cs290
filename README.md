# CS290

Git repo for CS290 work.


# Final Reflection

## Site Re-Reviews

### 1. Moodle

Working on my final project made me appreciate the effort it takes to create a site that revolves around interfacing with databases and displaying customizable content. Generally speaking, however, I still agree with my initial review. I have [more to say later](#final-project) on my final project in comparison to Moodle.


### 2. Tumblr

I spent a lot of my initial review of Tumblr complaining about its alternate color palettes, which I still stand by. However, over the course of this term, I haven't been able to do it better (despite arguably having a handful of opportunities to do as much). I kept thinking back to my observations as I designed my sites, as I wanted to steer clear of unreadable color combinations.

In making a site that utilizes templates, I'm able to appreciate the layout(s) of Tumblr a little more. They're consistent and predictable for the most part, even if space is underutilized.


### 3. [WordHippo.com](https://www.wordhippo.com/)

Honestly not much of my opinion of WordHippo has changed. In fact, I think its lackluster visuals and design are perfectly valid, as creating something more artistic or appealing runs many risks to the functionality. I appreciate the simplicity, and ugly websites are important to still have around in a world of overstyled corporate sites.


### 4. GitHub

One thing I've noticed about GitHub since the start of the term is how different content on the same page loads in at different times. For example, on the home page, the main feed takes a moment to load as opposed to the highlights on the side. I appreciate this choice because it makes the page load quickly, while being transparent with the user that additional content needs an extra moment to render. I believe/theorize this utilizes AJAX requests to render specific content, balancing the pre-rendering. Utilizing both is something I would like to implement for myself in the appropriate future projects.


### 5. [Devon Wiersma's Portfolio Site](https://www.devonwiersma.games/home)

I still appreciate the simplicity of the site, especially in (I assume) iteratively rendering content. The layout of each game's section on the page is simple and adaptable to different links and numbers of bullet points. However, I still think that the CSS could use some help with my nitpicks about spacing. 

That said, it is worth mentioning how readable these pages are, which is probably the priority.


## Self-Review

### Assignment 1

There are some aspects of this site that are delightfully simple. I like the layout of the sitemap for example, and the concept of the blog page.

However, I'm not too impressed by the color palette. The lighter page background (even if part of a gradient) and solid black content blocks doesn't sit quite right with me. I added some CSS animations that take away from the simplicity and are a bit distracting.

### Assignment 4

For a site that doesn't use server-side rendering or a database, I'm generally alright with the functionality of this site. One key thing I forgot to implement was the "Save Draft" feature, which is an obvious glaring issue if there's a button that just doesn't work as advertised.

Generally speaking, I think the color palette is one of my favorites out of these projects. While simple and neutral, the orange and green are used somewhat consistently to mark interactive buttons, and links and Tarot cards respectively.

The navigation of this site could use some help. It's not terribly clear, only communicate through icons at the top of the page. Additionally, I find myself clicking on the log entries and calendar entries, expecting to be able to view a single journal entry: that behavior is implied by the CSS animations that trigger on hover.

While functional, the "Add Card" menu does not do its best to show the user which cards have been selected until the window closes. This is frustrating because it meets functionality and simplicity, but is not the greatest or clearest user experience. To rephrase: it is logically simple, but confusing to a human.


### Assignment 5

All the sites I reviewed generally work in all browsers and adapt to the client device. That's important in front-end development as it is your job to provide a web application that the client can actually use. For this assignment, I didn't realize that the built-in popover feature in HTML is not supported in Safari, or on Chrome for iOS, until it was too late. (That said, I did intentionally forego adapting this site for mobile, as it conceptually works much better on desktop, but that is besides the point -- I should be aware and expectant of the ways my application fails, and I didn't test on Safari.)

That said, when functional, I think this site is simple and pleasant to look at, and functional (on the right platforms). There isn't a lot of navigation to be done, but the draggable and collapseable windows are, in my opinion, intuitive and convenient.

I also enjoy the color palette of this site, I thought it was again pleasant and appealing.


### Final Project

In regards to my re-review of Moodle: creating and designing a dynamic web interface with a database is difficult, especially when it comes to making the interface show the user how to use it. My final site was, I hope, self-explanatory, however there are a lot of overall design choices that were not explained in using the site, and I don't feel like it would provide the most pleasant user experience. I attempted to take some cues from Moodle in designing the admin's interfaces by making them simple and straightforward tables, however toward the end I became fairly conscious that the admin's pages were lacking in components like tooltips or "help" popups. 

Additionally, in regards to color palette and readability -- I personally enjoy a dark red and black color palette, but I kept realizing that my favorite red on the color palette was too dark to use on text, *especially* the thin Lato font I chose for the headings. In this sense, I have some concerns about the balance between style and readability. The red that I used for links scores about a 3.17-3.20 on the gradient background, which fails the WCAG accessibility standards. The lightest red I use also fails this standard.

That said, I *personally* enjoy the look of the site, and believe that the site could be rescued and made accessible with thicker fonts and alternate accent colors -- or, accent colors utilized differently.

I quite enjoy the layouts of pages on this final site. I think I could have given some more spacing and breathing room, but the public pages and admin pages alike, I find to serve their purpose comfortably.

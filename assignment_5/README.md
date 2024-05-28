# Assignment 5

- [Concept](#concept)
    - [Mockup drawing](#mockup)
    - [Data design](#data-design)


## Concept

For this project, I want to get some experience with realtime interactions via websockets, and I've chosen [SocketIO](https://socket.io/) to use for socket management/framework/general guidance.

My initial concept for the site is a simple realtime messenger app. The gimmick is clouds drifting through a blue sky. The few menus there are can be dragged around and organized as desired by the user. When messages are sent, they appear as clouds for about 30 seconds before fading away.

Immediate concerns:
- May require a whole different layout on mobile.
- Definitely not a practical concept, nor would it be fun on a large scale or for serious use.
- Which animations should be JS and which should be CSS?

Despite concerns, I think it is a fun concept I know I and friends would play with, and more than that, I want to work with websockets. I will call this site "Cloudfaire", a play on "Cloudflare".


### Mockup

![Site concept](./readme-src/concept.png)

Some notes on my mockups:

1. The user will primarily interact with the site through this input box. There is a space for their username to go, a color to identify themself by, and an input box for the actual text they would like to send. The username and color is editable at any time, as I don't intend to deal with account creation for this project.

2. When sent, the message is broadcast to the room, and displays as a cloud. The cloud will fade in, drift, and fade out.
    - While I'll enforce a character limit, displaying text and image on little clouds might look goofy from time to time.

3. I want to create a small window for creating and sending a drawing with a limited size and color palette. I think that would be a fun challenge.

4. I think it would be a good challenge to implement a feature where multiple chat rooms can be created and used. This prototype would be the window via which a user joins a room -- a separate menu would create a room.

A few aspects of this project -- the draggable windows and a canvas you can draw on -- are things that I have written before, and will be easy to copy my old work and modify as needed. 


### Project Structure

After some basic research into common structures of NodeJS servers, I have decided to adopt the following structure:

```
site/
├── config/
│   └── config.ts
├── models/
│   └── interfaces.d.ts
├── public/
│   ├── css/
│   ├── fonts/
│   ├── img/
│   ├── scripts/
│   ├── index.html
│   └── tsconfig.json
├── routes/
├── utils/
├── server.ts
└── tsconfig.json
```

Currently, `routes/` is not really being utilized, and I wonder if I could do something to change that, I like this structure.
    - * Similarly, `controllers/` is not listed here because it only exists as a directory on my pc. I would like to utilize that too.


### Data Design

`public/scripts/` holds scripts for the client-side application. This is where most of the work is done in this project, as it contains the behavior of draggable windows and clouds, and user input validation.


## Issues

### Client-side

- Canvas: After loading/reloading the page, the first stroke on the canvas aborts after about a half-second.
    - This is not prevented by clicking before drawing.
    - If the first stroke is less than the approximate half-second, the next stroke will cut off after the remainder of that approximate half-second of draw time.
    - Every stroke after works perfectly as expected, even after canvas reset.


## Attributions

In this project, I again use a handful of SVG files from [SVGRepo.com](https://www.svgrepo.com) that require attributions. I use these files and have made note of any changes.

- [Arrow SVG](https://www.svgrepo.com/svg/469643/right-arrow)
- [Help SVG](https://www.svgrepo.com/svg/507736/help) -- altered viewbox to enlarge and removed color.
- [Send SVG](https://www.svgrepo.com/svg/327524/send)
- [Settings SVG](https://www.svgrepo.com/svg/509221/settings) -- also altered viewbox.

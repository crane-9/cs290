# Project Final

Project final i am probably going to do the first project but this time with some api for product info and blog posts.

also api for updating this information and the front-end interface

figure out what the database will be -- i looked at prism! which is quite cool!!! but hm!

## Design

### Base Concept

This site is for a hypothetical independent visual artist looking to create a portfolio site.

Similar to my first project, I would like to make a site for hypothetical personal use. I want to make a simple client-side site that displays artwork, and provides an admin page (with a hopefully-secured password) to interact with the server and manage the site's artwork database.


### Mockup Drawing

![Concept mockup](./readme_src/concept.png)

As usual, some notes:

1. Aesthetically, I want to go for something spacey and minimalistic. I want to have empty space to let the page's contents breathe. In the first slide, there are two sections that I thought about populating with text, but I think might serve better as blank.

2. The main purpose of this site is to work with a database and build an web API to create secure interaction between the site's admin and the site's back-end. I only plan to build one table in the database that will keep track of art information -- however in this mockup, I include an "articles" table to emphasize the organization rules I would want to keep.

3. Back on the first slide: these rectangles are placeholders for art pieces, populated by the database introduced in the last point.
    - I hope to create a template page for viewing a single piece of art as well.

4. Input bars are not evenly drawn in the mockup, but I am thinking a very simple and straightforward form for editing information.
    - "Meta Information" is information that would show up in link previews, or the page's `<title>` elements.
    - "On-Page Information" is information that shows up on pages. The only listed properties are "Home Title" and "Contact Title". 
        > Normally, I think it would be much better to organize each page and its information into its own category. However, before I create a website that can render completely customized pages, I would like to write a page that can render template pages with customized information.
    - "Aesthetic" is a category I may not implement: I worry about the accessibility of a customizable color accent. This is an easy distraction pitfall for me, however visual customization is something I want to keep in mind for this type of site.


### Data Design

> At the moment, I am uncertain of what database I will be using. My initial data design is made with relational databases in mind, and the intention to keep it simple and use only basic data types.

The main focus of the site is displaying art pieces. The database table storing their data will be as follows:

| Property name        | Data type          | Default value     | Description                           |
|----------------------|:------------------:|:-----------------:|---------------------------------------|
| Id                   | `number`           | (Auto-increments) | An ID for the piece. (Internal use only.) |
| Name                 | `string`           | (Required)        | A name for the piece.                 |
| File name            | `string`           | (Required)        | File name for the associated image.   |
| Date                 | `string`           | Current day       | The date the piece was completed. Stored as "MM/DD/YYYY", and will be adjusted client-side for local time. |
| Description          | `string` or `null` | `null`            | A descriptive paragraph for the piece. |
| Collection name      | `string` or `null` | `null`            | The name of the collection the piece belongs to. |
| Medium               | `string`           | `""`              | Descriptor for the piece's medium.    |
| Additional credit    | `string`           | `""`              | A note of additional credit, if desired. |

These fields will be used to display a complete page of information on a single piece, as well as organization (ie: the 'collection name' property).

For the management of general site information (title, description, favicon), there will be two additional tables:

- Meta information: A table that has one row with id `1`. Holds the following properties:
    - Title
    - Description
    - Author
- Page information: A table with a row for each page's information. This will not hold much in this iteration of the website:
    - Page title





## Attribution? 

- [default favicon](https://favicon.io/emoji-favicons/artist-palette) 

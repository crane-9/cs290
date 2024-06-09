
-- Simple model as outlined in README
CREATE TABLE IF NOT EXISTS Artwork (
    Id INTEGER PRIMARY KEY,
    Name TEXT,
    FileName TEXT UNIQUE,
    AltText TEXT,
    Date TEXT,
    Description TEXT,
    CollectionName TEXT,
    Medium TEXT,
    Credits TEXT  
);


-- A table that will hold only one row.
CREATE TABLE IF NOT EXISTS WebsiteInfo (
    Title TEXT,
    Description TEXT,
    Author TEXT,
    Id INTEGER PRIMARY KEY
);


CREATE TABLE IF NOT EXISTS PageInfo (
    Path TEXT PRIMARY KEY,
    Title TEXT,
    BodyText TEXT,
    Canonical BOOLEAN,
    Hidden BOOLEAN
);


-- Create default website data.
INSERT INTO WebsiteInfo VALUES ('My Art Website', 'A place for me to post my art.', 'Artsy McBibbly', 1);

INSERT INTO PageInfo VALUES
    ('about', 'About Me', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque odio voluptatibus iste odit ad id atque accusamus non ducimus sunt accusantium fuga saepe ipsam, maiores quidem autem? Dolorum, est ut.
    
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque odio voluptatibus iste odit ad id atque accusamus non ducimus sunt accusantium fuga saepe ipsam, maiores quidem autem? Dolorum, est ut.
    
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque odio voluptatibus iste odit ad id atque accusamus non ducimus sunt accusantium fuga saepe ipsam, maiores quidem autem? Dolorum, est ut.', TRUE, FALSE),
    ('contact', 'Contact Me', 'Remember to leave your contact information. [Cheers!](https://www.youtube.com/watch?v=dQw4w9WgXcQ)', TRUE, FALSE),
    ('index', 'Home', 'Welcome to my webpage. Please check the nifty links above to navigate!', TRUE, FALSE),
    ('sitemap', 'Sitemap', '', TRUE, TRUE)
;

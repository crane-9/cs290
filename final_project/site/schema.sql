
-- Simple model as outlined in README
CREATE TABLE IF NOT EXISTS Artwork (
    Id INTEGER PRIMARY KEY,
    Name TEXT,
    FileName TEXT UNIQUE,
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
    Title TEXT
);


-- Create default website data.
INSERT INTO WebsiteInfo VALUES ('My Art Website', 'A website I post my art on!', 'Artsy McBibbly', 1);

INSERT INTO PageInfo VALUES
    ('about', 'About Me'),
    ('contact', 'Contact Me'),
    ('index', 'Home'),
    ('sitemap', 'Sitemap')
;

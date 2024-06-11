/**
 * Interfaces for the database, structures appearing as they do in the database.
 */
namespace interfaces {

    // Data a single piece of artwork consists of.
    interface Artwork {
        Id: number;
        Name: string;
        FileName: string;
        AltText: string;
        Date: string;
        Description: string;
        CollectionName: string;
        Medium: string;
        Credit: string;
    }

    interface ArtworkIncoming extends Omit<Artwork, "Id"> {}

    // General metadata about the website.
    interface WebsiteInfo {
        Title: string;
        Description: string;
        Author: string;
        // Id: 1;   // Exists but should not be used outside of querying .db.
    }

    // Same as WebsiteInfo, with alternate capitalization.
    interface WebsiteInfoIncoming {
        title: string;
        description: string;
        author: string;
    }

    // Metadata specific to a single page.
    interface PageInfo {
        Path: string;
        Title: string;
        BodyText: string;
        Canonical: boolean;
        Hidden: string;
    }

    interface PageInfoIncoming extends Omit<PageInfo, "Canonical" > {}
}

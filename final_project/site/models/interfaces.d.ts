/**
 * Interfaces for the database, structures appearing as they do in the database.
 */
namespace interfaces {

    // Data a single piece of artwork consists of.
    interface Artwork {
        Id: number;
        Name: string;
        FileName: string;
        Date: string;
        Description: string;
        CollectionName: string;
        Medium: string;
        Credit: string;
    }

    // General metadata about the website.
    interface WebsiteInfo {
        Title: string;
        Description: string;
        Author: string;
        // Id: 1;
    }

    // Same as WebsiteInfo, with alternate capitalization.
    interface WebsiteInfoIncoming {
        title: string;
        description: string;
        author: string;
    }

    // Metadata specific to a single page.
    interface PageInfo {
        Title: string;
        BodyText: string;
    }

}

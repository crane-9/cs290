/**
 * This file keeps track of use specifications for different table properties, as expected to be used by the admin.
 */

/** Directory of properties for different tables. */
const TableProperties: Record<string, interfaces.Property[]> = {
    Artwork: [
        {
            name: "Id",
            type: "hidden",
            required: true,
            constant: true,
            label: null,
            placeholder: null
        },
        {
            name: "Name",
            type: "text",
            required: true,
            constant: false,
            label: "Title",
            placeholder: "Artwork Name"
        },
        {
            name: "FileName",
            type: "text",
            required: true,
            constant: false,
            label: "File Name",
            placeholder: "File name in /static/img/",
        },
        {
            name: "AltText",
            type: "textarea",
            required: false,
            constant: false,
            label: "Alt Text",
            placeholder: "Descriptive text for the art piece.",
        },
        {
            name: "Date",
            type: "date",
            required: true,
            constant: false,
            label: "Date Completed",
            placeholder: null,
        },
        {
            name: "Description",
            type: "textarea",
            required: false,
            constant: false,
            label: "Commentary",
            placeholder: "Any commentary on the piece.",
        },
        {
            name: "CollectionName",
            type: "text",
            required: false,
            constant: false,
            label: "Collection",
            placeholder: "Name of the collection the art piece belongs to.",
        },
        {
            name: "Medium",
            type: "text",
            required: false,
            constant: false,
            label: "Medium(s)",
            placeholder: "ie: acrylic, digital, etc..."
        },
        {
            name: "Credits",
            type: "text",
            required: false,
            constant: false, 
            label: "Additional Credits",
            placeholder: "Additional credits, if applicable."
        },
    ]
};


/** Properties for pages. */
const PageProperties: interfaces.Property[] = [
    {
        name: "Path",
        type: "text",
        required: true,
        constant: true,
        label: "URL Path",
        placeholder: "new-page",
    },
    {
        name: "Title",
        type: "text",
        required: true,
        constant: false,
        label: "Page Title",
        placeholder: "New Page",
    },
    {
        name: "BodyText",
        type: "textarea",
        required: false,
        constant: false,
        label: "Body",
        placeholder: "Markdown-enabled space for you to put *whatever* text on this page you desire. Go wild...",
    },
    {
        name: "Hidden",
        type: "checkbox",
        required: false,
        constant: false,
        label: "Hide From Sitemap",
        placeholder: null,
    },
    {
        name: "Canonical",
        type: "hidden",
        required: false,
        constant: true,
        label: null,
        placeholder: null,
    }
];

export {
    PageProperties,
    TableProperties,

}
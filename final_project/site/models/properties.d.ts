/**
 * Adds property interface to the interfaces namespace.
 */

namespace interfaces {
    interface Property {
        name: string;
        type: string;
        required: boolean;
        constant: boolean;
        label: string | null;
        placeholder: string | null;
        value?: any;
    }
}
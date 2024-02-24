interface SortCriteria {
    [key: string]: 1 | -1; // Each field name maps to sorting order (1 for ascending, -1 for descending)
}

function parseSortString(input: string | undefined): SortCriteria | undefined {
    if (!input) {
        return undefined
    }

    const sortCriteria: SortCriteria = {};

    // Split the input string by comma to extract individual fields
    const fields = input.split(',');

    // Iterate over the fields and construct the sort criteria object
    fields.forEach(field => {
        const trimmedField = field.trim(); // Trim any leading or trailing whitespace
        if (trimmedField.startsWith('-')) {
            // If field starts with '-', it indicates descending order
            sortCriteria[trimmedField.slice(1)] = -1;
        } else {
            // Otherwise, default to ascending order
            sortCriteria[trimmedField] = 1;
        }
    });

    return sortCriteria;
}

export { SortCriteria, parseSortString }



export function filtersToQuery(filters) {
    return Object.keys(filters)
        .map((key) => key + "=" + encodeURIComponent(filters[key] || ""))
        .join("&");
}
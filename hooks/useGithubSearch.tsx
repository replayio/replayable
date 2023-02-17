import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function filtersToQuery(filters) {
  return Object.keys(filters)
    .map((key) => key + "=" + encodeURIComponent(filters[key] || ""))
    .join("&");
}

export function useGithubSearch(filters, buggy) {
  const { data: resp, error } = useSWR(
    `/api/search?${filtersToQuery(filters)}`,
    fetcher
  );

  // Filter issues that do not match all of the labels
  const issues = resp?.filter(
    (issue) =>
      filters.labels.filter((label) =>
        issue?.labels?.edges?.map((label) => label.node.name).includes(label)
      ).length == filters.labels.length
  );

  return { issues, error };
}

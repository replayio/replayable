import useSWR from "swr";
import { fetcher } from "../util/fetcher";
import { filtersToQuery } from "../util/filtersToQuery";

export function useRepoSearch(filters) {
  const { data: resp, error } = useSWR(
    `/api/issues?${filtersToQuery(filters)}`,
    fetcher
  );

  // Filter issues that do not match all of the labels
  const issues = resp?.filter(
    (issue) =>
      filters.labels.filter((label) =>
        issue.labels.edges?.map((label) => label.node.name).includes(label)
      ).length == filters.labels.length
  );

  return { issues, error };
}

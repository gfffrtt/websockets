import useSWR from "swr";

const fetcher = async (route: string, options?: RequestInit) => {
  const res = await fetch(route, options);

  if (res.status < 200 || res.status >= 300)
    throw new Error(
      `REQUEST FAILED - STATUS ${res.status} - ERROR ${res.statusText} `
    );

  const data = await res.json();
  return data;
};

export const useFetch = (route: string, options?: RequestInit) =>
  useSWR(route, () => fetcher(route, options));

import { useFetch } from "./use-swr";

export const useSession = () => useFetch("http://127.0.0.1:8080/session");

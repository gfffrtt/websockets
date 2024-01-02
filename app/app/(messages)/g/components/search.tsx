import { CiSearch } from "react-icons/ci";
import { Input } from "../../../components/input";
import { useState } from "react";

export const Search = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <form>
      <CiSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
      <Input
        className="w-full bg-white shadow-none appearance-none pl-8 dark:bg-gray-950"
        placeholder="Search messages..."
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

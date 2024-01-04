"use client";

import { CiSearch } from "react-icons/ci";
import { Input } from "../../../components/input";
import { useState } from "react";

export const Search = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <div className="w-full flex-1">
      <form>
        <div className="relative">
          <CiSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
            placeholder="Search messages..."
            type="search"
          />
        </div>
      </form>
    </div>
  );
};

import { Search } from "./components/search";

export default async function Page() {
  return (
    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
      <div className="w-full flex-1">
        <div className="relative">
          <Search />
        </div>
      </div>
    </header>
  );
}

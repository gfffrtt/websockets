import Link from "next/link";
import { LuText } from "react-icons/lu";
import { MdOutlineSettings } from "react-icons/md";
import { db } from "../../../db/connection";
import { Settings } from "./components/settings";

export default async function Page() {
  const groups = await db.group.findMany();

  return (
    <aside className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" href="/g">
            <LuText className="h-6 w-6" />
            <span className="">Chat App</span>
          </Link>
          <Settings />
        </div>
        <div className="flex-1 overflow-auto py-2">
          {groups.map((group) => (
            <nav className="grid items-start px-4 text-sm font-medium">
              <div className="space-y-4">
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  href={`/g/${group.id}`}
                >
                  <div className="h-9 w-9"></div>
                  {group.name}
                </Link>
              </div>
            </nav>
          ))}
        </div>
      </div>
    </aside>
  );
}

"use client";

import { useState } from "react";
import { MdOutlineSettings } from "react-icons/md";
import { CgLogOut } from "react-icons/cg";
import { FaRegPlusSquare } from "react-icons/fa";
import { GroupForm } from "./group-form";

export const Settings = () => {
  const [settings, setSettings] = useState<boolean>(false);
  const [form, setForm] = useState<boolean>(false);

  const handleForm = () => {
    setSettings(!settings);
    setForm(!form);
  };

  return (
    <div className="ml-auto relative">
      <button className="h-8 w-8" onClick={() => setSettings(!settings)}>
        <MdOutlineSettings className="h-4 w-4" />
        <span className="sr-only">Settings</span>
      </button>
      {settings && (
        <div className="fixed bg-white flex flex-col gap-y-4 px-5 py-3 left-[70px] border rounded-lg">
          <button
            className="border-b pb-4 flex items-center"
            onClick={handleForm}
          >
            <FaRegPlusSquare className="mr-2" />
            New group
          </button>
          <button className="flex items-center">
            <CgLogOut className="mr-2" /> Log out
          </button>
        </div>
      )}
      {form && <GroupForm form={form} setForm={setForm} />}
    </div>
  );
};

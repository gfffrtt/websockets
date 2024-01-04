"use client";

import { Dispatch, SetStateAction } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/card";
import { Input } from "../../../../components/input";
import { Label } from "../../../../components/label";
import { Button } from "../../../../components/button";

export type GroupFormProps = {
  form: boolean;
  setForm: Dispatch<SetStateAction<boolean>>;
};

export const GroupForm = (props: GroupFormProps) => {
  return (
    props.form && (
      <div className="bg-gray-50/60 fixed z-20 h-screen inset-0">
        <form className="fixed inset-0 m-auto flex flex-col items-center justify-center min-h-screen py-12 ">
          <Card className="bg-gray-50 p-5">
            <IoMdCloseCircleOutline
              className="text-gray-600 hover:cursor-pointer"
              size={20}
              onClick={() => props.setForm(!props.form)}
            />
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Create a Group
              </CardTitle>
              <CardDescription>
                Start a new chat group with your friends.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-1">
                  <Label>Group Name</Label>
                  <Input id="group-name" placeholder="Enter group name" />
                </div>
                <div className="flex justify-center">
                  <Button className="bg-black text-white" type="submit">
                    Create Group
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    )
  );
};

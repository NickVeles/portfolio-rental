"use client";

import { SettingsFormData, settingsSchema } from "@/lib/schemas";
import { Capitalize, cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "./ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { CustomFormField } from "./FormField";

// TODO: Add password

interface SettingsFormProps {
  initialData: SettingsFormData;
  onSubmit: (data: SettingsFormData) => Promise<void>;
  userType: "manager" | "tenant";
}

const SettingsForm = ({
  initialData,
  onSubmit,
  userType,
}: SettingsFormProps) => {
  const [editMode, setEditMode] = useState(false);
  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: initialData,
  });

  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (editMode) {
      form.reset(initialData);
    }
  };

  const handleSubmit = async (data: SettingsFormData) => {
    await onSubmit(data);
    setEditMode(false);
  };

  return (
    <div className="p-2 sm:p-6 w-full flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-lg">{Capitalize(userType)} Settings</CardTitle>
          <CardDescription>
            Manage your account preferences and personal information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              id="settings-form"
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <CustomFormField name="name" label="Username" disabled={true} />
              <CustomFormField
                name="email"
                label="Email"
                type="email"
                disabled={!editMode}
              />
              <CustomFormField
                name="phoneNumber"
                label="Phone Number"
                disabled={!editMode}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex-col gap-6">
          <p>
            Note: You cannot edit your username or role ({userType}). If you
            want to become a {userType === "manager" ? "tenant" : "manager"},
            please create a new account.
          </p>
          <div className="flex w-full items-center gap-2 justify-start">
            <Button
              type="button"
              onClick={() => form.handleSubmit(handleSubmit)()}
              className={cn(
                "border bg-green-50 hover:bg-green-100",
                !editMode && "hidden",
              )}
            >
              Save
            </Button>
            <Button
              variant="outline"
              onClick={toggleEditMode}
              className={cn(!editMode && "hidden")}
            >
              Cancel
            </Button>
            <Button
              onClick={toggleEditMode}
              className={cn(
                "border bg-blue-50 hover:bg-blue-100",
                editMode && "hidden",
              )}
            >
              Edit
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SettingsForm;

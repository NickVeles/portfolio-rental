"use client";

import { SettingsFormData, settingsSchema } from "@/lib/schemas";
import { Capitalize } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Form, useForm } from "react-hook-form";
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
    <Card className="w-full m-8">
      <CardHeader>
        <CardTitle>{Capitalize(userType)} Settings</CardTitle>
        <CardDescription>
          Manage your account preferences and personal information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
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
      <CardFooter className="flex-row gap-2">
        <p>
          Note: You cannot edit your username or role ({userType}). Please
          create a separate account for these purposes.
        </p>
        {editMode ? (
          <div className="flex justify-between items-center gap-2">
            <Button type="submit">Save</Button>
            <Button variant="outline" onClick={toggleEditMode}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button onClick={toggleEditMode}>Edit</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default SettingsForm;

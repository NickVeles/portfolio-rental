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
          ></form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between items-center gap-2">
        {editMode ? (
          <>
            <Button type="submit">Save</Button>
            <Button variant="outline" onClick={toggleEditMode}>
              Cancel
            </Button>
          </>
        ) : (
          <Button onClick={toggleEditMode}>Edit</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default SettingsForm;

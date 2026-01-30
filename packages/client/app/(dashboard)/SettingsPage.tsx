import SettingsForm from "@/components/SettingsForm";
import { getAuthenticatedUser } from "@/lib/amplify-server-utils";
import { redirect } from "next/navigation";

const SettingsPage = async () => {
  const authUser = await getAuthenticatedUser();

  const handleSubmit = async (data: {
    name: string;
    email: string;
    phoneNumber: string;
  }) => {
    "use server";
    // TODO: add logic
  };

  if (!authUser) {
    redirect("/");
  }

  return (
    <SettingsForm
      initialData={authUser.userInfo}
      onSubmit={handleSubmit}
      userType={authUser.userRole}
    />
  );
};

export default SettingsPage;

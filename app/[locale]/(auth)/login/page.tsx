import LoginLeft from "@/src/components/forms/login/LoginLeft";
import LoginRight from "@/src/components/forms/login/LoginRight";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("Metadata.login");
  return { title: t("title"), description: t("description") };
}

const LoginPage = () => {
  return (
    <main className="flex min-h-dvh w-full flex-col overflow-x-hidden lg:flex-row">
      <LoginLeft />
      <LoginRight />
    </main>
  );
};

export default LoginPage;

import LoginLeft from "@/src/components/forms/login/LoginLeft";
import LoginRight from "@/src/components/forms/login/LoginRight";

const LoginPage = () => {
  return (
    <main className="flex h-dvh w-full overflow-hidden">
      <LoginLeft />
      <LoginRight />
    </main>
  );
};

export default LoginPage;

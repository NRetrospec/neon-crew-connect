import { Navigation } from "@/components/Navigation";
import { LoginForm } from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <LoginForm />
    </div>
  );
};

export default Login;

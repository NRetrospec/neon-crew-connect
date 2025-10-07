import { Navigation } from "@/components/Navigation";
import { SignUpForm } from "@/components/auth/SignUpForm";

const SignUp = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <SignUpForm />
    </div>
  );
};

export default SignUp;

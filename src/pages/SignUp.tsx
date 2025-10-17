import { Navigation } from "@/components/Navigation";
import { SignUpForm } from "@/components/auth/SignUpForm";

const SignUp = () => {
  return (
    <div className="min-h-screen bg-[url('/signup-background.jpeg')] bg-cover bg-center">
      <Navigation />
      <SignUpForm />
    </div>
  );
};

export default SignUp;

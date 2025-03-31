import { SignIn } from '@clerk/nextjs'

const AuthForm = () => {



  return (
    <div className="mt-10 flex items center justify-center h-screen">
      <SignIn />
    </div>
  );
};

export default AuthForm;
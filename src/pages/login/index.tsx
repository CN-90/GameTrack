import LoginForm from '@/components/auth/Login/loginForm';
import RegisterForm from '@/components/auth/Register/registerForm';
import LoginAnimation from '@/components/svg/loginAnimation';
import { useSession } from 'next-auth/react';
import LoginScoreboard from '@/components/loginScoreboard/LoginScoreboard';
import { useRouter } from 'next/router';

function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();


  // Redirect to the homepage if the user is authenticated
  if (session) {
    router.replace('/');
  }


  return (
    <div className="flex bg-neutral-300">
        <div className="flex flex-col justify-center">
        <div className="p-10 font-ctn">
          <h1 className="text-black lh-0_8 font-black m-0">LOREMIPSUM</h1>
          <p className="text-black uppercase font-semibold break-words">Track Games Between You And Your Imaginary Friends</p>
        </div>
        <div className="py-7">
          <LoginForm />
          {/* <RegisterForm /> */}
        </div>
      
      </div>
      <div id="login_svg">
        <LoginAnimation />
        <LoginScoreboard />
      </div>
     
    
    </div>
  )
}

export default LoginPage;
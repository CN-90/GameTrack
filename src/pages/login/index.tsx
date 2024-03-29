import LoginForm from '@/components/auth/Login/LoginForm';
import RegisterForm from '@/components/auth/Register/RegisterForm';
import LoginAnimation from '@/components/svg/LoginAnimation';
import { useSession } from 'next-auth/react';
import LoginScoreboard from '@/components/loginScoreboard/LoginScoreboard';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';

function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Redirect to the homepage if the user is authenticated
  if (session) {
    router.replace('/');
  }


  return (
    <div className="bg-neutral-300">
        <div className="flex flex-col justify-center">
        <div className="p-4 font-ctn m-auto">
          {/* <h1 className="text-8xl text-center text-black lh-0_8 font-black m-0">GAMETRACK</h1> */}
        </div>
        <div id="login_svg">
        <LoginAnimation />
        <LoginScoreboard />
      </div>
        <div className="pb-4">
          <p className="w-full mx-auto flex items-center justify-center max-w-40 k text-2xl px-4 leading-none font-semibold text-center break-words py-4 2xl:text-4xl 2xl:font-normal">Track matches between you and your friends.</p>
          { searchParams.get("register") ? <RegisterForm /> : <LoginForm /> }
        </div>
      
      </div>
     
     
    </div>
  )
}

export default LoginPage;
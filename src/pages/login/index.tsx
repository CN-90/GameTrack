import LoginForm from '@/components/auth/Login/loginForm';
import RegisterForm from '@/components/auth/Register/registerForm';
import LoginAnimation from '@/components/svg/loginAnimation';
import { signIn } from 'next-auth/react';
import styles from './Login.module.css';
import LoginScoreboard from '@/components/loginScoreboard/LoginScoreboard';

function LoginPage() {

  const handleGoogleSignIn = async (event) => {
    event.preventDefault()
    const result = await signIn('google', { callbackUrl: '/' })
  }

  return (
    <div className="flex bg-neutral-300 " id={styles.login}>
        <div className="flex flex-col justify-center">
        <div className="p-10 font-ctn">
          <h1 className="text-black lh-0_8 font-black m-0">LOREMIPSUM</h1>
          <p className="text-black uppercase font-semibold break-words">Track Games Between You And Your Imaginary Friends</p>
        </div>
        <div className="py-7">
          <LoginForm />
        </div>
      
      </div>
      <div id={styles.svgContainer}>
        <LoginAnimation />
        <LoginScoreboard />
      </div>
     
    
    </div>
  )
}

export default LoginPage;
import LoginForm from '@/components/auth/Login/loginForm';
import RegisterForm from '@/components/auth/Register/registerForm';
import { signIn } from 'next-auth/react';

function LoginPage() {

  const handleGoogleSignIn = async (event) => {
    event.preventDefault()
    const result = await signIn('google', { callbackUrl: '/' })
  }

  return (
    <div>
      <h1>Login</h1>
      {/* <button onClick={handleSubmit}>Email and Password</button><br></br> */}
      <button onClick={handleGoogleSignIn}>Google</button>
      <LoginForm/>
    </div>
  )
}

export default LoginPage;
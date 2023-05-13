import RegisterForm from '@/components/auth/Register/registerForm';
import { signIn } from 'next-auth/react';

function LoginPage() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let result = await signIn('credentials', {
        // email: 'test@gmail.com',
        email: 'spagooter@gmail.com',
        password: 'test123',
      });
    } catch (error) {
      alert(error);
      // Handle sign in error...
    }
  }

  const handleGoogleSignIn = async (event) => {
    event.preventDefault()
    const result = await signIn('google', { callbackUrl: '/' })
  }

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleSubmit}>Email and Password</button><br></br>
      <button onClick={handleGoogleSignIn}>Google</button>
      <RegisterForm />
    </div>
  )
}

export default LoginPage;
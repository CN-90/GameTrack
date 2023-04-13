import { signIn } from 'next-auth/react';

function Login() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = "test@gmail.com"
        const password = 'tester'
        const result = await signIn('credentials', { email, password})
        console.log(result);
    }

    const handleGoogleSignIn = async (event) => {
        event.preventDefault()
        const result = await signIn('google', { callbackUrl: '/' })
        console.log(result)
      }

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleSubmit}>Email and Password</button><br></br>
            <button onClick={handleGoogleSignIn}>Google</button>
        </div>
    )
}

export default Login;
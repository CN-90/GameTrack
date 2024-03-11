import { signIn } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEventHandler, useState } from "react";


function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pathname = usePathname()




  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    let signInResult = await signIn('credentials', {
      email: email,
      password: password,
      redirect: false,
      callbackUrl: "/"
    })

    if (signInResult.error) {
      setError(signInResult.error);
    }
  }

  const handleGoogleSignIn = async (event) => {
    event.preventDefault()
    const result = await signIn('google', { callbackUrl: '/' })
  }

  return (
    <form className="flex flex-col w-full md:w-3/4 m-auto gap-2 p-2 xl:w-1/2" onSubmit={handleSubmit}>
      <h1 className="font-bold text-3xl">Sign In</h1>
      {error && <p className="text-red-500">{error}</p>}
      <fieldset>
        <label className="hidden" htmlFor="loginEmail">Email</label>
        <input
          type="email"
          className="p-2 w-full text-white box-shadow-1 gray-placeholder bg-d1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          id="loginEmail"
        />
      </fieldset>

      <fieldset>
        <label className="hidden" htmlFor="">Password</label>
        <input
          type="password"
          className="p-2 w-full text-white box-shadow-1 gray-placeholder bg-d1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </fieldset>
      <p className="font-semibold">No Account? <Link scroll={false} href={`/${pathname}/?register=true`} className="text-red-500">Sign Up</Link></p>
      <button type="submit" className="outline p-2 font-bold uppercase w-1/2 mt-5 m-auto text-lg" disabled={isSubmitting}>Sign In</button>
      <button onClick={handleGoogleSignIn} className="outline p-2 font-bold uppercase w-1/2 mt-2 m-auto text-lg" disabled={isSubmitting}>GOOGLE</button>
    </form>
  );
}

export default LoginForm;
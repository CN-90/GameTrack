import { signIn } from "next-auth/react";
import { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      console.log(email, password)
      let result = await signIn('credentials', {
        email: email,
        password: password
      });

    } catch (error) {

      alert(error);
      // Handle sign in error...
    }
  }

  return (
    <form className="flex flex-col max-w-xl m-auto gap-2 p-2" onSubmit={handleSubmit}>
      <h1 className="font-bold text-3xl">Sign In</h1>
      <label className="hidden" htmlFor="">Email</label>
      <input
        type="email"
        className="p-2 text-white box-shadow-1 gray-placeholder bg-d1"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <label className="hidden" htmlFor="">Password</label>
      <input
        type="password"
        className="p-2 text-white box-shadow-1 gray-placeholder bg-d1"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <p className="font-semibold">No Account? <span className="text-red-500">Register Here</span></p>
      <button className="outline p-2 font-bold uppercase w-1/2 mt-5 m-auto text-lg" disabled={isSubmitting}>Sign In</button>
      <button className="outline p-2 font-bold uppercase w-1/2 mt-5 m-auto text-lg" disabled={isSubmitting}>GOOGLE</button>
    </form>
  );
}

export default LoginForm;
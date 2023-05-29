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
    <form onSubmit={handleSubmit}>
      <label htmlFor="">Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)
        }
      />
      <label htmlFor="">Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button disabled={isSubmitting}>Login</button>
    </form>
  );
}

export default LoginForm;
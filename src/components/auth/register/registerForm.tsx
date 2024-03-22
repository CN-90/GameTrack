import { registerUser } from "@/actions/user";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";




function RegisterForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const pathname = usePathname()


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            setError("Passwords do not match");
            return;
        }
        let user = { email, username, password };

        const res = await registerUser(user);

        if (res.error) {
            setError(res.error);
            return;
        } else {
            await signIn('credentials', {
                email: email,
                password: password,
                redirect: false,
                callbackUrl: "/"
            })

        }





    };

    return (
        <form className="flex flex-col w-3/4 m-auto gap-2 p-2 xl:w-1/2" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 capitalize">{error}</p>}
            <h1 className="font-bold text-3xl">Sign Up</h1>

            <fieldset>
                <label className="hidden" htmlFor="email">Email</label>
                <input
                    className="p-2 w-full text-white box-shadow-1 gray-placeholder bg-d1"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Email"
                />
            </fieldset>
            <fieldset>
                <label className="hidden" htmlFor="username">Username</label>
                <input
                    className="p-2 w-full text-white box-shadow-1 gray-placeholder bg-d1"
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="Username"
                />

            </fieldset>
            <label className="hidden" htmlFor="password">Password</label>
            <input
                className="p-2 w-full text-white box-shadow-1 gray-placeholder bg-d1"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
            />
            <label className="hidden" htmlFor="password">Confirm Password</label>
            <input
                className="p-2 w-full text-white box-shadow-1 gray-placeholder bg-d1"
                type="password"
                id="passwordConfirm"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
                placeholder="Confirm Password"
            />
            <p className="font-semibold">Already Have an Account? <Link scroll={false} href={`/${pathname}/`} className="text-red-500">Sign In</Link></p>

            <button className="outline p-2 font-bold uppercase w-1/2 mt-5 m-auto text-lg" type="submit" disabled={loading}>
                Submit
            </button>
            <button className="outline p-2 font-bold uppercase w-1/2 mt-2 m-auto text-lg" type="submit" disabled={loading}>
                Google
            </button>
        </form>
    );
}



export default RegisterForm;
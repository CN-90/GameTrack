import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

function ProtectRoute({ children }: any) {
    const router = useRouter();
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/login");
        },
    });

    return children;
}

export default ProtectRoute;
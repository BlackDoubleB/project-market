import { useEffect } from "react";
import { useRouter } from "next/router";
import { getToken } from "next-auth/jwt";

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const checkTokenExpiration = async () => {
      const token = await getToken(); // Obtén el token de NextAuth
      if (!token || token.exp * 1000 < Date.now()) {
        // Si el token ha expirado, redirige al usuario a la página de login
        router.push("/login");
      }
    };

    checkTokenExpiration();
  }, [router]);

  return null;
};

export default useAuth;

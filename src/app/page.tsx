"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoginPage from "./login/auth/page";
import Cookies from "js-cookie";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verifica se o cookie "info" existe
    const token = Cookies.get("info");
    if (token) {
      // Se o token existir, define o estado como logado e redireciona para o dashboard
      setIsLoggedIn(true);
      router.push("/dashboard");
    }
  }, [router]);

  // Se o usuário estiver logado, não renderiza a página de login
  if (isLoggedIn) {
    return null; // Ou você pode retornar um componente de carregamento, se preferir
  }

  return <LoginPage />;
}

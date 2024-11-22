"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { LoginClass } from "@/app/api/services/authServices";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email) {
      setError("Por favor, preencha o campo de email.");
      setIsLoading(false);
      return;
    }

    const loginClass = new LoginClass();
    try {
      await loginClass.forgotPass({ email });
      setSuccessMessage("Redirecionando...");

      setTimeout(() => {
        router.push(`/login/resetPass?email=${encodeURIComponent(email)}`);
      }, 2000);
    } catch (err) {
      console.error("Erro ao enviar solicitação de recuperação de senha:", err);
      if (err instanceof Error) {
        setError("Digite um e-mail válido.");
      } else {
        setError("Erro de rede. Tente novamente mais tarde.");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1 flex items-center">
          <CardTitle className="text-2xl mb-2">Esqueci minha senha</CardTitle>
          <CardDescription className="text-1xl">
            Digite seu email para receber o código de verificação
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div className="space-y-2">
              <Input
                id="email"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {successMessage && (
              <Alert className="mt-4">
                <AlertDescription>{successMessage}</AlertDescription>
              </Alert>
            )}
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar código"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link
            href="/login/auth"
            className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            Voltar para login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

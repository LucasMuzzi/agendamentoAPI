"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Configuracoes() {
  const [logoUrl, setLogoUrl] = useState("");

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogoUrl(e.target.value);
  };

  const handleSaveLogo = () => {
    // Aqui você implementaria a lógica para salvar a URL do logo
    console.log("Logo URL saved:", logoUrl);
    // Você pode usar um estado global ou fazer uma chamada de API para atualizar o logo no Sidebar
  };

  return (
    <div className="container mx-auto p-4 md:ml-7">
      <h1 className="text-2xl font-bold mb-4 md:pl-9">Configurações</h1>
      <div className="max-w-md">
        <label
          htmlFor="logo-url"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          URL do Logo
        </label>
        <Input
          type="text"
          id="logo-url"
          value={logoUrl}
          onChange={handleLogoChange}
          placeholder="https://exemplo.com/seu-logo.png"
          className="mb-4"
        />
        <Button onClick={handleSaveLogo}>Salvar Logo</Button>
      </div>
    </div>
  );
}

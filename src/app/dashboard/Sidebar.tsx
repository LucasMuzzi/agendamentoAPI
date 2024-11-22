"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Users,
  Settings,
  LogOut,
  Menu,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LoginClass } from "../api/services/authServices";

const loginClass = new LoginClass();

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  isMobile: boolean;
}

export default function Sidebar({ isOpen, onToggle, isMobile }: SidebarProps) {
  const [logo] = useState("/placeholder.svg?height=50&width=50");
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await loginClass.logout();
      router.push("/login/auth");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <>
      <aside
        className={`${
          isMobile ? "fixed top-0 left-0 h-full z-40" : "relative h-screen"
        } bg-white shadow-md transition-all duration-300 ease-in-out flex flex-col
        ${isOpen ? "w-64" : "w-16"}`}
      >
        <div className="p-4 flex items-center justify-between">
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isOpen ? "w-auto" : "w-0"
            }`}
          >
            <Image src={logo} alt="Logo" width={50} height={50} />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="rounded-full p-2"
          >
            {isOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>
        <nav className="flex-1 space-y-2 p-2">
          <SidebarLink
            href="/dashboard/agendamentos"
            icon={<Menu className="w-5 h-5" />}
            isActive={pathname === "/dashboard/agendamentos"}
            isExpanded={isOpen}
          >
            Agendamentos
          </SidebarLink>
          <SidebarLink
            href="/dashboard/clientes"
            icon={<Users className="w-5 h-5" />}
            isActive={pathname === "/dashboard/clientes"}
            isExpanded={isOpen}
          >
            Cadastro de Clientes
          </SidebarLink>
          <SidebarLink
            href="/dashboard/configuracao"
            icon={<Settings className="w-5 h-5" />}
            isActive={pathname === "/dashboard/configuracao"}
            isExpanded={isOpen}
          >
            Configurações
          </SidebarLink>
        </nav>
        <div className="mt-auto p-4">
          <button
            onClick={handleLogout}
            className={`flex items-center space-x-2 text-red-600 hover:text-red-800 transition-colors w-full
                ${isOpen ? "justify-start" : "justify-center"}`}
          >
            <LogOut className="w-5 h-5" />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={onToggle}
        />
      )}
    </>
  );
}

function SidebarLink({
  href,
  icon,
  children,
  isActive,
  isExpanded,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isActive: boolean;
  isExpanded: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors
        ${
          isActive
            ? "bg-gray-100 text-gray-900"
            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        }
        ${isExpanded ? "justify-start" : "justify-center"}`}
    >
      {icon}
      {isExpanded && <span>{children}</span>}
    </Link>
  );
}

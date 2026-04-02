import React, { useState } from "react";
import { FeatherLock, FeatherMail, FeatherArrowLeft } from "@subframe/core";
import { Button } from "../ui/components/Button";
import { TextField } from "../ui/components/TextField";
import { IconButton } from "../ui/components/IconButton";

interface LoginProps {
  onLogin: () => void;
  onBack: () => void;
}

function Login({ onLogin, onBack }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email === "admin@admin.com" && password === "admin123") {
      onLogin();
    } else {
      setError("Credenciales incorrectas. Intenta: admin@admin.com / admin123");
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-brand-50 via-neutral-50 to-brand-100">
      <div className="absolute top-6 left-6">
        <IconButton
          icon={<FeatherArrowLeft />}
          onClick={onBack}
          variant="neutral-secondary"
        />
      </div>
      
      <div className="flex w-full max-w-md flex-col items-start gap-8 rounded-2xl border border-neutral-border bg-white p-10 shadow-2xl mobile:mx-4 mobile:p-6">
        <div className="flex w-full flex-col items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-100">
            <FeatherLock className="h-8 w-8 text-brand-600" />
          </div>
          <span className="text-heading-2 font-heading-2 text-default-font text-center">
            Panel Administrativo
          </span>
          <span className="text-body font-body text-subtext-color text-center">
            Ingresa tus credenciales para gestionar productos
          </span>
        </div>
        
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
          <TextField
            className="w-full"
            label="Correo electrónico"
            icon={<FeatherMail />}
          >
            <TextField.Input
              placeholder="admin@admin.com"
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </TextField>
          
          <TextField
            className="w-full"
            label="Contraseña"
            icon={<FeatherLock />}
          >
            <TextField.Input
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </TextField>
          
          {error && (
            <div className="flex w-full rounded-lg bg-error-50 border border-error-200 px-4 py-3">
              <span className="text-caption font-caption text-error-700">
                {error}
              </span>
            </div>
          )}
          
          <Button
            className="w-full"
            variant="brand-primary"
            size="lg"
            type="submit"
          >
            Iniciar Sesión
          </Button>
        </form>
        
        <div className="w-full border-t border-neutral-border pt-6">
          <div className="flex flex-col gap-2 rounded-lg bg-neutral-50 p-4">
            <span className="text-caption-bold font-caption-bold text-default-font">
              Credenciales de prueba:
            </span>
            <span className="text-caption font-caption text-subtext-color">
              Email: admin@admin.com
            </span>
            <span className="text-caption font-caption text-subtext-color">
              Contraseña: admin123
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

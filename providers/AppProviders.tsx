import { AuthProvider } from "@/context/AuthContext";
import { ComentariosProvider } from "@/context/ComentariosContext";
import { ComprasProvider } from "@/context/ComprasContext";
import { EventosProvider } from "@/context/EventosContext";
import { FavoritoProvider } from "@/context/FavoritosContext";
import { RecordatoriosProvider } from "@/context/RecordatoriosContext";
import { SeguidoresProvider } from "@/context/SeguidoresContext";
import { ToastProvider } from "@/context/ToastContext";
import { ValidadorProvider } from "@/context/ValidadorContext";
import React from "react";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ToastProvider>
      <AuthProvider>
        <EventosProvider>
          <SeguidoresProvider>
            <ComprasProvider>
              <ValidadorProvider>
                <ComentariosProvider>
                  <FavoritoProvider>
                    <RecordatoriosProvider>{children}</RecordatoriosProvider>
                  </FavoritoProvider>
                </ComentariosProvider>
              </ValidadorProvider>
            </ComprasProvider>
          </SeguidoresProvider>
        </EventosProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

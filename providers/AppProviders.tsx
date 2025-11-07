import { AuthProvider } from "@/context/AuthContext";
import { ComentariosProvider } from "@/context/ComentariosContext";
import { ComprasProvider } from "@/context/ComprasContext";
import { EstadisticasProvider } from "@/context/EstadisticasContext";
import { EventosProvider } from "@/context/EventosContext";
import { FavoritoProvider } from "@/context/FavoritosContext";
import { ProductoraProvider } from "@/context/ProductoraContext";
import { RecordatoriosProvider } from "@/context/RecordatoriosContext";
import { SeguidoresProvider } from "@/context/SeguidoresContext";
import { TicketProvider } from "@/context/TicketContext";
import { ToastProvider } from "@/context/ToastContext";
import { ValidadorProvider } from "@/context/ValidadorContext";
import React from "react";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ToastProvider>
      <AuthProvider>
        <EventosProvider>
          <ProductoraProvider>
            <SeguidoresProvider>
              <ComprasProvider>
                <ValidadorProvider>
                  <TicketProvider>
                    <EstadisticasProvider>
                      <ComentariosProvider>
                        <FavoritoProvider>
                          <RecordatoriosProvider>
                            {children}
                          </RecordatoriosProvider>
                        </FavoritoProvider>
                      </ComentariosProvider>
                    </EstadisticasProvider>
                  </TicketProvider>
                </ValidadorProvider>
              </ComprasProvider>
            </SeguidoresProvider>
          </ProductoraProvider>
        </EventosProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

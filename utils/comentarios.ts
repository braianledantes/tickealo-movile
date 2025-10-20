import { ComentarioDto } from "@/api/dto/comentario.dto";

export const comentariosSimulados = (eventoId: number): ComentarioDto[] => [
  {
    id: 1,
    usuario: {
      userId: 101,
      user: {
        username: "Mariana",
        email: "mariana@example.com",
        emailVerifiedAt: "2025-03-10T15:00:00Z",
        roles: [
          {
            name: "cliente",
            description: "Usuario que compra entradas para eventos",
          },
        ],
      },
      nombre: "Mariana",
      apellido: "Gómez",
      telefono: "+54 11 5555-1111",
      imagenPerfilUrl: "https://randomuser.me/api/portraits/women/44.jpg",
      puntosAcumulados: 120,
    },
    calificacion: 5,
    comentario: "¡Increíble evento! Todo super organizado y buena música 🎶",
    fijado: true,
    like: 48,
    createdAt: new Date("2025-03-12T18:00:00Z"),
    eventoId,
  },
  {
    id: 2,
    usuario: {
      userId: 102,
      user: {
        username: "Lucas",
        email: "lucas_rock@example.com",
        emailVerifiedAt: "2025-02-20T11:00:00Z",
        roles: [
          {
            name: "cliente",
            description: "Usuario que compra entradas para eventos",
          },
        ],
      },
      nombre: "Lucas",
      apellido: "Martínez",
      telefono: "+54 9 11 3333-2222",
      imagenPerfilUrl: "https://randomuser.me/api/portraits/men/22.jpg",
      puntosAcumulados: 75,
    },
    calificacion: 4,
    comentario:
      "Estuvo muy bueno pero el sonido en la parte trasera se escuchaba bajito 🎧",
    fijado: false,
    like: 19,
    createdAt: new Date("2025-03-13T22:15:00Z"),
    eventoId,
  },
  {
    id: 3,
    usuario: {
      userId: 103,
      user: {
        username: "Sofía",
        email: "sofi_musiclover@example.com",
        emailVerifiedAt: "2025-01-02T14:00:00Z",
        roles: [
          {
            name: "cliente",
            description: "Usuario que compra entradas para eventos",
          },
        ],
      },
      nombre: "Sofía",
      apellido: "López",
      telefono: "+54 9 351 223344",
      imagenPerfilUrl: "https://randomuser.me/api/portraits/women/32.jpg",
      puntosAcumulados: 210,
    },
    calificacion: 5,
    comentario: "Excelente atención en la entrada y super buena energía ✨",
    fijado: false,
    like: 35,
    createdAt: new Date("2025-03-14T10:40:00Z"),
    eventoId,
  },
  {
    id: 4,
    usuario: {
      userId: 104,
      user: {
        username: "Ezequiel",
        email: "eze_tech@example.com",
        emailVerifiedAt: null,
        roles: [
          {
            name: "cliente",
            description: "Usuario que compra entradas para eventos",
          },
        ],
      },
      nombre: "Ezequiel",
      apellido: "Fernández",
      telefono: "+54 9 299 445566",
      imagenPerfilUrl: "https://randomuser.me/api/portraits/men/56.jpg",
      puntosAcumulados: 60,
    },
    calificacion: 3,
    comentario: "Me gustó el show pero empezó más tarde de lo anunciado ⏰",
    fijado: false,
    like: 10,
    createdAt: new Date("2025-03-15T09:10:00Z"),
    eventoId: 12,
  },
];

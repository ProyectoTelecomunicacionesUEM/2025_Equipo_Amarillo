import {
  FiMapPin,
  FiCalendar,
  FiShield,
  FiRefreshCw,
  FiClock,
  FiTruck,
  FiDollarSign,
  FiCheckCircle
} from "react-icons/fi";

import { IBenefit } from "@/types";

export const benefits: IBenefit[] = [
  {
    title: "Encuentra tu coche en segundos",
    description:
      "Busca coches disponibles en tu ciudad, compara modelos y precios y reserva en pocos clics, sin complicaciones.",
    bullets: [
      {
        title: "Búsqueda por ciudad",
        description: "Encuentra vehículos disponibles exactamente donde los necesitas.",
        icon: <FiMapPin size={26} />
      },
      {
        title: "Fechas flexibles",
        description: "Selecciona fácilmente la fecha de recogida y devolución.",
        icon: <FiCalendar size={26} />
      },
      {
        title: "Confirmación inmediata",
        description: "Reserva al instante sin esperas ni llamadas.",
        icon: <FiCheckCircle size={26} />
      }
    ],
    imageSrc: "/images/mockup-3.webp"
  },
  {
    title: "Precios claros y sin sorpresas",
    description:
      "Todos nuestros precios incluyen lo esencial para que conduzcas con tranquilidad desde el primer momento.",
    bullets: [
      {
        title: "Kilometraje incluido",
        description: "Conduce sin preocuparte por límites inesperados.",
        icon: <FiTruck size={26} />
      },
      {
        title: "Seguro incluido",
        description: "Protección básica incluida en todas las reservas.",
        icon: <FiShield size={26} />
      },
      {
        title: "Pago seguro",
        description: "Tus datos están protegidos en todo momento.",
        icon: <FiDollarSign size={26} />
      }
    ],
    imageSrc: "/images/mockup-2.webp"
  },
  {
    title: "Flexibilidad total durante tu viaje",
    description:
      "Cambia tus planes sin estrés y disfruta de asistencia cuando más lo necesites.",
    bullets: [
      {
        title: "Cancelación flexible",
        description: "Cancela o modifica tu reserva fácilmente según tus planes.",
        icon: <FiRefreshCw size={26} />
      },
      {
        title: "Soporte 24/7",
        description: "Nuestro equipo te ayuda en cualquier momento, estés donde estés.",
        icon: <FiClock size={26} />
      },
      {
        title: "Recogida y devolución sencilla",
        description: "Proceso rápido en puntos urbanos y aeropuertos.",
        icon: <FiMapPin size={26} />
      }
    ],
    imageSrc: "/images/mockup-1.webp"
  }
];

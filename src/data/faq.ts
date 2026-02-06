import { IFAQ } from "@/types";
import { siteDetails } from "./siteDetails";

export const faqs: IFAQ[] = [
  {
    question: `¿Qué necesito para alquilar un coche con ${siteDetails.siteName}?`,
    answer:
      "Necesitas un carnet de conducir válido, un documento de identidad o pasaporte y una tarjeta bancaria a nombre del conductor principal.",
  },
  {
    question: "¿Está incluido el seguro en el precio?",
    answer:
      `Sí. Todas las reservas en ${siteDetails.siteName} incluyen seguro básico. También puedes añadir coberturas adicionales durante el proceso de reserva.`,
  },
  {
    question: "¿Hay límite de kilometraje?",
    answer:
      `La mayoría de nuestros vehículos incluyen kilometraje ilimitado. En caso de que exista alguna limitación, se mostrará claramente antes de confirmar la reserva.`,
  },
  {
    question: "¿Puedo cancelar o modificar mi reserva?",
    answer:
      `Sí. En ${siteDetails.siteName} puedes modificar o cancelar tu reserva fácilmente desde tu cuenta, siempre que se realice dentro del plazo indicado en tu tarifa.`,
  },
  {
    question: "¿Dónde recojo y devuelvo el coche?",
    answer:
      `Puedes recoger y devolver el vehículo en nuestras oficinas de ciudad y aeropuertos. La ubicación exacta se muestra durante el proceso de reserva.`,
  },
  {
    question: "¿Hay asistencia en carretera?",
    answer:
      `Sí. Todas las reservas incluyen asistencia en carretera 24/7 para que puedas viajar con total tranquilidad.`,
  },
];

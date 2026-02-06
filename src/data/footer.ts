import { IMenuItem, ISocials } from "@/types";

export const footerDetails: {
  subheading: string;
  quickLinks: IMenuItem[];
  email: string;
  telephone: string;
  socials: ISocials;
} = {
  subheading:
    "Alquiler de coches inteligente con IoTCar. Reserva en minutos, gestiona tu vehículo desde la app y conduce con total tranquilidad.",

  quickLinks: [
    {
      text: "Buscar coches",
      url: "#hero",
    },
    {
      text: "Tarifas",
      url: "#pricing",
    },
    {
      text: "Opiniones",
      url: "#testimonials",
    },
  ],

  email: "soporte@iotcar.com",
  telephone: "+34 600 123 456",

  socials: {
    twitter: "https://twitter.com",
    facebook: "https://facebook.com",
    linkedin: "https://www.linkedin.com",
    instagram: "https://www.instagram.com",
  },
};

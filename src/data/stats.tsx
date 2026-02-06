import { BsBarChartFill, BsFillStarFill } from "react-icons/bs";
import { PiGlobeFill } from "react-icons/pi";

import { IStats } from "@/types";

export const stats: IStats[] = [
  {
    title: "50.000+",
    icon: <BsBarChartFill size={34} className="text-blue-500" />,
    description: "Reservas realizadas con éxito en IoTCar en los últimos meses."
  },
  {
    title: "4,9",
    icon: <BsFillStarFill size={34} className="text-yellow-500" />,
    description: "Valoración media de nuestros clientes tras su experiencia de alquiler."
  },
  {
    title: "120+",
    icon: <PiGlobeFill size={34} className="text-green-600" />,
    description: "Ciudades con puntos de recogida y devolución disponibles."
  }
];

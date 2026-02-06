import { IPricing } from "@/types";

export const tiers: IPricing[] = [
  {
    name: 'Económico',
    price: 29,
    features: [
      'Coche compacto ideal para ciudad',
      'Kilometraje incluido',
      'Seguro básico incluido',
      'Cancelación flexible',
      'Asistencia en carretera 24/7',
    ],
  },
  {
    name: 'SUV / Familiar',
    price: 49,
    features: [
      'Vehículo espacioso para viajes en familia',
      'Kilometraje incluido',
      'Seguro a todo riesgo',
      'Cancelación flexible',
      'Asistencia en carretera 24/7',
      'Equipaje grande incluido',
    ],
  },
  {
    name: 'Premium',
    price: 79,
    features: [
      'Vehículos de gama alta',
      'Kilometraje incluido',
      'Seguro premium con franquicia reducida',
      'Cancelación flexible',
      'Asistencia en carretera 24/7',
      'Entrega prioritaria',
    ],
  },
];

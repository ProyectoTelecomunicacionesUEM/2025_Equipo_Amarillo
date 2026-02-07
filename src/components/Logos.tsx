const Logos: React.FC = () => {
  return (
    <section id="logos" className="py-32 px-5 bg-background">
      <p className="text-lg font-medium text-center">
        Con la confianza de <span className="text-secondary">+20000</span> clientes en toda España
      </p>

      <div className="mt-5 w-full flex flex-wrap flex-row items-center justify-evenly gap-8 sm:gap-12 opacity-70 logos-container">
        <img
          src="/logos/seat.svg"
          alt="SEAT"
          className="h-10 object-contain grayscale hover:grayscale-0 transition"
        />

        <img
          src="/logos/renault.svg"
          alt="Renault"
          className="h-10 object-contain grayscale hover:grayscale-0 transition"
        />

        <img
          src="/logos/peugeot.svg"
          alt="Peugeot"
          className="h-10 object-contain grayscale hover:grayscale-0 transition"
        />

        <img
          src="/logos/volkswagen.svg"
          alt="Volkswagen"
          className="h-10 object-contain grayscale hover:grayscale-0 transition"
        />

        <img
          src="/logos/toyota.svg"
          alt="Toyota"
          className="h-10 object-contain grayscale hover:grayscale-0 transition"
        />

        <img
          src="/logos/kia.svg"
          alt="Kia"
          className="h-10 object-contain grayscale hover:grayscale-0 transition"
        />
      </div>
    </section>
  );
};

export default Logos;

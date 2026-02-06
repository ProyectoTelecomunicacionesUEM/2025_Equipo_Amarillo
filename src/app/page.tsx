import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing/Pricing";
import FAQ from "@/components/FAQ";
import Logos from "@/components/Logos";
import Benefits from "@/components/Benefits/Benefits";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Stats from "@/components/Stats";
import CTA from "@/components/CTA";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Logos />
      <Container>
        <Benefits />

        <Section
<<<<<<< HEAD
          id="pricing"
          title="Tarifas"
          description="Precios claros y sin sorpresas. Paga solo por lo que necesitas."
=======
          id="Precios"
          title="Precios"
          description="Precios simples y transparentes. Sin sorpresas."
>>>>>>> f75138932eb102e03984542801c1bae77ff9fd9b
        >
          <Pricing />
        </Section>

        <Section
<<<<<<< HEAD
          id="testimonials"
          title="Opiniones de nuestros clientes"
          description="Descubre cómo IoTCar ha mejorado la experiencia de nuestros usuarios."
=======
          id="Testimonios"
          title="Qué Dicen Nuestros Clientes"
          description="Escucha a quienes han confiado en nosotros."
>>>>>>> f75138932eb102e03984542801c1bae77ff9fd9b
        >
          <Testimonials />
        </Section>

        <FAQ />

        <Stats />

        <CTA />
      </Container>
    </>
  );
};

export default HomePage;

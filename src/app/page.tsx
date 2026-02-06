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

          id="pricing"
          title="Tarifas"
          description="Precios claros y sin sorpresas. Paga solo por lo que necesitas."

        >
          <Pricing />
        </Section>

        <Section

          id="testimonials"
          title="Opiniones de nuestros clientes"
          description="Descubre cómo IoTCar ha mejorado la experiencia de nuestros usuarios."

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

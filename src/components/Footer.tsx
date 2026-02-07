import Link from "next/link";
import React from "react";
import Image from "next/image";

import { siteDetails } from "@/data/siteDetails";
import { footerDetails } from "@/data/footer";
import { getPlatformIconByName } from "@/utils";

const Footer: React.FC = () => {
  return (
    <footer className="bg-hero-background text-foreground py-10">
      <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/Logotipo_OFICIAL.webp"
              alt="IoTCAR logo"
              width={28}
              height={28}
              className="min-w-fit"
            />

            <h3 className="manrope text-xl font-semibold cursor-pointer">
              {siteDetails.siteName}
            </h3>
          </Link>

          <p className="mt-3.5 text-foreground-accent">
            {footerDetails.subheading}
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Enlaces</h4>
          <ul className="text-foreground-accent">
            {footerDetails.quickLinks.map((link) => (
              <li key={link.text} className="mb-2">
                <Link
                  href={link.url}
                  className="hover:text-foreground"
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Contacto</h4>

          {footerDetails.email && (
            <a
              href={`mailto:${footerDetails.email}`}
              className="block text-foreground-accent hover:text-foreground"
            >
              Email: {footerDetails.email}
            </a>
          )}

          {footerDetails.telephone && (
            <a
              href={`tel:${footerDetails.telephone}`}
              className="block text-foreground-accent hover:text-foreground"
            >
              Tel: {footerDetails.telephone}
            </a>
          )}

          {footerDetails.socials && (
            <div className="mt-5 flex items-center gap-5 flex-wrap">
              {Object.keys(footerDetails.socials).map((platformName) => {
                if (
                  platformName &&
                  footerDetails.socials[platformName]
                ) {
                  return (
                    <Link
                      href={footerDetails.socials[platformName]!}
                      key={platformName}
                      aria-label={platformName}
                    >
                      {getPlatformIconByName(platformName)}
                    </Link>
                  );
                }
                return null;
              })}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 md:text-center text-foreground-accent px-6">
        <p>
          Copyright &copy; {new Date().getFullYear()}{" "}
          {siteDetails.siteName}. Todos los derechos reservados.
        </p>

        <p className="text-sm mt-2 text-gray-500">
          Hecho con &hearts; por{" "}
          <a
            href="https://nexilaunch.com"
            target="_blank"
            rel="noreferrer"
          >
            Nexi Launch
          </a>
        </p>

        <p className="text-sm mt-2 text-gray-500">
          UI kit por{" "}
          <a
            href="https://ui8.net/youthmind/products/fintech-finance-mobile-app-ui-kit"
            target="_blank"
            rel="noreferrer"
          >
            Youthmind
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;













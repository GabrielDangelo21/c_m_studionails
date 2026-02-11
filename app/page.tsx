"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [activeImages, setActiveImages] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const indexStr = entry.target.getAttribute("data-index");
          if (indexStr === null) return;
          const index = Number(indexStr);

          if (entry.isIntersecting) {
            setActiveImages((prev) => new Set(prev).add(index));
          } else {
            setActiveImages((prev) => {
              const next = new Set(prev);
              next.delete(index);
              return next;
            });
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "0px 0px -10% 0px" // Trigger slightly before the center
      }
    );

    const images = document.querySelectorAll(".gallery-item");
    images.forEach((img) => observer.observe(img));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Decorative Fragment */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-muted/20 blur-[120px] rounded-full pointer-events-none" />

      {/* 90/10 Asymmetric Container */}
      <main className="container mx-auto px-6 pt-24 pb-32">
        {/* Navigation / Logo Fragment - Absolute to stay at the top */}
        <nav className="absolute top-8 left-6 md:left-12 z-50 flex items-center gap-4">
          <div className="bg-white/80 backdrop-blur-md p-2 rounded-full border border-foreground/5 shadow-sm">
            <Image
              src="/images/gallery/Logo.jpeg"
              alt="C&M Studio Logo"
              width={60}
              height={60}
              className="rounded-full"
            />
          </div>
          <h2 className="font-display text-xl tracking-tighter text-foreground mix-blend-difference hidden sm:block">
            C&M Studio
          </h2>
        </nav>

        {/* Hero Section - Balanced Grid for Side-by-Side Layout */}
        <section className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-12">
          <div className="md:col-span-7 lg:col-span-7 reveal stagger-1">
            <span className="inline-block text-accent font-medium tracking-widest uppercase text-xs mb-4">
              Estudio de Belleza Profesional
            </span>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tighter text-foreground mb-12">
              El arte <br />
              de tus <br />
              <span className="italic text-secondary">manos</span>.
            </h1>

            <p className="max-w-md text-lg text-foreground/70 leading-relaxed mb-12 font-sans">
              Especialista en manicura y pedicura de alta precisión. Donde cada detalle cuenta para resaltar tu elegancia natural.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 mb-16">
              <a
                href="https://wa.me/34622160989"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-4 bg-foreground text-background overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 text-center"
              >
                <span className="relative z-10 font-medium text-sm tracking-widest uppercase">Reservar Cita</span>
                <div className="absolute inset-0 bg-accent translate-y-full transition-transform group-hover:translate-y-0" />
              </a>
              <a href="#galeria" className="px-8 py-4 border border-foreground/10 hover:border-accent transition-colors duration-300 text-center font-medium text-sm tracking-widest uppercase">
                Ver Galería
              </a>
            </div>
          </div>

          {/* Single Owner Portrait - Fixed Spans to prevent wrapping */}
          <div className="md:col-span-5 lg:col-span-5 relative reveal stagger-2">
            <div className="relative aspect-[3/4] w-full max-w-[380px] lg:max-w-[420px] ml-auto border-8 border-background shadow-2xl overflow-hidden">
              <Image
                src="/images/gallery/Dona1.jpeg"
                alt="Dona - C&M Studio"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Services & Catalog Section */}
        <section className="mt-48 reveal stagger-3 border-t border-foreground/5 pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <div className="flex items-center gap-4 mb-12">
                <div className="h-[1px] w-12 bg-accent" />
                <h2 className="font-display text-4xl italic">Servicios y Catálogo</h2>
              </div>

              <div className="space-y-12 mb-16">
                {[
                  { title: "Manicura Premium", desc: "Cuidado profundo, limado y esmaltado de larga duración.", price: "desde 25€" },
                  { title: "Pedicura Spa", desc: "Tratamiento revitalizante para una relajación total.", price: "desde 35€" },
                  { title: "Nail Art", desc: "Diseños personalizados hechos a mano con pincel fino.", price: "desde 5€" },
                ].map((service, idx) => (
                  <div key={idx} className="group cursor-default border-b border-foreground/5 pb-6">
                    <div className="flex justify-between items-baseline mb-2">
                      <h3 className="font-display text-2xl group-hover:text-accent transition-colors">{service.title}</h3>
                      <span className="text-secondary font-medium italic">{service.price}</span>
                    </div>
                    <p className="text-foreground/60 text-sm max-w-sm">{service.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative group overflow-hidden">
              <div className="absolute inset-0 bg-foreground/5 group-hover:bg-transparent transition-colors z-10" />
              <Image
                src="/images/gallery/Catalogo.jpeg"
                alt="Catálogo C&M Studio"
                width={600}
                height={800}
                className="w-full h-auto grayscale-[50%] group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute bottom-6 left-6 z-20 bg-background/90 p-4 border border-accent/20">
                <p className="text-xs tracking-[0.2em] font-medium uppercase">Tendencias 2026</p>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section - Fragmented Grid */}
        <section id="galeria" className="mt-48 reveal">
          <h2 className="font-display text-6xl md:text-8xl mb-24 opacity-10 leading-none">GALERIA</h2>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
            {[
              "/images/gallery/Exemplo.jpeg",
              "/images/gallery/Exemplo1.jpeg",
              "/images/gallery/Exemplo2.jpeg",
              "/images/gallery/Exemplo3.jpeg",
              "/images/gallery/Exemplo4.jpeg"
            ].map((img, idx) => (
              <div
                key={idx}
                data-index={idx}
                className="gallery-item break-inside-avoid overflow-hidden border border-foreground/5 group transition-all duration-700"
              >
                <Image
                  src={img}
                  alt={`Trabajo realizado ${idx + 1}`}
                  width={500}
                  height={idx % 2 === 0 ? 600 : 400}
                  className={`w-full h-auto transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105 ${activeImages.has(idx) ? "grayscale-0" : "grayscale"
                    }`}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Footer - Minimalist */}
        <footer className="mt-64 pt-12 border-t border-foreground/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <Image src="/images/gallery/Logo.jpeg" alt="Logo Footer" width={30} height={30} className="rounded-full grayscale" />
            <p className="text-xs text-foreground/40 tracking-widest uppercase">
              © 2026 C&M Studio Nails. Todos os direitos reservados.
            </p>
          </div>
          <div className="flex gap-12 text-xs tracking-widest uppercase font-medium">
            <a href="https://instagram.com/c_m_studionails" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Instagram</a>
            <a href="https://wa.me/34622160989" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">WhatsApp</a>
          </div>
        </footer>
      </main>
    </div>
  );
}

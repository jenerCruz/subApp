import React, { useState, useMemo } from "react";
import { FeatherChevronDown } from "@subframe/core";
import { FeatherMenu } from "@subframe/core";
import { FeatherMessageCircle } from "@subframe/core";
import { FeatherSearch } from "@subframe/core";
import { FeatherTrendingUp } from "@subframe/core";
import { FeatherUser } from "@subframe/core";
import { FeatherHome } from "@subframe/core";
import { FeatherShoppingBag } from "@subframe/core";
import { FeatherStar } from "@subframe/core";
import { FeatherMail } from "@subframe/core";
import { Badge } from "../ui/components/Badge";
import { Button } from "../ui/components/Button";
import { IconButton } from "../ui/components/IconButton";
import { TextField } from "../ui/components/TextField";
import { Product } from "../types";

type ViewType = "home" | "catalog" | "news" | "contact" | "admin" | "login";

interface MarketplaceProps {
  products: Product[];
  whatsappNumber: string;
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

function Marketplace({ products, whatsappNumber, currentView, onNavigate }: MarketplaceProps) {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return ["Todos", ...Array.from(cats)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "Todos" || product.category === selectedCategory;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const handleWhatsAppClick = (product: Product) => {
    const message = encodeURIComponent(
      `Hola, estoy interesado en: ${product.name} - $${product.price.toFixed(2)} MXN`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  const newProducts = products.filter(p => p.badge === "Nuevo").slice(0, 6);

  const renderContent = () => {
    if (currentView === "home") {
      return (
        <>
          <div className="relative w-full h-[500px] bg-gradient-to-br from-brand-600 via-brand-500 to-brand-700 rounded-2xl overflow-hidden shadow-2xl mb-12 mobile:h-[400px]">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
            <div className="relative h-full flex flex-col items-center justify-center px-8 text-center">
              <span className="text-[56px] font-bold text-white mb-4 mobile:text-[36px]">
                Productos Sublimables Premium
              </span>
              <span className="text-[20px] text-white/90 mb-8 max-w-2xl mobile:text-[16px]">
                Encuentra los mejores blancos para tus proyectos de personalización. 
                Calidad profesional, precios competitivos.
              </span>
              <Button
                variant="brand-primary"
                size="lg"
                className="bg-white text-brand-600 hover:bg-white/90 px-8 py-6 text-lg shadow-lg"
                onClick={() => onNavigate("catalog")}
              >
                Ver Catálogo Completo
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-6 mb-12">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <span className="text-heading-1 font-heading-1 text-default-font">
                  Productos Destacados
                </span>
                <span className="text-body font-body text-subtext-color">
                  Los más vendidos de nuestra colección
                </span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-6 mobile:grid-cols-2 mobile:gap-4">
              {products.filter(p => p.badge === "Más vendido").slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} onWhatsAppClick={handleWhatsAppClick} />
              ))}
            </div>
          </div>

          <div className="w-full bg-gradient-to-r from-neutral-50 to-neutral-100 rounded-2xl p-12 mb-12 mobile:p-6">
            <div className="flex items-center justify-between gap-8 mobile:flex-col mobile:text-center">
              <div className="flex flex-col gap-3 flex-1">
                <span className="text-heading-2 font-heading-2 text-default-font">
                  ¿Tienes dudas sobre algún producto?
                </span>
                <span className="text-body font-body text-subtext-color">
                  Contáctanos por WhatsApp y te asesoramos de inmediato
                </span>
              </div>
              <Button
                variant="brand-primary"
                size="lg"
                icon={<FeatherMessageCircle />}
                className="bg-[#25D366] hover:bg-[#128C7E] whitespace-nowrap"
                onClick={() => window.open(`https://wa.me/${whatsappNumber}`, "_blank")}
              >
                Contactar por WhatsApp
              </Button>
            </div>
          </div>
        </>
      );
    }

    if (currentView === "catalog") {
      return (
        <div className="flex w-full flex-col gap-8">
          <div className="flex flex-col gap-4">
            <span className="text-heading-1 font-heading-1 text-default-font">
              Catálogo Completo
            </span>
            <span className="text-body font-body text-subtext-color">
              Explora todos nuestros productos para sublimación
            </span>
          </div>
          
          <div className="flex items-center justify-between gap-4 mobile:flex-col mobile:items-start">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category
                      ? "brand-primary"
                      : "neutral-secondary"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6 mobile:grid-cols-2 mobile:gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onWhatsAppClick={handleWhatsAppClick} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="flex w-full items-center justify-center py-16">
              <span className="text-body font-body text-subtext-color">
                No se encontraron productos.
              </span>
            </div>
          )}
        </div>
      );
    }

    if (currentView === "news") {
      return (
        <div className="flex w-full flex-col gap-8">
          <div className="flex flex-col gap-4">
            <span className="text-heading-1 font-heading-1 text-default-font">
              Novedades
            </span>
            <span className="text-body font-body text-subtext-color">
              Los productos más recientes en nuestro catálogo
            </span>
          </div>

          <div className="grid grid-cols-4 gap-6 mobile:grid-cols-2 mobile:gap-4">
            {newProducts.length > 0 ? (
              newProducts.map((product) => (
                <ProductCard key={product.id} product={product} onWhatsAppClick={handleWhatsAppClick} />
              ))
            ) : (
              <div className="col-span-4 flex w-full items-center justify-center py-16">
                <span className="text-body font-body text-subtext-color">
                  No hay productos nuevos por el momento.
                </span>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (currentView === "contact") {
      return (
        <div className="flex w-full flex-col gap-8">
          <div className="flex flex-col gap-4">
            <span className="text-heading-1 font-heading-1 text-default-font">
              Contacto
            </span>
            <span className="text-body font-body text-subtext-color">
              Estamos para ayudarte en lo que necesites
            </span>
          </div>

          <div className="grid grid-cols-2 gap-6 mobile:grid-cols-1">
            <div className="flex flex-col gap-6 bg-white rounded-xl border border-neutral-border p-8 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366]/10">
                  <FeatherMessageCircle className="h-6 w-6 text-[#25D366]" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-heading-3 font-heading-3 text-default-font">
                    WhatsApp
                  </span>
                  <span className="text-body font-body text-subtext-color">
                    Contáctanos directamente
                  </span>
                </div>
              </div>
              <Button
                variant="brand-primary"
                size="lg"
                icon={<FeatherMessageCircle />}
                className="bg-[#25D366] hover:bg-[#128C7E] w-full"
                onClick={() => window.open(`https://wa.me/${whatsappNumber}`, "_blank")}
              >
                Abrir WhatsApp
              </Button>
            </div>

            <div className="flex flex-col gap-6 bg-white rounded-xl border border-neutral-border p-8 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100">
                  <FeatherMail className="h-6 w-6 text-brand-600" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-heading-3 font-heading-3 text-default-font">
                    Email
                  </span>
                  <span className="text-body font-body text-subtext-color">
                    ventas@sublimacion.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gradient-to-b from-neutral-50 to-white">
      <div className="sticky top-0 z-50 flex w-full flex-col items-center justify-center bg-white/80 backdrop-blur-lg shadow-sm border-b border-neutral-border">
        <div className="flex w-full max-w-[1280px] items-center justify-between px-6 py-4 mobile:px-4">
          <div className="flex items-center gap-8">
            <span 
              className="text-heading-2 font-heading-2 text-brand-600 cursor-pointer hover:text-brand-700 transition-colors"
              onClick={() => onNavigate("home")}
            >
              SubliShop
            </span>
            <nav className="flex items-center gap-1 mobile:hidden">
              <Button
                variant={currentView === "home" ? "brand-primary" : "neutral-tertiary"}
                size="sm"
                icon={<FeatherHome />}
                onClick={() => onNavigate("home")}
              >
                Inicio
              </Button>
              <Button
                variant={currentView === "catalog" ? "brand-primary" : "neutral-tertiary"}
                size="sm"
                icon={<FeatherShoppingBag />}
                onClick={() => onNavigate("catalog")}
              >
                Catálogo
              </Button>
              <Button
                variant={currentView === "news" ? "brand-primary" : "neutral-tertiary"}
                size="sm"
                icon={<FeatherStar />}
                onClick={() => onNavigate("news")}
              >
                Novedades
              </Button>
              <Button
                variant={currentView === "contact" ? "brand-primary" : "neutral-tertiary"}
                size="sm"
                icon={<FeatherMail />}
                onClick={() => onNavigate("contact")}
              >
                Contacto
              </Button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <TextField
              className="h-auto w-64 flex-none mobile:hidden"
              variant="filled"
              label=""
              helpText=""
              icon={<FeatherSearch />}
            >
              <TextField.Input
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(event.target.value)
                }
              />
            </TextField>
            <Button
              variant="neutral-secondary"
              size="sm"
              icon={<FeatherUser />}
              onClick={() => onNavigate("admin")}
              className="mobile:hidden"
            >
              Admin
            </Button>
            <IconButton
              className="hidden mobile:flex"
              icon={<FeatherMenu />}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            />
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="hidden mobile:flex w-full flex-col gap-2 p-4 border-t border-neutral-border bg-white">
            <Button
              variant={currentView === "home" ? "brand-primary" : "neutral-secondary"}
              icon={<FeatherHome />}
              onClick={() => {
                onNavigate("home");
                setMobileMenuOpen(false);
              }}
              className="w-full justify-start"
            >
              Inicio
            </Button>
            <Button
              variant={currentView === "catalog" ? "brand-primary" : "neutral-secondary"}
              icon={<FeatherShoppingBag />}
              onClick={() => {
                onNavigate("catalog");
                setMobileMenuOpen(false);
              }}
              className="w-full justify-start"
            >
              Catálogo
            </Button>
            <Button
              variant={currentView === "news" ? "brand-primary" : "neutral-secondary"}
              icon={<FeatherStar />}
              onClick={() => {
                onNavigate("news");
                setMobileMenuOpen(false);
              }}
              className="w-full justify-start"
            >
              Novedades
            </Button>
            <Button
              variant={currentView === "contact" ? "brand-primary" : "neutral-secondary"}
              icon={<FeatherMail />}
              onClick={() => {
                onNavigate("contact");
                setMobileMenuOpen(false);
              }}
              className="w-full justify-start"
            >
              Contacto
            </Button>
            <Button
              variant="neutral-secondary"
              icon={<FeatherUser />}
              onClick={() => {
                onNavigate("admin");
                setMobileMenuOpen(false);
              }}
              className="w-full justify-start"
            >
              Admin
            </Button>
            <TextField
              className="w-full"
              variant="filled"
              label=""
              helpText=""
              icon={<FeatherSearch />}
            >
              <TextField.Input
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(event.target.value)
                }
              />
            </TextField>
          </div>
        )}
      </div>

      <div className="flex w-full max-w-[1280px] flex-col items-start px-6 py-12 mobile:px-4 mobile:py-8">
        {renderContent()}
      </div>

      <footer className="w-full bg-neutral-900 text-white py-12 mt-16">
        <div className="max-w-[1280px] mx-auto px-6 mobile:px-4">
          <div className="grid grid-cols-4 gap-8 mobile:grid-cols-1">
            <div className="flex flex-col gap-4">
              <span className="text-heading-3 font-heading-3">SubliShop</span>
              <span className="text-caption font-caption text-white/70">
                Tu tienda de confianza para productos sublimables de calidad premium.
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-body-bold font-body-bold">Navegación</span>
              <button onClick={() => onNavigate("home")} className="text-caption text-white/70 hover:text-white text-left">Inicio</button>
              <button onClick={() => onNavigate("catalog")} className="text-caption text-white/70 hover:text-white text-left">Catálogo</button>
              <button onClick={() => onNavigate("news")} className="text-caption text-white/70 hover:text-white text-left">Novedades</button>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-body-bold font-body-bold">Contacto</span>
              <span className="text-caption text-white/70">WhatsApp: Disponible</span>
              <span className="text-caption text-white/70">Email: ventas@sublimacion.com</span>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-body-bold font-body-bold">Categorías</span>
              {categories.slice(1, 5).map((cat) => (
                <span key={cat} className="text-caption text-white/70">{cat}</span>
              ))}
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <span className="text-caption text-white/50">
              © 2024 SubliShop. Todos los derechos reservados.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ProductCard({ product, onWhatsAppClick }: { product: Product; onWhatsAppClick: (product: Product) => void }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-neutral-border bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative flex h-64 items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 overflow-hidden mobile:h-48">
        {product.badge && (
          <Badge
            className="absolute left-3 top-3 z-10 shadow-sm"
            variant={product.badge === "Más vendido" ? "success" : "brand"}
            icon={product.badge === "Más vendido" ? <FeatherTrendingUp /> : undefined}
          >
            {product.badge}
          </Badge>
        )}
        <img
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          src={product.imageUrl}
          alt={product.name}
        />
      </div>
      <div className="flex flex-col gap-4 p-5">
        <div className="flex flex-col gap-2">
          <span className="line-clamp-2 text-body-bold font-body-bold text-default-font min-h-[48px]">
            {product.name}
          </span>
          <span className="text-caption font-caption text-subtext-color line-clamp-1">
            {product.description}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-heading-3 font-heading-3 text-brand-600">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-caption font-caption text-subtext-color">MXN</span>
        </div>
        <Button
          className="w-full bg-[#25D366] text-white hover:bg-[#128C7E] shadow-sm"
          variant="brand-primary"
          icon={<FeatherMessageCircle />}
          onClick={() => onWhatsAppClick(product)}
        >
          Consultar
        </Button>
      </div>
    </div>
  );
}

export default Marketplace;

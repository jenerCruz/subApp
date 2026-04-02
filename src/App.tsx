import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import MarketplaceMobile from "./pages/MarketplaceMobile";
import Marketplace from "./pages/Marketplace";
import { Product } from "./types";

type ViewType = "home" | "catalog" | "news" | "contact" | "admin" | "login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>("home");
  const [useMobileView, setUseMobileView] = useState(false);
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Taza Blanca Premium 11oz Grado AAA",
      description: "Caja con 36 piezas",
      price: 35.0,
      category: "Tazas",
      imageUrl:
        "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=400",
      badge: "Más vendido",
    },
    {
      id: "2",
      name: "Playera Cuello Redondo Tacto Algodón",
      description: "Tallas S a XL",
      price: 85.0,
      category: "Textiles",
      imageUrl:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: "3",
      name: "Gorra Trucker Frente Blanco Malla Color",
      description: "Varios colores",
      price: 32.0,
      category: "Gorras",
      imageUrl:
        "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=400",
      badge: "Nuevo",
    },
    {
      id: "4",
      name: "Termo Vaso de Acero Inoxidable 20oz",
      description: "Incluye tapa deslizable",
      price: 115.0,
      category: "Termos",
      imageUrl:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: "5",
      name: "Sudadera Blanca con Gorro y Cangurera",
      description: "Felpa Premium",
      price: 195.0,
      category: "Textiles",
      imageUrl:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: "6",
      name: "Bolsa Ecológica Tote Bag Tela Canvas",
      description: "40x40 cm",
      price: 42.0,
      category: "Textiles",
      imageUrl:
        "https://images.unsplash.com/photo-1597484661643-2f5fef640df1?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: "7",
      name: "Mousepad Rectangular Neopreno",
      description: "Grosor 3mm",
      price: 18.0,
      category: "MDF & Madera",
      imageUrl:
        "https://images.unsplash.com/photo-1576402324976-1e6629f1b9f7?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: "8",
      name: "Cilindro Deportivo Aluminio 600ml",
      description: "Color Plata y Blanco",
      price: 65.0,
      category: "Termos",
      imageUrl:
        "https://images.unsplash.com/photo-1620063216834-39958742b2ab?auto=format&fit=crop&q=80&w=400",
    },
  ]);
  const [whatsappNumber, setWhatsappNumber] = useState("5215512345678");

  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    const savedWhatsapp = localStorage.getItem("whatsappNumber");
    
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
    if (savedWhatsapp) {
      setWhatsappNumber(savedWhatsapp);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("whatsappNumber", whatsappNumber);
  }, [whatsappNumber]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentView("admin");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView("home");
  };

  const handleAddProduct = (product: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
    };
    setProducts([...products, newProduct]);
  };

  const handleEditProduct = (id: string, product: Omit<Product, "id">) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...product, id } : p))
    );
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleNavigation = (view: ViewType) => {
    if (view === "admin" && !isAuthenticated) {
      setCurrentView("login");
    } else {
      setCurrentView(view);
    }
  };

  if (currentView === "login") {
    return <Login onLogin={handleLogin} onBack={() => setCurrentView("home")} />;
  }

  if (currentView === "admin" && isAuthenticated) {
    return (
      <AdminPanel
        products={products}
        onAddProduct={handleAddProduct}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
        whatsappNumber={whatsappNumber}
        onWhatsappNumberChange={setWhatsappNumber}
        onLogout={handleLogout}
        onNavigate={handleNavigation}
      />
    );
  }

  if (useMobileView) {
    return <MarketplaceMobile />;
  }

  return (
    <Marketplace
      products={products}
      whatsappNumber={whatsappNumber}
      currentView={currentView}
      onNavigate={handleNavigation}
    />
  );
}

export default App;

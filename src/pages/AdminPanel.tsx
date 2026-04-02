import React, { useState } from "react";
import {
  FeatherPlus,
  FeatherEdit,
  FeatherTrash,
  FeatherLogOut,
  FeatherSettings,
  FeatherPackage,
  FeatherHome,
  FeatherMessageCircle,
  FeatherX,
  FeatherCheck,
} from "@subframe/core";
import { Button } from "../ui/components/Button";
import { TextField } from "../ui/components/TextField";
import { TextArea } from "../ui/components/TextArea";
import { Badge } from "../ui/components/Badge";
import { IconButton } from "../ui/components/IconButton";
import { Product } from "../types";

type ViewType = "home" | "catalog" | "news" | "contact" | "admin" | "login";

interface AdminPanelProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, "id">) => void;
  onEditProduct: (id: string, product: Omit<Product, "id">) => void;
  onDeleteProduct: (id: string) => void;
  whatsappNumber: string;
  onWhatsappNumberChange: (number: string) => void;
  onLogout: () => void;
  onNavigate: (view: ViewType) => void;
}

function AdminPanel({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  whatsappNumber,
  onWhatsappNumberChange,
  onLogout,
  onNavigate,
}: AdminPanelProps) {
  const [view, setView] = useState<"products" | "settings">("products");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
    badge: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      imageUrl: "",
      badge: "",
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      imageUrl: formData.imageUrl,
      badge: formData.badge || undefined,
    };

    if (editingProduct) {
      onEditProduct(editingProduct.id, productData);
    } else {
      onAddProduct(productData);
    }
    
    resetForm();
  };

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      imageUrl: product.imageUrl,
      badge: product.badge || "",
    });
    setEditingProduct(product);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="flex w-72 flex-col border-r border-solid border-neutral-border bg-white shadow-lg mobile:hidden">
        <div className="flex items-center gap-3 border-b border-solid border-neutral-border px-6 py-6 bg-gradient-to-r from-brand-600 to-brand-700">
          <span className="text-heading-2 font-heading-2 text-white">
            SubliShop Admin
          </span>
        </div>
        
        <div className="flex flex-col gap-2 p-4">
          <Button
            className="w-full justify-start"
            variant={view === "products" ? "brand-primary" : "neutral-secondary"}
            icon={<FeatherPackage />}
            onClick={() => setView("products")}
          >
            Productos ({products.length})
          </Button>
          <Button
            className="w-full justify-start"
            variant={view === "settings" ? "brand-primary" : "neutral-secondary"}
            icon={<FeatherSettings />}
            onClick={() => setView("settings")}
          >
            Configuración
          </Button>
        </div>
        
        <div className="mt-auto flex flex-col gap-2 border-t border-solid border-neutral-border p-4">
          <Button
            className="w-full justify-start"
            variant="neutral-secondary"
            icon={<FeatherHome />}
            onClick={() => onNavigate("home")}
          >
            Ver Tienda
          </Button>
          <Button
            className="w-full justify-start"
            variant="destructive-secondary"
            icon={<FeatherLogOut />}
            onClick={onLogout}
          >
            Cerrar Sesión
          </Button>
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-auto">
        {view === "products" && (
          <div className="flex flex-col gap-8 p-8 mobile:p-4">
            <div className="flex items-center justify-between gap-4 mobile:flex-col mobile:items-start">
              <div className="flex flex-col gap-2">
                <span className="text-heading-1 font-heading-1 text-default-font">
                  Gestión de Productos
                </span>
                <span className="text-body font-body text-subtext-color">
                  {products.length} productos en total
                </span>
              </div>
              <Button
                variant={showForm ? "neutral-secondary" : "brand-primary"}
                size="lg"
                icon={showForm ? <FeatherX /> : <FeatherPlus />}
                onClick={() => {
                  if (showForm) {
                    resetForm();
                  } else {
                    setShowForm(true);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                {showForm ? "Cancelar" : "Nuevo Producto"}
              </Button>
            </div>

            {showForm && (
              <div className="rounded-2xl border border-solid border-neutral-border bg-white p-8 shadow-lg mobile:p-4">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100">
                    {editingProduct ? <FeatherEdit className="h-5 w-5 text-brand-600" /> : <FeatherPlus className="h-5 w-5 text-brand-600" />}
                  </div>
                  <span className="text-heading-2 font-heading-2 text-default-font">
                    {editingProduct ? "Editar Producto" : "Nuevo Producto"}
                  </span>
                </div>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-2 gap-6 mobile:grid-cols-1">
                    <TextField className="w-full" label="Nombre del producto *">
                      <TextField.Input
                        placeholder="Ej: Taza Blanca Premium"
                        value={formData.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </TextField>

                    <TextField className="w-full" label="Categoría *">
                      <TextField.Input
                        placeholder="Ej: Tazas, Textiles, Gorras"
                        value={formData.category}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        required
                      />
                    </TextField>
                  </div>

                  <TextArea
                    className="w-full"
                    label="Descripción *"
                    helpText="Detalles adicionales del producto"
                  >
                    <TextArea.Input
                      placeholder="Ej: Caja con 36 piezas, calidad premium"
                      value={formData.description}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      required
                    />
                  </TextArea>

                  <div className="grid grid-cols-2 gap-6 mobile:grid-cols-1">
                    <TextField className="w-full" label="Precio (MXN) *">
                      <TextField.Input
                        placeholder="35.00"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        required
                      />
                    </TextField>

                    <TextField
                      className="w-full"
                      label="Etiqueta (Opcional)"
                      helpText="Ej: Nuevo, Más vendido"
                    >
                      <TextField.Input
                        placeholder="Nuevo"
                        value={formData.badge}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFormData({ ...formData, badge: e.target.value })
                        }
                      />
                    </TextField>
                  </div>

                  <TextField
                    className="w-full"
                    label="URL de la imagen *"
                    helpText="URL completa de la imagen del producto"
                  >
                    <TextField.Input
                      placeholder="https://images.unsplash.com/..."
                      value={formData.imageUrl}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, imageUrl: e.target.value })
                      }
                      required
                    />
                  </TextField>

                  {formData.imageUrl && (
                    <div className="flex flex-col gap-2">
                      <span className="text-caption-bold font-caption-bold text-default-font">
                        Vista previa:
                      </span>
                      <img
                        src={formData.imageUrl}
                        alt="Preview"
                        className="h-48 w-full rounded-lg object-cover border border-neutral-border"
                      />
                    </div>
                  )}

                  <div className="flex gap-3 mobile:flex-col">
                    <Button type="submit" variant="brand-primary" size="lg" icon={<FeatherCheck />} className="mobile:w-full">
                      {editingProduct ? "Guardar Cambios" : "Crear Producto"}
                    </Button>
                    <Button
                      type="button"
                      variant="neutral-secondary"
                      size="lg"
                      onClick={resetForm}
                      className="mobile:w-full"
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid grid-cols-3 gap-6 mobile:grid-cols-1">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group flex flex-col overflow-hidden rounded-xl border border-solid border-neutral-border bg-white shadow-sm transition-all hover:shadow-lg"
                >
                  <div className="relative flex h-56 items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100">
                    {product.badge && (
                      <Badge className="absolute left-3 top-3 z-10 shadow-sm" variant="brand">
                        {product.badge}
                      </Badge>
                    )}
                    <img
                      className="h-full w-full object-cover"
                      src={product.imageUrl}
                      alt={product.name}
                    />
                  </div>
                  <div className="flex flex-col gap-4 p-5">
                    <div className="flex flex-col gap-2">
                      <span className="line-clamp-2 text-body-bold font-body-bold text-default-font">
                        {product.name}
                      </span>
                      <span className="text-caption font-caption text-subtext-color line-clamp-1">
                        {product.description}
                      </span>
                      <Badge variant="neutral" className="w-fit">
                        {product.category}
                      </Badge>
                    </div>
                    <span className="text-heading-3 font-heading-3 text-brand-600">
                      ${product.price.toFixed(2)} MXN
                    </span>
                    <div className="flex gap-2">
                      <Button
                        className="flex-1"
                        variant="brand-secondary"
                        size="sm"
                        icon={<FeatherEdit />}
                        onClick={() => handleEdit(product)}
                      >
                        Editar
                      </Button>
                      <IconButton
                        variant="destructive-secondary"
                        size="sm"
                        icon={<FeatherTrash />}
                        onClick={() => {
                          if (confirm(`¿Eliminar "${product.name}"?`)) {
                            onDeleteProduct(product.id);
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {products.length === 0 && !showForm && (
              <div className="flex flex-col items-center justify-center gap-6 rounded-2xl border-2 border-dashed border-neutral-border bg-white py-20">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100">
                  <FeatherPackage className="h-10 w-10 text-neutral-400" />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-heading-3 font-heading-3 text-default-font">
                    No hay productos
                  </span>
                  <span className="text-body font-body text-subtext-color">
                    Crea tu primer producto para comenzar
                  </span>
                </div>
                <Button
                  variant="brand-primary"
                  icon={<FeatherPlus />}
                  onClick={() => setShowForm(true)}
                >
                  Crear Producto
                </Button>
              </div>
            )}
          </div>
        )}

        {view === "settings" && (
          <div className="flex flex-col gap-8 p-8 mobile:p-4">
            <div className="flex flex-col gap-2">
              <span className="text-heading-1 font-heading-1 text-default-font">
                Configuración
              </span>
              <span className="text-body font-body text-subtext-color">
                Administra la configuración de tu tienda
              </span>
            </div>
            
            <div className="rounded-2xl border border-solid border-neutral-border bg-white p-8 shadow-sm mobile:p-4">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#25D366]/10">
                    <FeatherMessageCircle className="h-6 w-6 text-[#25D366]" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-heading-3 font-heading-3 text-default-font">
                      Configuración de WhatsApp
                    </span>
                    <span className="text-body font-body text-subtext-color">
                      Número para recibir consultas de clientes
                    </span>
                  </div>
                </div>
                
                <TextField
                  className="w-full max-w-lg"
                  label="Número de WhatsApp"
                  helpText="Formato: código de país + número (Ej: 5215512345678)"
                  icon={<FeatherMessageCircle />}
                >
                  <TextField.Input
                    placeholder="5215512345678"
                    value={whatsappNumber}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      onWhatsappNumberChange(e.target.value)
                    }
                  />
                </TextField>
                
                <div className="rounded-lg bg-brand-50 border border-brand-200 p-4">
                  <span className="text-caption font-caption text-brand-800">
                    💡 Los clientes verán un botón para contactarte directamente por WhatsApp 
                    con información del producto preseleccionada.
                  </span>
                </div>

                <Button
                  variant="brand-primary"
                  icon={<FeatherMessageCircle />}
                  className="w-fit bg-[#25D366] hover:bg-[#128C7E]"
                  onClick={() => window.open(`https://wa.me/${whatsappNumber}`, "_blank")}
                >
                  Probar WhatsApp
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;

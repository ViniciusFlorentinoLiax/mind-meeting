import { AppSidebar } from "@/components/app/app-sidebar";
import { AppTable } from "@/components/app/app-table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useState } from "react";
import type { Product } from "./types/Product";
import { ProductModal } from "./components/ProductModal";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { DeleteProductModal } from "./components/DeleteProductModal";

export function Home() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Celular",
      price: 250,
      expirationDate: "2025-12-29",
      supplier: "Magazine Luíza",
    },
    {
      id: "2",
      name: "Teclado",
      price: 150,
      expirationDate: "2025-10-10",
      supplier: "Kabum",
    },
    {
      id: "3",
      name: "Mouse",
      price: 350,
      expirationDate: "2026-02-01",
      supplier: "Kabum",
    },
    {
      id: "4",
      name: "Chocolate",
      price: 450,
      expirationDate: "2025-09-22",
      supplier: "Garoto",
    },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selecteProduct, setSelectedProduct] = useState<Product>();
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const user = useContext(AuthContext);

  const handleSaveProduct = (newProduct: Omit<Product, "id">) => {
    setProducts((prev) => [
      ...prev,
      { ...newProduct, id: crypto.randomUUID() },
    ]);
    setOpenModal(false);
  };

  const handleEditProduct = (
    updatedProduct: Omit<Product, "id">,
    id: string
  ) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...updatedProduct, id } : product
      )
    );
    setOpenModal(false);
  };

  const handleDelete = () => {
    setProducts((prev) => prev.filter((p) => p.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Bem vindo {user?.name} </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <Button onClick={() => setOpenModal(!openModal)} variant="outline">
              <PlusCircleIcon /> Adicionar produto
            </Button>
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-2">
            <AppTable
              onEditClick={setSelectedProduct}
              setOpenModalEdit={() => setOpenModalEdit(true)}
              onDeleteClick={setDeleteId}
              products={products}
            />
          </div>
        </div>
      </SidebarInset>
      <ProductModal
        onEdit={handleEditProduct}
        open={openModal || openModalEdit}
        close={() => {
          setOpenModal(false);
          setOpenModalEdit(false);
          setSelectedProduct(undefined);
        }}
        onSave={handleSaveProduct}
        data={selecteProduct}
      />
      <DeleteProductModal
        open={!!deleteId}
        close={() => setDeleteId(null)}
        onDelete={handleDelete}
        productName={products.find((p) => p.id === deleteId)?.name || ""}
      />
    </SidebarProvider>
  );
}

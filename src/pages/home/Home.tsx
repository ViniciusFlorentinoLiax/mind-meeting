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
import { useContext, useEffect, useState } from "react";
import type { Product } from "./types/Product";
import { ProductModal } from "./components/ProductModal";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { DeleteProductModal } from "./components/DeleteProductModal";
import { fetchProducts } from "./services/productServices";

export function Home() {
  useEffect(() => {
    fetchProducts().then(setProducts).catch(console.error);
  }, []);

  const [products, setProducts] = useState<Product[]>([]);

  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [selecteProduct, setSelectedProduct] = useState<Product>();
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const user = useContext(AuthContext);

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
              onClick={setSelectedProduct}
              setOpenModalEdit={() => setOpenModalEdit(true)}
              setOpenModalDelete={() => setOpenModalDelete(true)}
              products={products}
            />
          </div>
        </div>
      </SidebarInset>
      <ProductModal
        open={openModal || openModalEdit}
        close={() => {
          setOpenModal(false);
          setOpenModalEdit(false);
          setSelectedProduct(undefined);
        }}
        data={selecteProduct}
      />
      <DeleteProductModal
        open={openModalDelete}
        id={selecteProduct?.id}
        close={() => {
          setSelectedProduct(undefined);
          setOpenModalDelete(!openModalDelete)}
        }
        productName={selecteProduct?.name || ""}
      />
    </SidebarProvider>
  );
}

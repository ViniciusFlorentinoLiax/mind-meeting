import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Product } from "../types/Product";
import {
  addProduct,
  fetchProducts,
  updateProduct,
} from "../services/productServices";
import { v4 as uuidv4 } from "uuid";
export function ProductModal({
  open,
  close,
  data,
}: {
  open: boolean;
  close: () => void;
  data?: Product;
}) {
  const [product, setProduct] = useState<Product>({
    id: "",
    name: "",
    supplier: "",
    expirationDate: "",
    price: 0,
  });

  useEffect(() => {
    if (data) {
      setProduct(data);
    }
  }, [data]);

  const handleSaveProduct = async (newProduct: Omit<Product, "id">) => {
    if (data?.id) {
      await updateProduct(data.id, newProduct);
    } else {
      const productWithId: Product = {
        ...newProduct,
        id: uuidv4(),
      };
      await addProduct(productWithId);
    }
    fetchProducts();
    close();
  };

  const handleChange = (field: keyof Product, value: string) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setProduct({
            id: "",
            name: "",
            supplier: "",
            expirationDate: "",
            price: 0,
          });
          close();
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {product?.id ? "Editar produto" : "Adicionar produto"}
          </DialogTitle>
          <DialogDescription>
            {`${
              product?.id ? "Edite" : "Adicione"
            } seu produto aqui. Clique em salvar quando terminar.`}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid grid-cols-3 gap-2 items-center">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input
              id="name"
              value={product.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-3 gap-2 items-center">
            <Label htmlFor="supplier" className="text-right">
              Fornecedor
            </Label>
            <Input
              id="supplier"
              value={product.supplier}
              onChange={(e) => handleChange("supplier", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-3 gap-2 items-center">
            <Label htmlFor="expirationDate" className="text-right">
              Data de validade
            </Label>
            <Input
              type="date"
              id="expirationDate"
              value={product.expirationDate}
              onChange={(e) => handleChange("expirationDate", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-3 gap-2 items-center">
            <Label htmlFor="price" className="text-right">
              Preço
            </Label>
            <Input
              id="price"
              value={product.price || ""}
              type="number"
              min={1}
              onChange={(e) => handleChange("price", e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" onClick={close} variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="button" onClick={() => handleSaveProduct(product)}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

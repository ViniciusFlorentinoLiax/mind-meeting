import { useState, useEffect } from "react";
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

export function ProductModal({
  open,
  close,
  onSave,
  onEdit,
  data,
}: {
  open: boolean;
  close: () => void;
  onSave: (product: Omit<Product, "id">) => void;
  onEdit: (product: Omit<Product, "id">, id: string) => void;
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
    } else {
      setProduct({
        id: "",
        name: "",
        supplier: "",
        expirationDate: "",
        price: 0,
      });
    }
  }, [data]);

  const handleSubmit = () => {
    data?.id ? onEdit(product, data.id) : onSave(product);
    setProduct({
      id: "",
      name: "",
      supplier: "",
      expirationDate: "",
      price: 0,
    });
  };

  const handleChange = (field: keyof Product, value: string) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {data?.id ? "Editar produto" : "Adicionar produto"}
          </DialogTitle>
          <DialogDescription>
            Adicione seu produto aqui. Clique em salvar quando terminar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid grid-cols-3 items-center">
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
          <div className="grid grid-cols-3 items-center">
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
          <div className="grid grid-cols-3 items-center">
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
          <div className="grid grid-cols-3 items-center">
            <Label htmlFor="price" className="text-right">
              Preço
            </Label>
            <Input
              id="price"
              value={product.price}
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
          <Button type="button" onClick={handleSubmit}>
            Salvar produto
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

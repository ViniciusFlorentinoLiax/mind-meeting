import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Product } from "@/pages/home/types/Product";
import { Button } from "@/components/ui/button";
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AppTable({ products, setOpenModalEdit, onClick, setOpenModalDelete }: { products: Product[], setOpenModalEdit: () => void, onClick: (product: Product) => void, setOpenModalDelete: () => void }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Nome</TableHead>
          <TableHead className="text-right">Preço</TableHead>
          <TableHead className="text-right">Fornecedor</TableHead>
          <TableHead className="text-right">Data de validade</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium text-left">
              {product.name}
            </TableCell>
            <TableCell className="text-right">{`R$${product.price}`}</TableCell>
            <TableCell className="text-right">{product.supplier}</TableCell>
            <TableCell className="text-right">
              {new Date(product.expirationDate).toLocaleDateString("pt-BR")}
            </TableCell>

            <TableCell className="text-right space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <EllipsisVerticalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-100% flex flex-col gap-1 p-2">
                  <div className="flex flex-row">
                    <Button onClick={()=> {onClick(product), setOpenModalEdit()}} variant="outline" aria-label="Editar">
                      <DropdownMenuLabel>Editar</DropdownMenuLabel>
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  <DropdownMenuSeparator />

                  <div className="flex flex-row">
                    <Button variant="destructive" aria-label="Excluir" onClick={()=> {onClick(product), setOpenModalDelete()}}>
                      <DropdownMenuLabel>Excluir</DropdownMenuLabel>
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

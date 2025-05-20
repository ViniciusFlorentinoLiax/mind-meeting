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

export function DeleteProductModal({
  open,
  close,
  onDelete,
  productName,
}: {
  open: boolean;
  close: () => void;
  onDelete: () => void;
  productName: string;
}) {
  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Excluir produto</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir o produto{" "}
            <strong>{productName}</strong>? Esta ação não poderá ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={() => {
              onDelete();
              close();
            }}
            variant="destructive"
          >
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

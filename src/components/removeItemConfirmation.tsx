import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import React from 'react';

type RemoveConfirmationDialogProps = {
  onConfirm: () => void;
  onClose: () => void;
};

const RemoveConfirmationDialog: React.FC<RemoveConfirmationDialogProps> = ({
  onConfirm,
  onClose,
}) => {
  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Você tem certeza?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Após isso o item será removido do carrinho.
        </DialogDescription>
        <button onClick={onConfirm}>Confirmar</button>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveConfirmationDialog;

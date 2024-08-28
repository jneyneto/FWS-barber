"use client";

import { SmartphoneIcon } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface PhoneItemProps {
  phone: string;
}

const PhoneItem = ({ phone }: PhoneItemProps) => {
  const handleClickCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    toast.success("Telefone copiado com sucesso!");
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2">
        <SmartphoneIcon />
        <span className="text-sm pt-0.5">{phone}</span>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleClickCopyPhone(phone)}
      >
        Copiar
      </Button>
    </div>
  );
};

export default PhoneItem;

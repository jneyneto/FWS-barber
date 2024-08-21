import Image from "next/image";
import { Button } from "./ui/button";

const FastSearch = () => {
  return (
    <div className="gap-3 flex w-full overflow-auto [&:: -webkit-scrollbar]:hidden">
      <Button variant="secondary" className="gap-2">
        <Image alt="" src="/cabelo.svg" width={16} height={16} />
        Cabelo
      </Button>
      <Button variant="secondary" className="gap-2">
        <Image alt="" src="/barba.svg" width={16} height={16} />
        Barba
      </Button>
      <Button variant="secondary" className="gap-2">
        <Image alt="" src="/sobrancelha.svg" width={16} height={16} />
        Sobrancelha
      </Button>
    </div>
  );
};

export default FastSearch;

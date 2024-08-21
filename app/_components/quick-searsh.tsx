import Image from "next/image";
import { Button } from "./ui/button";

const FastSearch = () => {
  interface QuickSearshOptions {
    imageUrl: String;
    title: String;
  }

  const quickSearchOptions: QuickSearshOptions[] = [
    {
      imageUrl: "/cabelo.svg",
      title: "Cabelo",
    },
    {
      imageUrl: "/barba.svg",
      title: "Barba",
    },
    {
      imageUrl: "/sobrancelha.svg",
      title: "Sobrancelha",
    },
    {
      imageUrl: "/massagem.svg",
      title: "Massagem",
    },
    {
      imageUrl: "/acabamento.svg",
      title: "Acabamento",
    },
    {
      imageUrl: "/hidratação.svg",
      title: "Hidratação",
    },
  ];

  return (
    <div className="gap-3 flex w-full overflow-auto [&:: -webkit-scrollbar]:hidden">
      {quickSearchOptions.map((option) => (
        <Button key={option.name} variant="secondary" className="gap-2">
          <Image alt="" src={option.imageUrl} width={16} height={16} />
          {option.title}
        </Button>
      ))}
    </div>
  );
};

export default FastSearch;

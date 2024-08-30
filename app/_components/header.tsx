import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import MenuSideBar from "./menu-sidebar";

const Header = () => {
  return (
    <>
      <Card>
        <CardContent className="p-5 flex items-center justify-between">
          <Image alt="FSW Barber" src="/Logo.svg" height={18} width={120} />
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <MenuSideBar />
          </Sheet>
        </CardContent>
      </Card>
    </>
  );
};

export default Header;

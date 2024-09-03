import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import MenuSideBar from "./menu-sidebar";
import Link from "next/link";

const Header = () => {
  return (
    <>
      <Card>
        <CardContent className="p-5 flex items-center justify-between">
          <Link href={"/"} className="cursor-default">
            <Image alt="FSW Barber" src="/Logo.svg" height={18} width={120} />
          </Link>
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

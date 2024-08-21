import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

const BookingItem = () => {
  return (
    <Card className="mt-2">
      <CardContent className="flex justify-between p-0">
        <div className="flex flex-col gap-2 py-5 pl-5">
          <Badge className="w-fit">Confirmado</Badge>
          <h3 className="font-semibold">Corte de cabelo</h3>
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="https://utfs.io/f/45331760-899c-4b4b-910e-e00babb6ed81-16q.png" />
            </Avatar>
            <span className="text-sm">Barbearia FSW</span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center border-l p-5">
          <span className="text-sm">agosto</span>
          <span className="text-2xl">01</span>
          <span className="text-sm">09:00</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingItem;

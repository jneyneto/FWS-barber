import { Button } from "./ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import Image from "next/image";
import { signIn } from "next-auth/react";

const SignInDialog = () => {
  const handleLoginWithGoogleClick = async () => {
    await signIn("google");
  };

  return (
    <DialogContent className="w-[80%] min-h-[150px] items-center rounded-lg">
      <DialogHeader className="gap-4">
        <DialogTitle>Faça login na plataforma</DialogTitle>
        <DialogDescription>
          Conecte-se usando sua conta Google.
        </DialogDescription>
      </DialogHeader>
      <Button
        className="gap-2 items-center font-semibold"
        variant="outline"
        onClick={handleLoginWithGoogleClick}
      >
        <Image
          alt="Login com Google"
          src="/google.svg"
          width={18}
          height={18}
        />
        Google
      </Button>
    </DialogContent>
  );
};

export default SignInDialog;

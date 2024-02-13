"use client";

import { Button } from "@/components/ui/button";
import { services } from "../lib/data";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Service } from "@/lib/interfaces";
import Image from "next/image";

interface DialogServiceProps {
  service: Service;
}

export default function DialogService({ service }: DialogServiceProps) {
  const detailsWithBoldNumbers = service.details.replace(
    /(\d+)/g,
    "<strong>$1</strong>"
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Saber más</Button>
      </DialogTrigger>
      <DialogContent className=" max-h-screen  moverflow-y-auto">
        <DialogHeader>
          <DialogTitle>{service.title}</DialogTitle>
          <DialogDescription className=" whitespace-pre-line ">
            <p dangerouslySetInnerHTML={{ __html: detailsWithBoldNumbers }} />
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className=" flex !justify-center items-center">
          <div className=" w-[200px] md:w-[300px]  ">
            <Image src="icons/park.svg" width={300} height={300} alt="park" />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

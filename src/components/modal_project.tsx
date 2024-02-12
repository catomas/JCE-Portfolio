"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Project } from "@/lib/interfaces";
import Image from "next/image";
import Gallery from "./gallery";
import { useState, useEffect } from "react";

interface ModalProjectProps {
  children: React.ReactNode;
  project: Project;
}

export default function ModalProject({ children, project }: ModalProjectProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="font-workSans overflow-y-auto max-h-screen ">
        <DialogHeader>
          <DialogTitle className="text-4xl">{project.title}</DialogTitle>
          <DialogDescription>{project.description}</DialogDescription>
        </DialogHeader>
        <div className=" w-full ">
          <Gallery images={project.images} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client";
import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useSearchParams, useRouter } from "next/navigation";
import EventFrom from "./event-from";

export const CreateEventDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParam = useSearchParams();
  
  useEffect(() => {
    const create = searchParam.get("create");
    if (create === "true") {
      setIsOpen(true);
    }
  }, [searchParam]);

  const handleClose = () => {
    setIsOpen(false);
    if (searchParam.get("create")) {
      router.replace(window?.location?.pathname);
    }
  };

  return (
    <Drawer open={isOpen} onClose={handleClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create New Event</DrawerTitle>
          <DrawerDescription>Set your daily activity goal.</DrawerDescription>
        </DrawerHeader>
        <EventFrom
          onSubmitForm={() => {
            handleClose();
          }}
        />
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

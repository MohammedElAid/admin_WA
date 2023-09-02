'use client'
import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { UserButton } from "@clerk/nextjs";
import { useEffect } from "react";

export default function SetupPage() {

  const OnOpen = useStoreModal((state) => state.onOpen)
  const IsOpen = useStoreModal((state) => state.isOpen)


  useEffect(() => {
    if (!IsOpen) {
      OnOpen();
    }
  }, [IsOpen, OnOpen])
  return (
    <div className="p-4">
      Root Page
    </div>

  )
} 

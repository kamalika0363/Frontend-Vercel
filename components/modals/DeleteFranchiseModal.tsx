"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { Button } from "@/components/ui/button";
interface Franchise {
  key: string;
  franchiseeLocation: string;
  managerName: string;
  dateEstablished: string;
  email: string;
}

interface DeleteFranchiseModalProps {
  franchise: Franchise | null;
  onClose: () => void;
  onDelete: (franchise: Franchise) => void;
}

export default function DeleteFranchiseModal({
  franchise,
  onClose,
  onDelete,
}: DeleteFranchiseModalProps) {
  if (!franchise) return null;

  const handleDelete = () => {
    onDelete(franchise);
    onClose();
  };

  return (
    <Modal isOpen={!!franchise} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Confirm Deletion
            </ModalHeader>
            <ModalBody>
              <p>
                Are you sure you want to delete the franchise at{" "}
                {franchise.franchiseeLocation}? This action cannot be undone.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button variant="cancel" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="delete" onClick={handleDelete}>
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

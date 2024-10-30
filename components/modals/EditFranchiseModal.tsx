'use client'

import { useState, useEffect } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react"

interface Franchise {
    key: string;
    franchiseeLocation: string;
    managerName: string;
    dateEstablished: string;
    email: string;
}

interface EditFranchiseModalProps {
    franchise: Franchise | null;
    onClose: () => void;
    onSave: (editedFranchise: Franchise) => void;
}

export default function EditFranchiseModal({ franchise, onClose, onSave }: EditFranchiseModalProps) {
    const [editedFranchise, setEditedFranchise] = useState<Franchise | null>(null)

    useEffect(() => {
        if (franchise) {
            setEditedFranchise({ ...franchise })
        }
    }, [franchise])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setEditedFranchise(prev => prev ? { ...prev, [name]: value } : null)
    }

    const handleSave = () => {
        if (editedFranchise) {
            onSave(editedFranchise)
        }
        onClose()
    }

    if (!franchise || !editedFranchise) return null

    return (
        <Modal isOpen={!!franchise} onClose={onClose}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Edit Franchise</ModalHeader>
                        <ModalBody>
                            <Input
                                label="Franchisee Location"
                                name="franchiseeLocation"
                                value={editedFranchise.franchiseeLocation}
                                onChange={handleInputChange}
                            />
                            <Input
                                label="Manager Name"
                                name="managerName"
                                value={editedFranchise.managerName}
                                onChange={handleInputChange}
                            />
                            <Input
                                label="Date Established"
                                name="dateEstablished"
                                type="date"
                                value={editedFranchise.dateEstablished}
                                onChange={handleInputChange}
                            />
                            <Input
                                label="Email"
                                name="email"
                                type="email"
                                value={editedFranchise.email}
                                onChange={handleInputChange}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Cancel
                            </Button>
                            <Button color="primary" onPress={handleSave}>
                                Save Changes
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
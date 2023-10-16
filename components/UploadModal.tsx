"use client"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import upload from "./uploadFile";
import { title } from "./primitives";

export default function App() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();


    return (
        <>
            <Button onPress={onOpen} color="primary">Upload File</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose: () => void) => (
                        <>
                            <form action={upload}>
                            <ModalHeader className="flex flex-col gap-1">Upload File</ModalHeader>
                            <Input isClearable className="p-2" variant="bordered" type="file" name="file" />                                
                            <Input isClearable className="p-2" variant="bordered" name="name" placeholder="Name" />
                            <Input isClearable className="p-2" variant="bordered" name="description" placeholder="Description" />
                            <Input isClearable className="p-2" variant="bordered" name="tags" placeholder="Tags (comma separated)" />
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" type="submit" onPress={onClose}>
                                    Upload
                                </Button>
                            </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

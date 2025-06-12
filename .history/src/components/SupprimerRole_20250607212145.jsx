import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
} from "@material-tailwind/react";
import { useState } from "react";
import apiClient from "@/api/client";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SupprimerRole({ open, handleClose, gestionnaire, onGestionnaireDeleted }) {
  const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
         let result=   await apiClient.post("/admin/deleteRole", { id: gestionnaire?._id });
         if(result.status===200){
  toast.success(response?.data?.message, {
                position: "top-right",
                autoClose: 3000,
            });
            onGestionnaireDeleted();
            handleClose();
         }
          
        } catch (error) {
            console.error("Error deleting gestionnaire:", error);
            toast.error("Erreur lors de la suppression du gestionnaire.", {
                position: "top-right",
                autoClose: 3000,
            });
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <ToastContainer position="top-center" />
            <Dialog open={open} handler={handleClose}>
                <DialogHeader>Confirmer la suppression</DialogHeader>
                <DialogBody>
                    Êtes-vous sûr de vouloir supprimer le gestionnaire {gestionnaire?.name} ???
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="blue-gray"
                        onClick={handleClose}
                        className="mr-1"
                        disabled={isDeleting}
                    >
                        Annuler
                    </Button>
                    <Button
                        variant="gradient"
                        color="red"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        loading={isDeleting}
                    >
                        Supprimer
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

export default SupprimerRole
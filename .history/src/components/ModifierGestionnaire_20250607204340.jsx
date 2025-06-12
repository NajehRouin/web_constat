
import apiClient from "@/api/client";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Button,
    Select,
    Option,
} from "@material-tailwind/react";
import { useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ModifierGestionnaire({ open, handleClose, gestionnaire, onGestionnaireUpdated }) {
  
    const [formData, setFormData] = useState({
        id: gestionnaire?._id ,
        name: gestionnaire?.name ,
        email: gestionnaire?.email ,
        password: "",
      
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

   

    const handleSubmit = async () => {
        try {
            const updateData = {
                id: formData.id,
                name: formData.name,
                email: formData.email,
             
            };
            if (formData.password) {
                updateData.password = formData.password;
            }

            const response = await apiClient.post("/admin/modifierByRol", updateData);

            toast.success(`${formData.role} modifié avec succès.`, {
                position: "top-right",
                autoClose: 3000,
            });

            onGestionnaireUpdated();
            handleClose();
        } catch (error) {
            console.error("Error updating gestionnaire:", error);
            toast.error("Erreur lors de la modification du gestionnaire.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    return (
        <>
            <ToastContainer position="top-center" />
            <Dialog open={open} handler={handleClose}>
                <DialogHeader>Modifier Gestionnaire</DialogHeader>
                <DialogBody>
                    <div className="flex flex-col gap-4">
                        <Input
                            label="Nom"
                            name="name"
                            defaultValue={formData?.name}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            value={formData?.email}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            label="Mot de passe (laisser vide pour ne pas modifier)"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                      
                 
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="blue-gray"
                        onClick={handleClose}
                        className="mr-1"
                    >
                        Annuler
                    </Button>
                    <Button
                        variant="gradient"
                        color="blue"
                        onClick={handleSubmit}
                    >
                        Enregistrer
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

export default ModifierGestionnaire;

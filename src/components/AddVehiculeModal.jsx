import React, { useState, useEffect } from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Input, Select, Option, Typography } from "@material-tailwind/react";
import client from "../api/client";
import { toast } from 'react-toastify';

const assureurs = [
    "AMI", "ASTREE", "Attijari", "GAT", "G AT VIE", "MAE",
    "TUNIS RE", "STAR", "COMAR", "MAGHERBIA", "LLOYD",
    "CARTE", "GE", "CTAMA", "CORIS", "BUAT", "AVUS", "FGA", "NA"
];

export default function AddVehiculeModal({ open, onClose, userId, onVehicleAdded, isEditMode = false, vehicleData = null }) {
    const [form, setForm] = useState({
        brand: "",
        numeroSerie: "",
        numeroMatricule: "",
        type: "TU",
        numeroContrat: "",
        assure: "",
        agence: "",
        insuranceStartDate: new Date(),
        insuranceEndDate: new Date(),
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isEditMode && vehicleData) {
            setForm({
                brand: vehicleData.brand || "",
                numeroSerie: vehicleData.numeroSerie || "",
                numeroMatricule: vehicleData.numeroMatricule || "",
                type: vehicleData.type || "TU",
                numeroContrat: vehicleData.numeroContrat || "",
                assure: vehicleData.assure || "",
                agence: vehicleData.agence || "",
                insuranceStartDate: vehicleData.insuranceStartDate ? new Date(vehicleData.insuranceStartDate) : new Date(),
                insuranceEndDate: vehicleData.insuranceEndDate ? new Date(vehicleData.insuranceEndDate) : new Date(),
            });
        } else {
            setForm({
                brand: "",
                numeroSerie: "",
                numeroMatricule: "",
                type: "TU",
                numeroContrat: "",
                assure: "",
                agence: "",
                insuranceStartDate: new Date(),
                insuranceEndDate: new Date(),
            });
        }
    }, [isEditMode, vehicleData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setError(null);
    };

    const handleDateChange = (name, value) => {
        setForm((prev) => ({ ...prev, [name]: new Date(value) }));
        setError(null);
    };

    const handleSubmit = async () => {
        try {
            let response;
            if (isEditMode) {
                response = await client.post(`/users/updateVehicule`, {
                    vehiculeId: vehicleData._id,
                    userId,
                    ...form
                });
            } else {
                 response = await client.post(`/users/addvehicule`, { vehicules:form, userId:userId });
            }
            toast.success(isEditMode ? "Véhicule modifié avec succès !" : "Véhicule ajouté avec succès !", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            onVehicleAdded();
            setTimeout(() => {
                onClose();
            }, 3000);
        } catch (err) {
            console.error(`Error ${isEditMode ? 'updating' : 'adding'} vehicle:`, err);
            setError(`Erreur lors de ${isEditMode ? 'la modification' : "l'ajout"} du véhicule. Veuillez réessayer.`);
            toast.error(`Erreur lors de ${isEditMode ? 'la modification' : "l'ajout"} du véhicule.`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <Dialog open={open} handler={onClose} size="md">
            <DialogHeader>{isEditMode ? "Modifier le véhicule" : "Ajouter un nouveau véhicule"}</DialogHeader>
            <DialogBody divider className="space-y-4">
                {error && (
                    <Typography color="red" className="text-sm">
                        {error}
                    </Typography>
                )}
                <Input
                    label="Marque"
                    name="brand"
                    value={form.brand}
                    onChange={handleChange}
                    className="w-full"
                />
                <Input
                    label="Numéro de série"
                    name="numeroSerie"
                    value={form.numeroSerie}
                    onChange={handleChange}
                    className="w-full"
                />
                <Input
                    label="Numéro de matricule"
                    name="numeroMatricule"
                    value={form.numeroMatricule}
                    onChange={handleChange}
                    className="w-full"
                />
                <Input
                    label="Type"
                    name="type"
                    value={form.type}
                    disabled
                    className="w-full"
                />
                <Input
                    label="Numéro de contrat"
                    name="numeroContrat"
                    value={form.numeroContrat}
                    onChange={handleChange}
                    className="w-full"
                />
                <Select
                    label="Assureur"
                    name="assure"
                    value={form.assure}
                    onChange={(value) => setForm((prev) => ({ ...prev, assure: value }))}
                >
                    {assureurs.map((assureur) => (
                        <Option key={assureur} value={assureur}>
                            {assureur}
                        </Option>
                    ))}
                </Select>
                <Input
                    label="Agence"
                    name="agence"
                    value={form.agence}
                    onChange={handleChange}
                    className="w-full"
                />
                <Input
                    label="Date de début d'assurance"
                    type="date"
                    name="insuranceStartDate"
                    value={form.insuranceStartDate.toISOString().split("T")[0]}
                    onChange={(e) => handleDateChange("insuranceStartDate", e.target.value)}
                    className="w-full"
                />
                <Input
                    label="Date de fin d'assurance"
                    type="date"
                    name="insuranceEndDate"
                    value={form.insuranceEndDate.toISOString().split("T")[0]}
                    onChange={(e) => handleDateChange("insuranceEndDate", e.target.value)}
                    className="w-full"
                />
            </DialogBody>
            <DialogFooter>
                <Button variant="text" color="red" onClick={onClose} className="mr-2">
                    Annuler
                </Button>
                <Button variant="gradient" color="blue" onClick={handleSubmit}>
                    {isEditMode ? "Modifier" : "Ajouter"}
                </Button>
            </DialogFooter>
        </Dialog>
    );
}
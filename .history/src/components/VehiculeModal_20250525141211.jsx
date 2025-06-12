import React, { useEffect, useState } from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Typography } from "@material-tailwind/react";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import AddVehiculeModal from "./AddVehiculeModal";
import client from "../api/client";
import { toast } from 'react-toastify';

export default function VehiculeModal({ open, onClose, userId, onVehicleAdded }) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [vehicules, setVehicules] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getAllVehicule = async () => {
        if (!userId) return; // Skip fetch if userId is not available
        setIsLoading(true);
        setError(null);
        try {
            const res = await client.post(`/users/getAllVehicule`, { userId });
            console.log("Fetched vehicles:", res.data.result);
            setVehicules(res.data.result || []);
        } catch (error) {
            console.error("Error fetching vehicles:", error);
            setError("Erreur lors du chargement des véhicules.");
            toast.error("Erreur lors du chargement des véhicules.", {
                position: "top-right",
                autoClose: 3000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (open) {
            getAllVehicule();
        }
    }, [open, userId]);

    const handleOpenAddModal = () => setIsAddModalOpen(true);
    const handleCloseAddModal = () => setIsAddModalOpen(false);

    const handleOpenEditModal = (vehicle) => {
        setSelectedVehicle(vehicle);
        setIsEditModalOpen(true);
    };
    const handleCloseEditModal = () => {
        setSelectedVehicle(null);
        setIsEditModalOpen(false);
    };

    

    const handleDeleteVehicle = async (vehicleId) => {
        if (window.confirm("Voulez-vous vraiment supprimer ce véhicule ?")) {
            try {
                const res = await client.post(`/users/deleteVehicule`, { vehiculeId: vehicleId, userId });
                toast.success("Véhicule supprimé avec succès !", {
                    position: "top-right",
                    autoClose: 3000,
                });
                console.log("Delete response:", res);
                getAllVehicule(); 
                onVehicleAdded(); 
            } catch (err) {
                console.error("Error deleting vehicle:", err);
                toast.error("Erreur lors de la suppression du véhicule.", {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        }
    };

    return (
        <>
            <Dialog open={open} handler={onClose} size="lg">
                <div className="flex items-center justify-between px-4 py-2">
                    <DialogHeader>Liste des Véhicules</DialogHeader>
                    <Button 
                        variant="gradient" 
                        color="blue" 
                        onClick={handleOpenAddModal}
                        className="ml-4"
                    >
                        Ajouter véhicule
                    </Button>
                </div>
                <DialogBody divider className="max-h-[500px] overflow-y-auto">
                    {isLoading ? (
                        <Typography>Chargement des véhicules...</Typography>
                    ) : error ? (
                        <Typography color="red">{error}</Typography>
                    ) : vehicules && vehicules.length > 0 ? (
                        vehicules.map((v, idx) => (
                            <div
                                key={v._id || idx}
                                className="border p-4 rounded-lg mb-4 bg-gray-50 shadow-sm flex justify-between items-start"
                            >
                                <div>
                                    <Typography variant="h6">{v.brand || "Marque inconnue"}</Typography>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mt-2">
                                        <p><strong>Agence:</strong> {v.agence}</p>
                                        <p><strong>Assuré:</strong> {v.assure}</p>
                                        <p><strong>Type:</strong> {v.type}</p>
                                        <p><strong>Matricule:</strong> {v.numeroMatricule}</p>
                                        <p><strong>Série:</strong> {v.numeroSerie}</p>
                                        <p><strong>Contrat:</strong> {v.numeroContrat}</p>
                                        <p><strong>Début assurance:</strong> {new Date(v.insuranceStartDate).toLocaleDateString("fr-FR")}</p>
                                        <p><strong>Fin assurance:</strong> {new Date(v.insuranceEndDate).toLocaleDateString("fr-FR")}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleOpenEditModal(v)}
                                        className="text-blue-500 hover:text-blue-700"
                                        title="Modifier"
                                    >
                                        <PencilIcon className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteVehicle(v._id)}
                                        className="text-red-500 hover:text-red-700"
                                        title="Supprimer"
                                    >
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <Typography>Aucun véhicule associé.</Typography>
                    )}
                </DialogBody>
                <DialogFooter>
                    <Button variant="gradient" color="red" onClick={onClose}>
                        Fermer
                    </Button>
                </DialogFooter>
            </Dialog>
            <AddVehiculeModal 
                open={isAddModalOpen} 
                onClose={handleCloseAddModal} 
                userId={userId} 
                onVehicleAdded={() => {
                    getAllVehicule();
                    onVehicleAdded();
                }}
                isEditMode={false}
            />
            <AddVehiculeModal 
                open={isEditModalOpen} 
                onClose={handleCloseEditModal} 
                userId={userId} 
                onVehicleAdded={() => {
                    getAllVehicule();
                    onVehicleAdded();
                }}
                isEditMode={true}
                vehicleData={selectedVehicle}
            />
        </>
    );
}
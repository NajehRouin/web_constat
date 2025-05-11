// components/VehiculeModal.jsx
import React from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Typography } from "@material-tailwind/react";

export default function VehiculeModal({ open, onClose, vehicules }) {
    return (
        <Dialog open={open} handler={onClose} size="lg">
            <DialogHeader>Liste des Véhicules</DialogHeader>
            <DialogBody divider className="max-h-[500px] overflow-y-auto">
                {vehicules && vehicules.length > 0 ? (
                    vehicules.map((v, idx) => (
                        <div
                            key={v._id || idx}
                            className="border p-4 rounded-lg mb-4 bg-gray-50 shadow-sm"
                        >
                            <Typography variant="h6">{v.brand || "Marque inconnue"}</Typography>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mt-2">
                                <p><strong>Agence:</strong> {v.agence}</p>
                                <p><strong>Assuré:</strong> {v.assure }</p>
                                <p><strong>Type:</strong> {v.type}</p>
                                <p><strong>Matricule:</strong> {v.numeroMatricule}</p>
                                <p><strong>Série:</strong> {v.numeroSerie}</p>
                                <p><strong>Contrat:</strong> {v.numeroContrat}</p>
                                <p><strong>Début assurance:</strong> {new Date(v.insuranceStartDate).toLocaleDateString("fr-FR")}</p>
<p><strong>Fin assurance:</strong> {new Date(v.insuranceEndDate).toLocaleDateString("fr-FR")}</p>
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
    );
}

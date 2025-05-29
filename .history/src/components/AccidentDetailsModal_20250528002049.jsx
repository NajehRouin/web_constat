import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import apiClient from "@/api/client";

export function AccidentDetailsModal({ open, onClose, accidentId }) {
    const [accidentDetails, setAccidentDetails] = useState([]);

    useEffect(() => {
        if (open && accidentId) {
            const fetchAccidentDetails = async () => {
                try {
                    const res = await apiClient.post("/accident/getConstatByAccident", { accidentId });
                    console.log("setAccidentDetails", res?.data?.result);
                    setAccidentDetails(res?.data?.result || []);
                } catch (error) {
                    console.error("Error fetching accident details:", error);
                    setAccidentDetails([]);
                }
            };
            fetchAccidentDetails();
        }
    }, [open, accidentId]);

    return (
        <Dialog open={open} handler={onClose} size="lg">
            <DialogHeader>Détails de l'Accident: {accidentId}</DialogHeader>
            <DialogBody divider className="overflow-y-auto max-h-[60vh]">
                {accidentDetails.length > 0 ? (
                    accidentDetails.map((details, index) => (
                        <div key={index} className="mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Typography variant="h6" color="blue-gray">Assuré</Typography>
                                    <p><strong>Nom:</strong> {details.userId?.name || "N/A"}</p>
                                    <p><strong>Prénom:</strong> {details.userId?.prenom || "N/A"}</p>
                                    <p><strong>CIN:</strong> {details.userId?.cin || "N/A"}</p>
                                    <p><strong>Téléphone:</strong> {details.userId?.numeroTelephone || "N/A"}</p>
                                    <p><strong>Numéro de Permis:</strong> {details.userId?.numeroPermis || "N/A"}</p>
                                    <p><strong>Email:</strong> {details.userId?.email || "N/A"}</p>
                                </div>
                                <div>
                                    <Typography variant="h6" color="blue-gray">Informations Générales</Typography>
                                    <p><strong>Date:</strong> {details.date ? new Date(details.date).toLocaleDateString() : "N/A"}</p>
                                    <p><strong>Heure:</strong> {details.time || "N/A"}</p>
                                    <p><strong>Lieu:</strong> {details.location || "N/A"}</p>
                                    <p><strong>Blessures:</strong> {details.injuries ? "Oui" : "Non"}</p>
                                    <p><strong>Autres Dommages:</strong> {details.otherDamages ? "Oui" : "Non"}</p>
                                </div>
                                <div>
                                    <Typography variant="h6" color="blue-gray">Informations sur l'Assurance</Typography>
                                    <p><strong>Assureur:</strong> {details.insuredVehicle || "N/A"}</p>
                                    <p><strong>Numéro de Contrat:</strong> {details.contractNumber || "N/A"}</p>
                                    <p><strong>Agence:</strong> {details.agency || "N/A"}</p>
                                    <p><strong>Valide du:</strong> {details.validFrom ? new Date(details.validFrom).toLocaleDateString() : "N/A"}</p>
                                    <p><strong>Valide jusqu'à:</strong> {details.validTo ? new Date(details.validTo).toLocaleDateString() : "N/A"}</p>
                                </div>
                                <div>
                                    <Typography variant="h6" color="blue-gray">Conducteur</Typography>
                                    <p><strong>Nom:</strong> {details.driverLastName || "N/A"}</p>
                                    <p><strong>Prénom:</strong> {details.driverFirstName || "N/A"}</p>
                                    <p><strong>Adresse:</strong> {details.driverAddress || "N/A"}</p>
                                    <p><strong>Numéro de Permis:</strong> {details.driverLicenseNumber || "N/A"}</p>
                                    <p><strong>Date de Délivrance:</strong> {details.licenseIssueDate ? new Date(details.licenseIssueDate).toLocaleDateString() : "N/A"}</p>
                                </div>
                                {/* <div>
                                    <Typography variant="h6" color="blue-gray">Assuré</Typography>
                                    <p><strong>Nom:</strong> {details.insuredLastName || "N/A"}</p>
                                    <p><strong>Prénom:</strong> {details.insuredFirstName || "N/A"}</p>
                                    <p><strong>Adresse:</strong> {details.insuredAddress || "N/A"}</p>
                                    <p><strong>Téléphone:</strong> {details.insuredPhone || "N/A"}</p>
                                </div> */}
                                <div>
                                    <Typography variant="h6" color="blue-gray">Véhicule</Typography>
                                    <p><strong>Marque:</strong> {details.vehicleBrand || "N/A"}</p>
                                    <p><strong>Immatriculation:</strong> {details.vehicleRegistration || "N/A"}</p>
                                    
                                    <p><strong>Direction:</strong> {details.direction || "N/A"}</p>
                                    <p><strong>Provenant de:</strong> {details.comingFrom || "N/A"}</p>
                                    <p><strong>Se dirigeant vers:</strong> {details.goingTo || "N/A"}</p>
                                </div>
                                <div>
                                    <Typography variant="h6" color="blue-gray">Détails de l'Accident</Typography>
                                    <p><strong>Face Endommagée:</strong> {details.face || "N/A"}</p>
                                    <p><strong>Description des Dommages:</strong> {details.damageDescription || "N/A"}</p>
                                    <p><strong>Circonstances:</strong></p>
                                    <ul className="list-disc pl-5">
                                        {details.circumstances && Object.entries(details.circumstances)
                                            .filter(([_, value]) => value)
                                            .map(([key, _]) => (
                                                <li key={key}>{key}</li>
                                            ))}
                                        {(!details.circumstances || Object.values(details.circumstances).every(val => !val)) && <li>Aucune circonstance spécifiée</li>}
                                    </ul>
                                    <p><strong>Nombre de Cases Cochées:</strong> {details.numberOfCheckedBoxes || "N/A"}</p>
                                </div>
                                <div className="col-span-1 md:col-span-2">
                                    <Typography variant="h6" color="blue-gray">Images</Typography>
                                    <div className="flex flex-wrap gap-4 mt-2 justify-center">
                                        {details.frontImage && (
                                            <div className="flex flex-col items-center">
                                                <img
                                                    src={`${apiClient?.getBaseURL()}/${details.frontImage}`}
                                                    alt="Avant"
                                                    className="w-32 h-32 object-cover rounded-md"
                                                />
                                                <Typography variant="small" color="blue-gray" className="mt-1">Avant</Typography>
                                            </div>
                                        )}
                                        {details.backImage && (
                                            <div className="flex flex-col items-center">
                                                <img
                                                    src={`${apiClient?.getBaseURL()}/${details.backImage}`}
                                                    alt="Arrière"
                                                    className="w-32 h-32 object-cover rounded-md"
                                                />
                                                <Typography variant="small" color="blue-gray" className="mt-1">Arrière</Typography>
                                            </div>
                                        )}
                                        {details.leftImage && (
                                            <div className="flex flex-col items-center">
                                                <img
                                                    src={`${apiClient?.getBaseURL()}/${details.leftImage}`}
                                                    alt="Gauche"
                                                    className="w-32 h-32 object-cover rounded-md"
                                                />
                                                <Typography variant="small" color="blue-gray" className="mt-1">Gauche</Typography>
                                            </div>
                                        )}
                                        {details.rightImage && (
                                            <div className="flex flex-col items-center">
                                                <img
                                                    src={`${apiClient?.getBaseURL()}/${details.rightImage}`}
                                                    alt="Droite"
                                                    className="w-32 h-32 object-cover rounded-md"
                                                />
                                                <Typography variant="small" color="blue-gray" className="mt-1">Droite</Typography>
                                            </div>
                                        )}
                                        {!details.frontImage && !details.backImage && !details.leftImage && !details.rightImage && (
                                            <Typography color="blue-gray">Aucune image disponible</Typography>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {index < accidentDetails.length - 1 && <hr className="my-6 border-gray-300" />}
                        </div>
                    ))
                ) : (
                    <Typography color="blue-gray">Chargement des détails ou aucune donnée disponible...</Typography>
                )}
            </DialogBody>
            <DialogFooter>
                <Button variant="gradient" color="gray" onClick={onClose}>
                    Fermer
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

export default AccidentDetailsModal;
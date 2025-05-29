import { useEffect, useState, useRef } from "react";
import client from "../api/client"; // Assurez-vous que le chemin est correct
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import html2pdf from "html2pdf.js";

const ConstatModal = ({ open, onClose, userId }) => {
    const [data, setData] = useState([]);
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
    const pdfRef = useRef();

    useEffect(() => {
        if (userId) {
            client
                .post("/addConstat/getConstatUser", { userId: userId?._id })
                .then((res) => {
                    setData(res.data.result || []);
                })
                .catch((err) => {
                    console.error("Erreur lors de la récupération des constats :", err);
                });
        }
    }, [userId]);

    const handleDownloadPdf = () => {
        setIsGeneratingPdf(true);
        const element = pdfRef.current;
        if (!element) {
            console.error("Erreur : la référence pdfRef est introuvable.");
            setIsGeneratingPdf(false);
            return;
        }

        // Cloner l'élément pour éviter de modifier l'affichage réel
        const clonedElement = element.cloneNode(true);
        // Supprimer les restrictions de défilement et de hauteur
        clonedElement.style.overflow = "visible";
        clonedElement.style.maxHeight = "none";
        clonedElement.style.height = "auto";

        // Sélectionner toutes les images dans le clone
        const images = clonedElement.querySelectorAll("img");
        const imageLoadPromises = Array.from(images).map((img) => {
            return new Promise((resolve) => {
                if (img.complete) {
                    resolve();
                } else {
                    img.onload = () => resolve();
                    img.onerror = () => {
                        console.warn(`Erreur de chargement de l'image : ${img.src}`);
                        resolve();
                    };
                }
            });
        });

        // Attendre que toutes les images soient chargées
        Promise.all(imageLoadPromises)
            .then(() => {
                html2pdf()
                    .set({
                        margin: [10, 10, 10, 10],
                        filename: `constats_${userId?.name}_${userId?.prenom}_${new Date().toISOString().split('T')[0]}.pdf`,
                        image: { type: "jpeg", quality: 0.98 },
                        html2canvas: { scale: 2, useCORS: true, logging: false },
                        jsPDF: { unit: "mm", format: "a4", orientation: "portrait", compress: true },
                    })
                    .from(clonedElement)
                    .save()
                    .catch((err) => {
                        console.error("Erreur lors de la génération du PDF :", err);
                    })
                    .finally(() => {
                        setIsGeneratingPdf(false);
                    });
            })
            .catch((err) => {
                console.error("Erreur lors du chargement des images :", err);
                setIsGeneratingPdf(false);
            });
    };

    return (
        <Dialog open={open} handler={onClose} size="lg">
            <DialogHeader>
                Constats de l'utilisateur {userId?.name} {userId?.prenom}
            </DialogHeader>
            <DialogBody>
                <div ref={pdfRef} className="p-4 text-sm space-y-4 max-h-[70vh] overflow-y-scroll">
                    {data.map((item, index) => (
                        <div key={index} className="border-b pb-4">
                            <h2 className="font-bold mb-2">Constat #{index + 1}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                                <p><strong>Date :</strong> {new Date(item.date).toLocaleDateString()}</p>
                                <p><strong>Heure :</strong> {item.time}</p>
                                <p><strong>Lieu :</strong> {item.location}</p>
                                <p><strong>Blessures :</strong> {item.injuries ? "Oui" : "Non"}</p>
                                <p><strong>Autres dommages :</strong> {item.otherDamages ? "Oui" : "Non"}</p>
                                <p><strong>Véhicule assuré :</strong> {item.insuredVehicle}</p>
                                <p><strong>Numéro contrat :</strong> {item.contractNumber}</p>
                                <p><strong>Agence :</strong> {item.agency}</p>
                                <p><strong>Validité :</strong> {new Date(item.validFrom).toLocaleDateString()} - {new Date(item.validTo).toLocaleDateString()}</p>
                                <p><strong>Conducteur :</strong> {item.driverFirstName} {item.driverLastName}</p>
                                <p><strong>Email :</strong> {item.driverAddress}</p>
                                <p><strong>Numéro de permis :</strong> {item.driverLicenseNumber}</p>
                                <p><strong>Date de délivrance du permis :</strong> {new Date(item.licenseIssueDate).toLocaleDateString()}</p>
                                <p><strong>Type de véhicule :</strong> {item.vehicleType}</p>
                                <p><strong>Marque du véhicule :</strong> {item.vehicleBrand}</p>
                                <p><strong>Immatriculation :</strong> {item.vehicleRegistration}</p>
                                <p><strong>Face endommagée :</strong> {item.face}</p>
                                <p><strong>Assuré :</strong> {item.insuredFirstName} {item.insuredLastName}</p>
                                <p><strong>Adresse de l'assuré :</strong> {item.insuredAddress}</p>
                                <p><strong>Téléphone de l'assuré :</strong> {item.insuredPhone}</p>
                                <p><strong>Direction :</strong> {item.direction}</p>
                                <p><strong>Provenance :</strong> {item.comingFrom}</p>
                                <p><strong>Destination :</strong> {item.goingTo}</p>
                                <p><strong>Description des dommages :</strong> {item.damageDescription}</p>
                                
                               
                                <ul className="list-disc pl-5">
                                     <p><strong>Circonstances :</strong></p>
                                    {Object.entries(item.circumstances || {}).map(([key, value]) => (
                                        value && (
                                            <li key={key}>
                                                {key}: {value ? "Oui" : "Non"}
                                            </li>
                                        )
                                    ))}
                                </ul>
                              
                            </div>

                            {/* Affichage des images */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                                <div>
                                    <img
                                        src={client?.getBaseURL() + `/${item.frontImage}`}
                                        alt="Avant"
                                        className="w-full h-auto"
                                    />
                                </div>
                                <div>
                                    <img
                                        src={client?.getBaseURL() + `/${item.backImage}`}
                                        alt="Arrière"
                                        className="w-full h-auto"
                                    />
                                </div>
                                <div>
                                    <img
                                        src={client?.getBaseURL() + `/${item.leftImage}`}
                                        alt="Gauche"
                                        className="w-full h-auto"
                                    />
                                </div>
                                <div>
                                    <img
                                        src={client?.getBaseURL() + `/${item.rightImage}`}
                                        alt="Droite"
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {data.length > 0 && (
                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={handleDownloadPdf}
                            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                            disabled={isGeneratingPdf}
                        >
                            {isGeneratingPdf ? "Génération en cours..." : "Télécharger en PDF"}
                        </button>
                    </div>
                )}
            </DialogBody>
        </Dialog>
    );
};

export default ConstatModal;
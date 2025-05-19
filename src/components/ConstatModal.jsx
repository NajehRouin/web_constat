import { useEffect, useState, useRef } from "react";
import client from "../api/client"; // modifie selon ton chemin
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import html2pdf from "html2pdf.js";

const ConstatModal = ({ open, onClose, userId }) => {
    const [data, setData] = useState([]);
    const pdfRef = useRef();


    useEffect(() => {
        if (userId) {
            client.post("/addConstat/getConstatUser", { userId: userId?._id }).then((res) => {
                setData(res.data.result || []);
            }).catch((err) => {
                console.error("Erreur lors de la récupération des constats :", err);
            });
        }
    }, [userId, name]);

    const handleDownloadPdf = () => {
        const element = pdfRef.current;

        // 1. Sélectionner toutes les images dans le composant
        const images = element.querySelectorAll("img");

        // 2. Créer des promesses pour attendre le chargement des images
        const imageLoadPromises = Array.from(images).map((img) => {
            return new Promise((resolve) => {
                if (img.complete) {
                    resolve(); // déjà chargée
                } else {
                    img.onload = img.onerror = () => resolve(); // chargée ou erreur, dans les deux cas on continue
                }
            });
        });

        // 3. Une fois toutes les images prêtes, générer le PDF
        Promise.all(imageLoadPromises).then(() => {
            html2pdf()
                .set({
                    margin: 10,
                    filename: "constats_complet.pdf",
                    image: { type: "jpeg", quality: 0.98 },
                    html2canvas: { scale: 2, useCORS: true }, // CORS pour éviter les erreurs de rendu d'image
                    jsPDF: { unit: "mm", format: "a4", orientation: "portrait", compress: true }, // Compress option for better performance
                })
                .from(element) // Générer à partir du contenu de `element`
                .save(); // Télécharger
        });
    };



    return (
        <Dialog open={open} handler={onClose} size="lg">
            <DialogHeader>Constats de l'utilisateur {userId?.name}{" "} {userId?.prenom}</DialogHeader>
            <DialogBody>
                <div ref={pdfRef}
                    className="p-4 text-sm space-y-4 max-h-[70vh] overflow-y-scroll">
                    {data.map((item, index) => (
                        <div key={index} className="border-b pb-4">
                            <h2 className="font-bold mb-2">Constat #{index + 1}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                                <p><strong>Date :</strong> {new Date(item.date).toLocaleDateString()}</p>
                                <p><strong>Heure :</strong> {item.time}</p>
                                <p><strong>Lieu :</strong> {item.location}</p>
                                <p><strong>Blessures :</strong> {item.injuries ? 'Oui' : 'Non'}</p>
                                <p><strong>Autres dommages :</strong> {item.otherDamages ? 'Oui' : 'Non'}</p>
                                <p><strong>Véhicule assuré :</strong> {item.insuredVehicle}</p>
                                <p><strong>Numéro contrat :</strong> {item.contractNumber}</p>
                                <p><strong>Agence :</strong> {item.agency}</p>
                                <p><strong>Validité :</strong> {new Date(item.validFrom).toLocaleDateString()} - {new Date(item.validTo).toLocaleDateString()}</p>
                                <p><strong>Conducteur :</strong> {item.driverFirstName} {item.driverLastName}</p>
                                <p><strong>Email :</strong> {item.driverAddress}</p>
                                <p><strong>Numéro de permis :</strong> {item.driverLicenseNumber}</p>
                                <p><strong>Date de délivrance du permis :</strong> {new Date(item.licenseIssueDate).toLocaleDateString()}</p>
                                <p><strong>Type de véhicule :</strong> {item.vehicleType}</p>
                                <p><strong>ID Accident :</strong> {item.accidentId}</p>
                            </div>


                            {/* Affichage des images */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                                <div><img src={client?.getBaseURL() + `/${item.frontImage}`} alt="Avant" className="w-full h-auto" /></div>
                                <div><img src={client?.getBaseURL() + `/${item.backImage}`} alt="Arrière" className="w-full h-auto" /></div>
                                <div><img src={client?.getBaseURL() + `/${item.leftImage}`} alt="Gauche" className="w-full h-auto" /></div>
                                <div><img src={client?.getBaseURL() + `/${item.rightImage}`} alt="Droite" className="w-full h-auto" /></div>
                            </div>
                        </div>
                    ))}
                </div>
                {
                    data.length > 0 &&(
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={handleDownloadPdf}
                                className="bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                Télécharger en PDF
                            </button>
                        </div>
                    )
                }

            </DialogBody>
        </Dialog>

    );
};

export default ConstatModal;

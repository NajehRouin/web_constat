import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import { EyeIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import client from "../../api/client";


export function Fraud() {
    const [frauds, setFrauds] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const fraudsPerPage = 5;

    // State for modal
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImages, setSelectedImages] = useState();

    useEffect(() => {
        const fetchFrauds = async () => {
            const res = await client.get("/fraud/fraud");
            setFrauds(res.data?.result);
        };
        fetchFrauds();
    }, []);

    const filteredFrauds = frauds?.filter((fraud) =>
        fraud.cin?.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLast = currentPage * fraudsPerPage;
    const indexOfFirst = indexOfLast - fraudsPerPage;
    const currentFrauds = filteredFrauds.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredFrauds.length / fraudsPerPage);

    // Fonction pour ouvrir la modale
    const openModal = (images) => {
        setSelectedImages(images);
        setModalOpen(true);
    };

    // Fonction pour fermer la modale
    const closeModal = () => {
        setModalOpen(false);
        setSelectedImages();
    };

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <CardHeader
                    variant="gradient"
                    color="gray"
                    className="mb-8 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                    <Typography variant="h6" color="white">
                        Liste des fraudes
                    </Typography>
                    <input
                        type="text"
                        placeholder="Rechercher par CIN..."
                        className="px-3 py-2 rounded-md text-sm text-gray-800"
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </CardHeader>

                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] table-auto border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                {["Nom", "Prénom", "Lieu (Nouveau)", "Date (Nouveau)", "Date", "Similarité", "Actions"].map((header) => (
                                    <th key={header} className="px-4 py-2 text-xs font-bold text-center uppercase text-blue-gray-500 border-b">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentFrauds.map((item, index) => (
                                <tr key={index} className="text-center text-sm">
                                    <td className="px-4 py-2 border-b">{item.userId?.name}</td>
                                    <td className="px-4 py-2 border-b">{item.userId?.prenom}</td>
                                    <td className="px-4 py-2 border-b">{item.nvConstat?.location}</td>
                                    <td className="px-4 py-2 border-b">{new Date(item.nvConstat?.date).toLocaleDateString()}</td>
                                    <td className="px-4 py-2 border-b">{new Date(item.createdAt).toLocaleDateString()}</td>
                                    <td className="px-4 py-2 border-b font-semibold">{(item.similarity * 100).toFixed(2)}%</td>
                                    <td className="px-4 py-2 border-b">
                                        <button
                                            onClick={() => openModal(item?.imagesCompared)}
                                            className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-sm transition"
                                        >
                                            <EyeIcon className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex justify-center items-center mt-6 gap-2">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
                        >
                            Précédent
                        </button>
                        <span className="text-sm font-medium">
                            Page {currentPage} / {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
                        >
                            Suivant
                        </button>
                    </div>
                </CardBody>
            </Card>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-end">
                            <button
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            {selectedImages ?(
                               
                                    <img
                                      
                                        src={client.getBaseURL()+ selectedImages}
                                        alt={`Comparée ${i + 1}`}
                                        className="w-full h-auto object-cover rounded"
                                    />
                              
                            ) : (
                                <p>Aucune image disponible</p>
                            )}
                        </div>
                        <div className="mt-4 text-right">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-200 rounded text-sm"
                            >
                                Fermer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Fraud;
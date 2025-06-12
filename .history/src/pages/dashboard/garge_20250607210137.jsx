import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import client from "../../api/client";
import AddGargeModal from "../../components/AddGargeModal";
import { toast } from "react-toastify";
import ModifierRole from "@/components/ModifierRole";
import { PencilIcon } from "@heroicons/react/24/outline";
export function Garge() {
    const [garges, setGarges] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const gargePerPage = 5;
    const [openModal, setOpenModal] = useState(false);
 const [selectedGestionnaire, setSelectedGestionnaire] = useState(null);
    const [openModifierModal, setOpenModifierModal] = useState(false);
    const fetchGarges = async () => {
        const res = await client.get("/admin/getgrage");
        setGarges(res.data.result);
    };

    useEffect(() => {
        fetchGarges();
    }, []);

    const filteredGarges = garges.filter((garge) =>
        garge.name.toLowerCase().includes(search.toLowerCase())
    );

        const handleOpenModifierModal = (gestionnaire) => {
        setSelectedGestionnaire(gestionnaire);
        setOpenModifierModal(true);
    };
    const indexOfLast = currentPage * gargePerPage;
    const indexOfFirst = indexOfLast - gargePerPage;
    const currentGarges = filteredGarges.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredGarges.length / gargePerPage);

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <CardHeader
                    variant="gradient"
                    color="gray"
                    className="mb-8 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                    <Typography variant="h6" color="white">
                        Liste des garages
                    </Typography>
                    <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Rechercher par nom..."
                            className="px-3 py-2 rounded-md text-sm text-gray-800 w-full md:w-64"
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-md"
                            onClick={() => setOpenModal(true)}
                        >
                            Ajouter Garage
                        </button>
                    </div>
                </CardHeader>

                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] table-auto">
                        <thead>
                            <tr>
                                {["Nom", "Email", "Rôle", "Statut", "Créé le"].map((el) => (
                                    <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-center">
                                        <Typography
                                            variant="small"
                                            className="text-[11px] font-bold uppercase text-blue-gray-400"
                                        >
                                            {el}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentGarges.map(({ _id, name, email, role, isActive, createdAt }) => {
                                const className = `py-3 px-5 border-b border-blue-gray-50 text-center`;
                                return (
                                    <tr key={_id}>
                                        <td className={className}>{name}</td>
                                        <td className={className}>{email}</td>
                                        <td className={className}>{role}</td>
                                        <td className={className}>
                                            <span className={`px-2 py-1 rounded text-xs font-semibold ${isActive ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}`}>
                                                {isActive ? "Actif" : "Inactif"}
                                            </span>
                                        </td>
                                        <td className={className}>{new Date(createdAt).toLocaleDateString()}</td>
                                             <td className={className}>
                                            <button
                                                onClick={() => handleOpenModifierModal({ _id, name, email, role, isActive })}
                                                className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-sm transition"
                                            >
                                                <PencilIcon className="h-4 w-4" />
                                                Modifier
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

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

            <AddGargeModal
                open={openModal}
                handleClose={() => setOpenModal(false)}
                onGargeAdded={fetchGarges}
            />

                <ModifierRole
                open={openModifierModal}
                handleClose={() => {
                    setOpenModifierModal(false);
                    setSelectedGestionnaire(null);
                }}
                gestionnaire={selectedGestionnaire}
                onGestionnaireUpdated={fetchGarges}
            />
        </div>
    );
}

export default Garge;

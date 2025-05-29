import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import { EyeIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import client from "../../api/client";

export function Accidents() {
    const [accidents, setAccidents] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const accidentsPerPage = 1;

    useEffect(() => {
        const fetchAccidents = async () => {
            const res = await client.get("/accident/accident");
            setAccidents(res.data?.result || []);
        };
        fetchAccidents();
    }, []);

    const filteredAccidents = accidents?.filter((acc) =>
        acc.accidentId?.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLast = currentPage * accidentsPerPage;
    const indexOfFirst = indexOfLast - accidentsPerPage;
    const currentAccidents = filteredAccidents.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredAccidents.length / accidentsPerPage);

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <CardHeader
                    variant="gradient"
                    color="gray"
                    className="mb-8 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                    <Typography variant="h6" color="white">
                        Liste des accidents
                    </Typography>
                    <input
                        type="text"
                        placeholder="Rechercher par ID d'accident..."
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
                                {["ID Accident", "Total Véhicules", "Véhicules Soumis", "Statut", "Date de Création", "Actions"].map((header) => (
                                    <th key={header} className="px-4 py-2 text-xs font-bold text-center uppercase text-blue-gray-500 border-b">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentAccidents.map((accident, index) => (
                                <tr key={index} className="text-center text-sm">
                                    <td className="px-4 py-2 border-b">{accident.accidentId}</td>
                                    <td className="px-4 py-2 border-b">{accident.totalVehicles}</td>
                                    <td className="px-4 py-2 border-b">{accident.submittedVehicles}</td>
                                    <td className={`px-4 py-2 border-b ${accident.isComplete ? "text-green-600" : "text-red-600"}`}>
                                        {accident.isComplete ? "Complet" : "Incomplet"}
                                    </td>
                                    <td className="px-4 py-2 border-b">{new Date(accident.createdAt).toLocaleDateString()}</td>
                                    <td className="px-4 py-2 border-b">
                                        <button
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
        </div>
    );
}

export default Accidents;
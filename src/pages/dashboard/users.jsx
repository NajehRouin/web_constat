import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react";

import { useEffect, useState } from "react";
import client from "../../api/client";

import {
    DocumentTextIcon,
    FolderOpenIcon,
    TruckIcon,
} from "@heroicons/react/24/outline";
import VehiculeModal from "../../components/VehiculeModal";
import DocumentModal from "@/components/DocumentModal";
import ConstatModal from "@/components/ConstatModal";
export function Users() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;
    const [selectedVehicules, setSelectedVehicules] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);


    const [openConstatModal, setOpenConstatModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);



    useEffect(() => {
        const fetchUsers = async () => {
            const res = await client.get("/users/allUsers");
            setUsers(res.data);
        };
        fetchUsers();
    }, []);

    const filteredUsers = users.filter((user) =>
        user.cin.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);



    const [openDocumentModal, setOpenDocumentModal] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);

    const handleOpenDocumentModal = (user) => {
        setSelectedDocument(user);
        setOpenDocumentModal(true);
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
                        liste d'utilisateurs
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
                    <table className="w-full min-w-[640px] table-auto">
                        <thead>
                            <tr>
                                {["Nom", "Prenom", "CIN", "N° Telephone", "N° Permis", "Cat Permis", "Véhicule", "Actions"].map((el) => (
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
                            {currentUsers.map(
                                ({ _id, name, prenom, cin, numeroTelephone, numeroPermis, categoriesPermis, vehicules, dateDelivrance, dateExpiration }, key) => {
                                    const className = `py-3 px-5 border-b border-blue-gray-50`;

                                    return (
                                        <tr key={_id}>
                                            <td className={className}>
                                                <div className="flex items-center gap-4">
                                                    <div
                                                        style={{
                                                            width: 35,
                                                            height: 35,
                                                            borderRadius: "50%",
                                                            backgroundColor: "#007bff",
                                                            color: "#fff",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            fontWeight: "bold",
                                                            fontSize: 14,
                                                        }}
                                                    >
                                                        {name?.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <Typography variant="small" color="blue-gray" className="font-semibold">
                                                            {name}
                                                        </Typography>
                                                        <Typography className="text-xs font-normal text-blue-gray-500">
                                                            {prenom}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {prenom}
                                                </Typography>
                                            </td>

                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {cin}
                                                </Typography>
                                            </td>

                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {numeroTelephone}
                                                </Typography>
                                            </td>

                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {numeroPermis}
                                                </Typography>
                                            </td>

                                            <td className={className}>
                                                {
                                                    categoriesPermis?.map((c, index) => (
                                                        <Typography key={index} className="text-xs font-semibold text-blue-gray-600">
                                                            {c}
                                                        </Typography>
                                                    ))}

                                            </td>





                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {vehicules?.length}
                                                </Typography>
                                            </td>

                                            <td className={className}>
                                                <div className="flex flex-wrap gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedUserId({_id,name,prenom});
                                                            setOpenConstatModal(true);
                                                        }}
                                                        className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-sm transition"
                                                    >
                                                        <DocumentTextIcon className="h-4 w-4" />
                                                        Constat
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleOpenDocumentModal({
                                                                numeroPermis: numeroPermis,
                                                                dateExpiration: dateExpiration,
                                                                dateDelivrance: dateDelivrance,
                                                                categoriesPermis: categoriesPermis
                                                            })
                                                        }
                                                        className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-sm transition"
                                                    >
                                                        <FolderOpenIcon className="h-4 w-4" />
                                                        Document
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedVehicules(vehicules);
                                                            setModalOpen(true);
                                                        }}
                                                        className="flex items-center gap-1 bg-purple-500 hover:bg-purple-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-sm transition"
                                                    >
                                                        <TruckIcon className="h-4 w-4" />
                                                        Véhicules
                                                    </button>
                                                </div>
                                            </td>


                                        </tr>
                                    );
                                }
                            )}
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

            <VehiculeModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                vehicules={selectedVehicules}
            />

            <DocumentModal
                isOpen={openDocumentModal}
                onClose={() => setOpenDocumentModal(false)}
                data={selectedDocument}
            />

            <ConstatModal
                open={openConstatModal}
                onClose={() => setOpenConstatModal(false)}
                userId={selectedUserId}
            />
        </div>
    );
}

export default Users;

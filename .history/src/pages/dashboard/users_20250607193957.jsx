import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button
} from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import client from "../../api/client";
import {
    DocumentTextIcon,
    FolderOpenIcon,
    TruckIcon,
    TrashIcon
} from "@heroicons/react/24/outline";
import VehiculeModal from "../../components/VehiculeModal";
import DocumentModal from "@/components/DocumentModal";
import ConstatModal from "@/components/ConstatModal";
import AddUsersModal from "../../components/AddUsersModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from "@/auth/context";

export function Users() {
    const { admin } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;
    const [modalOpen, setModalOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openConstatModal, setOpenConstatModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [openDocumentModal, setOpenDocumentModal] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const fetchUsers = async () => {
        try {
            const res = await client.get("/users/allUsers");
            setUsers(res.data);
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error("Erreur lors du chargement des utilisateurs.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleVehicleAdded = () => {
        fetchUsers(); // Refresh the users list to update vehicles
    };


const handleDeleteUser = async () => {
    try {
        const response = await client.delete("/users/user", {
            data: { idUser: userToDelete._id }
        });
        toast.success("Assuré supprimé avec succès.", {
            position: "top-right",
            autoClose: 3000,
        });
        fetchUsers();
        setOpenConfirmDeleteModal(false);
        setUserToDelete(null);
    } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Erreur lors de la suppression de l'assuré.", {
            position: "top-right",
            autoClose: 3000,
        });
    }
};

    const filteredUsers = users.filter((user) =>
        user.cin.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const handleOpenDocumentModal = (user) => {
        setSelectedDocument(user);
        setOpenDocumentModal(true);
    };

    const handleUserAdded = async (userData, resetModal) => {
        try {
            let response = await client.post("/users/addUser", userData);
            if (response.status === 400) {
                toast.error(response?.data?.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.success(response?.data?.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                fetchUsers();
                resetModal();
                setOpenModal(false);
            }
        } catch (error) {
            console.error("Error adding user:", error);
            toast.error("Erreur lors de l'ajout de l'utilisateur.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <ToastContainer position="top-center" />
            <Card>
                <CardHeader
                    variant="gradient"
                    color="gray"
                    className="mb-8 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                    <Typography variant="h6" color="white">
                        Liste des Assurés
                    </Typography>
                    <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Rechercher par CIN..."
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
                            Ajouter Assuré
                        </button>
                    </div>
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
                                                {categoriesPermis?.map((c, index) => (
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
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedUserId({ _id, name, prenom });
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
                                                            setSelectedUserId(_id);
                                                            setModalOpen(true);
                                                        }}
                                                        className="flex items-center gap-1 bg-purple-500 hover:bg-purple-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-sm transition"
                                                    >
                                                        <TruckIcon className="h-4 w-4" />
                                                        Véhicules
                                                    </button>
                                                    {admin.role === "Admin" && (
                                                        <button
                                                            onClick={() => {
                                                                setUserToDelete({ _id, name, prenom });
                                                                setOpenConfirmDeleteModal(true);
                                                            }}
                                                            className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-sm transition"
                                                        >
                                                            <TrashIcon className="h-4 w-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                }
                            )}
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
            <VehiculeModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                userId={selectedUserId}
                onVehicleAdded={handleVehicleAdded}
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
            <AddUsersModal
                open={openModal}
                handleClose={() => setOpenModal(false)}
                onUserAdded={handleUserAdded}
            />
            <Dialog open={openConfirmDeleteModal} handler={() => setOpenConfirmDeleteModal(false)}>
                <DialogHeader>Confirmer la suppression</DialogHeader>
                <DialogBody>
                    Êtes-vous sûr de vouloir supprimer l'assuré {userToDelete?.name} {userToDelete?.prenom} ???
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="blue-gray"
                        onClick={() => {
                            setOpenConfirmDeleteModal(false);
                            setUserToDelete(null);
                        }}
                        className="mr-1"
                    >
                        Annuler
                    </Button>
                    <Button
                        variant="gradient"
                        color="red"
                        onClick={handleDeleteUser}
                    >
                        Supprimer
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}

export default Users;
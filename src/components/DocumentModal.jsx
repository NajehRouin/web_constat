import React from "react";

const DocumentModal = ({ isOpen, onClose, data }) => {
    if (!isOpen || !data) return null;

    const { numeroPermis, dateExpiration, dateDelivrance, categoriesPermis } = data;

    const formatDate = (dateStr) =>
        new Date(dateStr).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
                <h2 className="text-lg font-semibold mb-4">Document utilisateur</h2>

                <p><strong>Numéro de permis:</strong> {numeroPermis}</p>

                <p><strong>Date de délivrance:</strong> {formatDate(dateDelivrance)}</p>

                <p><strong>Date d'expiration:</strong> {formatDate(dateExpiration)}</p>

                <div className="mt-2">
                    <strong>Catégories de permis:</strong>
                    <ul className="list-disc list-inside">
                        {categoriesPermis.map((cat, index) => (
                            <li key={index}>{cat}</li>
                        ))}
                    </ul>
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        onClick={onClose}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DocumentModal;

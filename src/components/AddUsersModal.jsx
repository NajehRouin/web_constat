import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Modal from './Modal';

const CATEGORIES = ["A1", "B", "BE", "C", "CE", "D", "DE", "G"];
const assureurs = [
  "AMI", "ASTREE", "Attijari", "GAT", "G AT VIE", "MAE",
  "TUNIS RE", "STAR", "COMAR", "MAGHERBIA", "LLOYD",
  "CARTE", "GE", "CTAMA", "CORIS", "BUAT", "AVUS", "FGA", "NA"
];

const validationSchema = Yup.object({
  name: Yup.string().required('Nom requis'),
  prenom: Yup.string().required('Prénom requis'),
  cin: Yup.string()
    .matches(/^[0-9]+$/, 'CIN doit contenir uniquement des chiffres')
    .required('CIN requis'),
  email: Yup.string().email('Email invalide').required('Email requis'),

  numeroTelephone: Yup.string()
    .matches(/^[0-9]+$/, 'Numéro de téléphone doit contenir uniquement des chiffres')
    .required('Numéro de téléphone requis'),
  adresse: Yup.string().required('Adresse requise'),
  numeroPermis: Yup.string().required('Numéro de permis requis'),
  dateDelivrance: Yup.date().typeError('Date de délivrance invalide').required('Date de délivrance requise'),
  dateExpiration: Yup.date().typeError('Date d\'expiration invalide').required('Date d\'expiration requise'),
  categoriesPermis: Yup.array().min(1, 'Sélectionnez au moins une catégorie').required('Catégorie requise'),
 
  vehicules: Yup.array().of(
    Yup.object({
      brand: Yup.string().required('Marque requise'),
      numeroSerie: Yup.string().required('Numéro de série requis'),
      numeroMatricule: Yup.string().required('Numéro de matricule requis'),
      numeroContrat: Yup.string().required('Numéro de contrat requis'),
      agence: Yup.string().required('Agence requise'),
      insuranceStartDate: Yup.date().typeError('Date de début d\'assurance invalide').required('Date de début d\'assurance requise'),
      insuranceEndDate: Yup.date().typeError('Date de fin d\'assurance invalide').required('Date de fin d\'assurance requise'),
      assure: Yup.string().required('Assureur requis'),
      type: Yup.string().required('Type de véhicule requis'),
    })
  ),
});



function AddUsersModal({ open, handleClose, onUserAdded }) {
  const [step, setStep] = useState(1);
 const [vehicleCount, setVehicleCount] = useState(0);

const resetModal = () => {
    formik.resetForm();
    setStep(1);
    setVehicleCount(0);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      prenom: '',
      cin: '',
      email: '',
     
      numeroTelephone: '',
      adresse: '',
      numeroPermis: '',
      dateDelivrance: '',
      dateExpiration: '',
      categoriesPermis: [],
      vehicules: [],
    },
    validationSchema,
    onSubmit: (values) => {
      if (step === 1) {
        setStep(2);
      } else {
       
        onUserAdded(values,resetModal);
       // handleClose();
      }
    },
  });

  const handleNombreVehiculesChange = (e) => {
    const count = parseInt(e.target.value) || 0;
 
  setVehicleCount(count)
    formik.setFieldValue('vehicules', Array(count).fill().map(() => ({
      brand: '',
      numeroSerie: '',
      numeroMatricule: '',
      numeroContrat: '',
      agence: '',
      insuranceStartDate: '',
      insuranceEndDate: '',
      assure: assureurs[0],
      type: 'TU',
    })));
  };

  const handleBack = () => {
    setStep(1);
  };




  const handleModalClose = () => {
    formik.resetForm();
    setStep(1);
    setVehicleCount(0)
    handleClose();
  };

  const handleNumericInput = (e) => {
    const value = e.target.value;
    if (!/^[0-9]*$/.test(value)) {
      e.target.value = value.replace(/[^0-9]/g, '');
    }
    formik.handleChange(e);
  };

  return (
    <Modal open={open} handleClose={handleModalClose}>
      <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg">
        <h2 className="text-2xl font-bold mb-4">
          {step === 1 ? 'Étape 1: Informations personnelles' : 'Étape 2: Informations des véhicules'}
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {step === 1 && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Nom</label>
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  className="mt-1 p-2 w-full border rounded"
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-sm">{formik.errors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">Prénom</label>
                <input
                  type="text"
                  name="prenom"
                  value={formik.values.prenom}
                  onChange={formik.handleChange}
                  className="mt-1 p-2 w-full border rounded"
                />
                {formik.touched.prenom && formik.errors.prenom && (
                  <p className="text-red-500 text-sm">{formik.errors.prenom}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">CIN</label>
                <input
                  type="text"
                  name="cin"
                  value={formik.values.cin}
                  onChange={handleNumericInput}
                  className="mt-1 p-2 w-full border rounded"
                  pattern="[0-9]*"
                  inputMode="numeric"
                />
                {formik.touched.cin && formik.errors.cin && (
                  <p className="text-red-500 text-sm">{formik.errors.cin}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className="mt-1 p-2 w-full border rounded"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm">{formik.errors.email}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium">Numéro de téléphone</label>
                <input
                  type="tel"
                  name="numeroTelephone"
                  value={formik.values.numeroTelephone}
                  onChange={handleNumericInput}
                  className="mt-1 p-2 w-full border rounded"
                  pattern="[0-9]*"
                  inputMode="numeric"
                />
                {formik.touched.numeroTelephone && formik.errors.numeroTelephone && (
                  <p className="text-red-500 text-sm">{formik.errors.numeroTelephone}</p>
                )}
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium">Adresse</label>
                <input
                  type="text"
                  name="adresse"
                  value={formik.values.adresse}
                  onChange={formik.handleChange}
                  className="mt-1 p-2 w-full border rounded"
                />
                {formik.touched.adresse && formik.errors.adresse && (
                  <p className="text-red-500 text-sm">{formik.errors.adresse}</p>
                )}
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium">Numéro de permis</label>
                <input
                  type="text"
                  name="numeroPermis"
                  value={formik.values.numeroPermis}
                  onChange={formik.handleChange}
                  className="mt-1 p-2 w-full border rounded"
                />
                {formik.touched.numeroPermis && formik.errors.numeroPermis && (
                  <p className="text-red-500 text-sm">{formik.errors.numeroPermis}</p>
                )}
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium">Validité de permis</label>
                <div className="grid grid-cols-2 gap-4 mt-1">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Date de délivrance</label>
                    <input
                      type="date"
                      name="dateDelivrance"
                      value={formik.values.dateDelivrance}
                      onChange={formik.handleChange}
                      className="mt-1 p-2 w-full border rounded"
                    />
                    {formik.touched.dateDelivrance && formik.errors.dateDelivrance && (
                      <p className="text-red-500 text-sm">{formik.errors.dateDelivrance}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Date d'expiration</label>
                    <input
                      type="date"
                      name="dateExpiration"
                      value={formik.values.dateExpiration}
                      onChange={formik.handleChange}
                      className="mt-1 p-2 w-full border rounded"
                    />
                    {formik.touched.dateExpiration && formik.errors.dateExpiration && (
                      <p className="text-red-500 text-sm">{formik.errors.dateExpiration}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium">Catégories de permis</label>
                <div className="flex space-x-4">
                  {CATEGORIES.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        name="categoriesPermis"
                        value={category}
                        checked={formik.values.categoriesPermis.includes(category)}
                        onChange={formik.handleChange}
                        className="mr-2"
                      />
                      {category}
                    </label>
                  ))}
                </div>
                {formik.touched.categoriesPermis && formik.errors.categoriesPermis && (
                  <p className="text-red-500 text-sm">{formik.errors.categoriesPermis}</p>
                )}
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Nombre de véhicules</label>
                <input
                  type="number"
                  name="nombreVehicules"
                  value={vehicleCount}
                  onChange={handleNombreVehiculesChange}
                  className="mt-1 p-2 w-full border rounded"
                  min="0"
                />
                {vehicleCount===0 && (
                  <p className="text-red-500 text-sm">Nombre de véhicules doit être 0 ou plus</p>
                )}
              </div>
              {formik.values.vehicules.map((vehicule, index) => (
                <div key={index} className="border p-4 rounded-lg">
                  <h3 className="text-lg font-semibold">Véhicule {index + 1}</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium">N° Matricule</label>
                        <input
                          type="text"
                          name={`vehicules[${index}].numeroMatricule`}
                          value={vehicule.numeroMatricule}
                          onChange={formik.handleChange}
                          className="mt-1 p-2 w-full border rounded"
                        />
                        {formik.touched.vehicules?.[index]?.numeroMatricule && formik.errors.vehicules?.[index]?.numeroMatricule && (
                          <p className="text-red-500 text-sm">{formik.errors.vehicules[index].numeroMatricule}</p>
                        )}
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-center">Type</label>
                        <input
                          type="text"
                          name={`vehicules[${index}].type`}
                          value={vehicule.type}
                          disabled
                          className="mt-1 p-2 w-full border rounded bg-gray-100 cursor-not-allowed text-center"
                        />
                        {formik.touched.vehicules?.[index]?.type && formik.errors.vehicules?.[index]?.type && (
                          <p className="text-red-500 text-sm">{formik.errors.vehicules[index].type}</p>
                        )}
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium">N° série</label>
                        <input
                          type="text"
                          name={`vehicules[${index}].numeroSerie`}
                          value={vehicule.numeroSerie}
                          onChange={formik.handleChange}
                          className="mt-1 p-2 w-full border rounded"
                        />
                        {formik.touched.vehicules?.[index]?.numeroSerie && formik.errors.vehicules?.[index]?.numeroSerie && (
                          <p className="text-red-500 text-sm">{formik.errors.vehicules[index].numeroSerie}</p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium">Marque</label>
                        <input
                          type="text"
                          name={`vehicules[${index}].brand`}
                          value={vehicule.brand}
                          onChange={formik.handleChange}
                          className="mt-1 p-2 w-full border rounded"
                        />
                        {formik.touched.vehicules?.[index]?.brand && formik.errors.vehicules?.[index]?.brand && (
                          <p className="text-red-500 text-sm">{formik.errors.vehicules[index].brand}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Numéro de contrat</label>
                        <input
                          type="text"
                          name={`vehicules[${index}].numeroContrat`}
                          value={vehicule.numeroContrat}
                          onChange={formik.handleChange}
                          className="mt-1 p-2 w-full border rounded"
                        />
                        {formik.touched.vehicules?.[index]?.numeroContrat && formik.errors.vehicules?.[index]?.numeroContrat && (
                          <p className="text-red-500 text-sm">{formik.errors.vehicules[index].numeroContrat}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Agence</label>
                        <input
                          type="text"
                          name={`vehicules[${index}].agence`}
                          value={vehicule.agence}
                          onChange={formik.handleChange}
                          className="mt-1 p-2 w-full border rounded"
                        />
                        {formik.touched.vehicules?.[index]?.agence && formik.errors.vehicules?.[index]?.agence && (
                          <p className="text-red-500 text-sm">{formik.errors.vehicules[index].agence}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Assureur</label>
                        <select
                          name={`vehicules[${index}].assure`}
                          value={vehicule.assure}
                          onChange={formik.handleChange}
                          className="mt-1 p-2 w-full border rounded"
                        >
                          {assureurs.map((assureur) => (
                            <option key={assureur} value={assureur}>{assureur}</option>
                          ))}
                        </select>
                        {formik.touched.vehicules?.[index]?.assure && formik.errors.vehicules?.[index]?.assure && (
                          <p className="text-red-500 text-sm">{formik.errors.vehicules[index].assure}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Date de début d'assurance</label>
                        <input
                          type="date"
                          name={`vehicules[${index}].insuranceStartDate`}
                          value={vehicule.insuranceStartDate}
                          onChange={formik.handleChange}
                          className="mt-1 p-2 w-full border rounded"
                        />
                        {formik.touched.vehicules?.[index]?.insuranceStartDate && formik.errors.vehicules?.[index]?.insuranceStartDate && (
                          <p className="text-red-500 text-sm">{formik.errors.vehicules[index].insuranceStartDate}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Date de fin d'assurance</label>
                        <input
                          type="date"
                          name={`vehicules[${index}].insuranceEndDate`}
                          value={vehicule.insuranceEndDate}
                          onChange={formik.handleChange}
                          className="mt-1 p-2 w-full border rounded"
                        />
                        {formik.touched.vehicules?.[index]?.insuranceEndDate && formik.errors.vehicules?.[index]?.insuranceEndDate && (
                          <p className="text-red-500 text-sm">{formik.errors.vehicules[index].insuranceEndDate}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-between mt-6">
            {step === 2 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Retour
              </button>
            )}
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleModalClose}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {step === 1 ? 'Suivant' : 'Ajouter'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default AddUsersModal;
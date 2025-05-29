// src/components/forms/AssurePicker.jsx
import React from "react";
import { useFormikContext } from "formik";

const assureurs = [
  "AMI",
  "ASTREE",
  "Attijari",
  "GAT",
  "G AT VIE",
  "MAE",
  "TUNIS RE",
  "STAR",
  "COMAR",
  "MAGHERBIA",
  "LLOYD",
  "CARTE",
  "GE",
  "CTAMA",
  "CORIS",
  "BUAT",
  "AVUS",
  "FGA",
  "NA",
];

const AssurePicker = ({ index }) => {
  const { setFieldValue, values } = useFormikContext();

  return (
    <select
      value={values.vehicules?.[index]?.assure || ""}
      onChange={(e) => setFieldValue(`vehicules[${index}].assure`, e.target.value)}
      className="bg-white border border-gray-300 rounded-md my-2 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Assureur"
    >
      <option value="">Sélectionnez un assureur</option>
      {assureurs.map((assureur) => (
        <option key={assureur} value={assureur}>
          {assureur}
        </option>
      ))}
    </select>
  );
};

export default AssurePicker;
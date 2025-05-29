// src/components/forms/VehicleTypePicker.jsx
import React from "react";
import { useFormikContext } from "formik";

const vehicleTypes = [
  "TU",
  "PAT",
  "CMD",
  "CD",
  "MD",
  "RS",
  "TRAC",
  "REM",
  "ONU",
  "OMG",
  "AA",
  "ES",
  "IT",
  "MC",
  "cC",
  "wW",
];

const VehicleTypePicker = ({ index }) => {
  const { setFieldValue, values } = useFormikContext();

  return (
    <select
      value={values.vehicules?.[index]?.type || ""}
      onChange={(e) => setFieldValue(`vehicules[${index}].type`, e.target.value)}
      className="bg-white border border-gray-300 rounded-md my-2 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Type de véhicule"
    >
      <option value="">Sélectionner le type</option>
      {vehicleTypes.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  );
};

export default VehicleTypePicker;
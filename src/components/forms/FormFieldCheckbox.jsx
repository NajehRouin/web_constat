// src/components/forms/FormFieldCheckbox.jsx
import React from "react";
import { useFormikContext } from "formik";

function FormFieldCheckbox({ name, value, label }) {
  const { values, setFieldValue } = useFormikContext();

  const selected = values[name]?.includes(value);

  const handleToggle = () => {
    const currentArray = values[name] || [];
    if (selected) {
      setFieldValue(
        name,
        currentArray.filter((item) => item !== value)
      );
    } else {
      setFieldValue(name, [...currentArray, value]);
    }
  };

  return (
    <div className="flex items-center mr-4 mb-2">
      <input
        type="checkbox"
        checked={selected}
        onChange={handleToggle}
        className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        id={`${name}-${value}`}
      />
      <label
        htmlFor={`${name}-${value}`}
        className="ml-2 text-base text-gray-700 cursor-pointer"
      >
        {label}
      </label>
    </div>
  );
}

export default FormFieldCheckbox;
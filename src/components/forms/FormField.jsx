// src/components/forms/AppFormField.jsx
import React from "react";
import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faPhone,
  faMapMarker,
  faCar,
  faCalendar,
  faHome,
  faIdCard,
} from "@fortawesome/free-solid-svg-icons";

const iconMap = {
  user: faUser,
  lock: faLock,
  phone: faPhone,
  "map-marker": faMapMarker,
  car: faCar,
  calendar: faCalendar,
  home: faHome,
  "id-card": faIdCard,
};

function FormField({ name, width, icon, ...otherProps }) {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();

  const widthClass = width
    ? typeof width === "string" && width.includes("%")
      ? `w-[${width}]`
      : `w-${width}`
    : "w-full";

  return (
    <div className="my-2">
      <div className="flex items-center border border-gray-300 rounded-md p-2">
        {icon && (
          <FontAwesomeIcon icon={iconMap[icon]} className="mr-2 text-gray-500" />
        )}
        <input
          name={name}
          value={values[name] || ""}
          onChange={(e) => setFieldValue(name, e.target.value)}
          onBlur={() => setFieldTouched(name)}
          className={`flex-1 outline-none text-gray-700 ${widthClass}`}
          {...otherProps}
        />
      </div>
      {touched[name] && errors[name] && (
        <ErrorMessage
          error={errors[name]}
          visible={touched[name]}
          id={`${name}-error`}
        />
      )}
    </div>
  );
}

export default FormField;
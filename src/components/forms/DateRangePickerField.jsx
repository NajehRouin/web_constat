// src/components/forms/DateRangePickerField.jsx
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function DateRangePickerField({
  label,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) {
  return (
    <div className="my-2">
      <label className="font-bold mb-1 block">{label}</label>
      <div className="flex gap-2">
        <DatePicker
          selected={startDate ? new Date(startDate) : null}
          onChange={(date) => onStartDateChange(date ? date.toISOString() : "")}
          placeholderText="Date de délivrance"
          dateFormat="yyyy-MM-dd"
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <DatePicker
          selected={endDate ? new Date(endDate) : null}
          onChange={(date) => onEndDateChange(date ? date.toISOString() : "")}
          placeholderText="Date d'expiration"
          dateFormat="yyyy-MM-dd"
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}

export default DateRangePickerField;
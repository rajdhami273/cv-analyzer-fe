import React from "react";
import css from "./Select.module.scss";

const Select = ({
  options,
  label,
  type,
  placeholder,
  name,
  value,
  onChange,
  onBlur,
  disabled,
  error,
  required,
  readOnly,
  showDefaultOption
}) => {
  return (
    <div className="form-group">
      <label className="my-1 mr-2 label" htmlFor="inlineFormCustomSelectPref">
        {label}
      </label>
      <select
        className="custom-select my-1 mr-sm-2"
        id="inlineFormCustomSelectPref"
        onChange={e => onChange(e.target.value)}
        onBlur={onBlur}
        name={name}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        required={required}
      >
        <option value="" disabled>
          Choose...
        </option>
        {options.map((item, index) => {
          // const { value, title } = item;
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

export default Select;

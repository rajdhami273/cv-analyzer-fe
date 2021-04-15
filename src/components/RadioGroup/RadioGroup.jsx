import React from "react";
import css from "./RadioGroup.module.scss";

const RadioGroup = ({
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
  showDefaultOption,
  titleKey,
  valueKey
}) => {
  return (
    <div className="form-group">
      <label className="my-1 mr-2 label" htmlFor="inlineFormCustomSelectPref">
        {label}
      </label>
      {options.map((item, index) => {
        return (
          <div className="form-check" key={index}>
            <input
              className="form-check-input"
              type="radio"
              name={name}
              id="exampleRadios1"
              value={valueKey ? item[valueKey] : item}
              onChange={e => onChange(e.target.value)}
              onBlur={onBlur}
              required={required}
              readOnly={readOnly}
              disabled={disabled}
            />
            <label className="form-check-label" htmlFor="exampleRadios1">
              {titleKey ? item[titleKey] : item}
            </label>
          </div>
        );
      })}
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

export default RadioGroup;

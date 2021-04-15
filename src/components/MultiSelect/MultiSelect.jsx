import React, { useState, useEffect } from "react";
import css from "./MultiSelect.module.scss";

const MultiSelect = ({
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
  ref,
  showSearchBar,
  addOptionWithSearch,
  saveNewOption,
  saveNewOptionFunction,
  options = ["a", "b", "c", "d", "e"]
}) => {
  // console.log(options);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [inputType, setInputType] = useState(type);
  const [searchString, setSearchString] = useState("");
  const [added, setAdded] = useState(false);
  const [newOptions, setNewOptions] = useState(options || []);
  const [selectedOptions, setSelectedOptions] = useState(value || []);
  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

  useEffect(() => {
    // console.log("hello", options);
    setNewOptions(options);
  }, [options, value]);
  return (
    <div className={`${css.container}`}>
      <div className={`${css.labelStyle}`}>{label}</div>
      <div className={`${css.inputContainer}`}>
        <input
          className={`${css.inp} form-control ${error && "is-invalid"}`}
          type={inputType || "text"}
          placeholder={placeholder || ""}
          name={name}
          value={value.join(", ")}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          readOnly={readOnly}
          ref={ref}
          onClick={toggleDropdown}
        ></input>
      </div>

      {dropdownVisible && (
        <div className={css.dropdown}>
          <div className="row">
            <div className="col-12">
              {showSearchBar && (
                <input
                  className={`${css.inp} ${css.searchbar} form-control`}
                  type={"text"}
                  placeholder={"Search here..."}
                  disabled={disabled}
                //   onKeyPress={e => {
                //     console.log(e);
                //     if ([9, 13].indexOf(e.charCode) > -1) {
                //       console.log("idhar");
                //       const str = e.target.value;
                //       if (showSearchBar && addOptionWithSearch && str) {
                //         console.log("idha2r");
                //         let arr = [...newOptions];
                //         // console.log(arr, added);
                //         if (!added) {
                //           arr.push(str);
                //           setAdded(true);
                //         } else {
                //           arr[arr.length - 1] = str;
                //         }
                //         setNewOptions(arr);
                //       }
                //       setSearchString(str);
                //     }
                //   }}
                  onChange={e => {
                    const str = e.target.value;
                    if (showSearchBar && addOptionWithSearch && str) {
                      let arr = [...newOptions];
                      // console.log(arr, added);
                      if (!added) {
                        arr.push(str);
                        setAdded(true);
                      } else {
                        arr[arr.length - 1] = str;
                      }
                      setNewOptions(arr);
                    }
                    setSearchString(str);
                  }}
                  // onBlur={onBlur}
                ></input>
              )}
            </div>
            <div className="col-12">
              <div className={css.itemContainer}>
                {newOptions
                  .filter(
                    item =>
                      item.toLowerCase().indexOf(searchString.toLowerCase()) >
                      -1
                  )
                  .map((item, index) => {
                    const isSelected = selectedOptions.indexOf(item);
                    return (
                      <div
                        key={index}
                        className={
                          css.item +
                          " d-flex w-100" +
                          (isSelected > -1 ? css.selected : "")
                        }
                        onClick={() => {
                          console.log(item);
                          let arr = [...selectedOptions];
                          if (isSelected > -1) {
                            arr.splice(isSelected, 1);
                          } else {
                            arr.push(item);
                          }
                          setSelectedOptions(arr);
                          onChange(item);
                          if (saveNewOption) {
                            let op = [...options];
                            const idx = op.filter(
                              it => item.toLowerCase() === it.toLowerCase()
                            );
                            console.log(idx);
                            if (idx.length === 0) {
                              saveNewOptionFunction(item);
                            }
                            console.log(idx);
                          }
                        }}
                        onBlur={onBlur}
                      >
                        <span>{item}</span>
                        {isSelected > -1 && (
                          <div className={css.check + " ml-auto"} />
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

export default MultiSelect;

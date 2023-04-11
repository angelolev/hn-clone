import React, { useState, useRef, useEffect } from "react";
import styles from "./styles/Dropdown.module.scss";
import { IDropdown, IFilter } from "../../types";
import { getLocalStorage, setLocalStorage } from "../../utils";

const Icon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};

const CloseIcon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
    </svg>
  );
};

const Dropdown = ({ placeHolder, options, onChange }: IDropdown) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<IFilter[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const searchRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSearchValue("");
    if (showMenu && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showMenu]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  });

  const handleInputClick = () => {
    setShowMenu(!showMenu);
  };

  const getDisplay = () => {
    if (!selectedValue || selectedValue.length === 0) {
      return placeHolder;
    }

    return (
      <div className={styles.dropdown__tags}>
        {selectedValue.map((option: IFilter) => (
          <div key={option.value} className={styles.dropdown__tagItem}>
            {option.label}
            <span
              onClick={(e) => onTagRemove(e, option)}
              className={styles.dropdown__tagClose}
            >
              <CloseIcon />
            </span>
          </div>
        ))}
      </div>
    );
  };

  const removeOption = (option: IFilter) => {
    return selectedValue.filter((o) => o.value !== option.value);
  };

  const onTagRemove = (e: React.MouseEvent, option: IFilter) => {
    e.stopPropagation();
    const newValue = removeOption(option);
    setSelectedValue(newValue);
    onChange(newValue);
    setLocalStorage("activeFilters", [...newValue]);
  };

  const onItemClick = (option: IFilter) => {
    let newValue;
    if (selectedValue.findIndex((o) => o.value === option.value) >= 0) {
      newValue = removeOption(option);
    } else {
      newValue = [...selectedValue, option];
      setLocalStorage("activeFilters", [...newValue]);
    }

    setSelectedValue(newValue);
    onChange(newValue);
  };

  const isSelected = (option: IFilter) => {
    if (!selectedValue) {
      return false;
    }

    return selectedValue.filter((o) => o.value === option.value).length > 0;
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const getOptions = () => {
    if (!searchValue) {
      return options;
    }

    return options.filter(
      (option) =>
        option.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
    );
  };

  useEffect(() => {
    setSelectedValue(getLocalStorage("activeFilters"));
  }, []);

  return (
    <div className={styles.dropdown__container}>
      <div
        ref={inputRef}
        onClick={handleInputClick}
        className={styles.dropdown__input}
      >
        <div className={styles.dropdown__selectedValue}>{getDisplay()}</div>
        <div className={styles.dropdown__tools}>
          <div className={styles.dropdown__tool}>
            <Icon />
          </div>
        </div>
      </div>
      {showMenu && (
        <div className={styles.dropdown__menu}>
          <div className={styles.dropdown__searchBox}>
            <input onChange={onSearch} value={searchValue} ref={searchRef} />
          </div>

          {getOptions().map((option) => (
            <div
              onClick={() => onItemClick(option)}
              key={option.value}
              className={`${
                isSelected(option)
                  ? styles.dropdown__itemSelected
                  : styles.dropdown__item
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

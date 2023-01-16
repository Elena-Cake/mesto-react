import React from "react";
import { useState, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const isFormValid = !(nameError || descriptionError)

  function handleChangeName(e) {
    setName(e.target.value);
    if (!e.target.validity.valid) {
      setNameError(e.target.validationMessage);
    } else {
      setNameError("");
    }
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
    if (!e.target.validity.valid) {
      setDescriptionError(e.target.validationMessage);
    } else {
      setDescriptionError("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  // дезактивация кнопки при открытии попапа и начальные данные
  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    } else {
      setName("");
      setDescription("");
      setNameError("");
      setDescriptionError("");
    }
  }, [isOpen, currentUser]);

  return (
    <PopupWithForm
      isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}
      name="edit" title={"Редактировать профиль"}
      buttonText={!isLoading ? "Создать" : "Создание..."}
      disabledButton={!isFormValid}
    >
      <fieldset className="popup__set">
        <label className="popup__form-field">
          <input
            onChange={handleChangeName}
            className="popup__input popup__input_type_name"
            id="place-input" type="text" name="name"
            required
            minLength="2" maxLength="40"
            placeholder="Введите имя"
            value={name}
          />
          {nameError && (
            <span className="popup__input-error place-input-error popup__input-error_active">
              {nameError}
            </span>
          )}
        </label>
        <label className="popup__form-field">
          <input
            onChange={handleChangeDescription}
            className="popup__input popup__input_type_job"
            id="job-input" type="text" name="about"
            required
            minLength="2" maxLength="200"
            placeholder="Чем вы занимаетесь?"
            value={description}
          />
          {descriptionError && (
            <span className="popup__input-error url-input-error popup__input-error_active">
              {descriptionError}
            </span>
          )}
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;

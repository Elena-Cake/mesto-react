import React from "react";
import { useRef, useState, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const photoRef = useRef();

  const [urlError, setUrlError] = useState("");

  const isFormValid = !(urlError)

  const onChange = (refInput) => {
    if (refInput.current.validity.valid) {
      setUrlError("");
    } else {
      setUrlError(refInput.current.validationMessage);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar(photoRef.current.value);
  }

  // дезактивация кнопки при открытии попапа
  useEffect(() => {
    if (isOpen) {
      setUrlError(' ');
    } else {
      photoRef.current.value = '';
      setUrlError('');
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen} onClose={onClose}
      onSubmit={handleSubmit}
      name="avatar" title={"Обновить аватар"}
      buttonText={!isLoading ? "Создать" : "Создание..."}
      disabledButton={!isFormValid}
    >
      <fieldset className="popup__set">
        <label className="popup__form-field">
          <input
            ref={photoRef} onChange={onChange.bind(this, photoRef)}
            className="popup__input popup__input_type_name"
            id="avatar-input" name="avatar"
            type="url" placeholder="Ссылка на картинку"
            required
          />
          <span className="popup__input-error url-input-error popup__input-error_active">
            {urlError}
          </span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

import React from "react";
import {useRef, useState, useEffect} from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function EditAvatarPopup(props) {


    const fotoRef = useRef();
      
    const [errorMessage, setErrorMessage] = useState("");
    const [formValid, setFormValid] = useState(false);

    useEffect(()=> {
        if(errorMessage) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [ errorMessage])

    const onChange = (refInput) => {
        if (refInput.current.validity.valid) {
            setErrorMessage("");
            setFormValid(true);
        } else {
            setErrorMessage(refInput.current.validationMessage);
            setFormValid(false);
        }  
    }

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar(
           fotoRef.current.value,
        );
      } 

return (
    <PopupWithForm  isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}
                    name='avatar' title={"Обновить аватар"} 
                    buttonText={"Сохранить"} disabledButton={!formValid}>
        <fieldset className="popup__set">
            <label className="popup__form-field">
                <input  ref={fotoRef} onChange = {onChange.bind(this, fotoRef)}
                        className="popup__input popup__input_type_name" 
                        id="avatar-input" type="url" name="avatar" 
                        placeholder="Ссылка на картинку" 
                        required/>
                <span className="popup__input-error url-input-error popup__input-error_active">{errorMessage}</span>
            </label>
        </fieldset>
    </PopupWithForm>
)
}

export default EditAvatarPopup;
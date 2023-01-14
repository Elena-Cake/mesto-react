import React from "react";
import {useRef, useState, useEffect} from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function EditAvatarPopup(props) {


    const fotoRef = useRef();
      
    const [urlError, setUrlError] = useState("");

    const [formValid, setFormValid] = useState(false);

    // проверяет ошибки для обозначения валидноти
    useEffect(()=> {
        if(urlError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [urlError])

    const onChange = (refInput) => {
        if (refInput.current.validity.valid) {
            setUrlError("");
            setFormValid(true);
        } else {
            setUrlError(refInput.current.validationMessage);
            setFormValid(false);
        }  
    }

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar(
           fotoRef.current.value,
        );
    } 

     // дезактивация кнопки при открытии попапа
    useEffect(() => {
        if (props.isOpen) {
            setFormValid(false)
        } else {
            fotoRef.current.value = '';
            setUrlError("");
        }
    }, [props.isOpen]); 

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
                <span className="popup__input-error url-input-error popup__input-error_active">{urlError}</span>
            </label>
        </fieldset>
    </PopupWithForm>
)
}

export default EditAvatarPopup;
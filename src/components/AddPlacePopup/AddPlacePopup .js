import React from "react";
import {createRef, useState, useEffect} from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function AddPlacePopup(props) {
    
    const nameRef = createRef();
    const linkRef = createRef();

    const [nameError, setNameError] = useState("");
    const [linkError, setLinkError] = useState("");

    const [formValid, setFormValid] = useState(false);

    // проверяет ошибки для обозначения валидноти
    useEffect(()=> {
        if(nameError || linkError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [nameError, linkError])

    function onChangeName(refInput) {
        if (refInput.current.validity.valid) {
            setNameError("");
        } else {
            setNameError(refInput.current.validationMessage);
        }  
    }

    function onChangeLink(refInput) {
        if (refInput.current.validity.valid) {
            setLinkError("");
        } else {
            setLinkError(refInput.current.validationMessage);
        }  
    }

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onAddPlace({
            name:   nameRef.current.value, 
            link:   linkRef.current.value
        })
    } 

    // дезактивация кнопки при открытии попапа
    useEffect(() => {
        if (props.isOpen) {
            setFormValid(false)
        } else {
            nameRef.current.value = '';
            linkRef.current.value = '';
            setNameError("");
            setLinkError("");
        }
    }, [props.isOpen]); 

return (
    <PopupWithForm  isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} 
                    name='add-card' title={"Новое место"} 
                    buttonText={"Создать"}  buttonTextLoading={"Создание..."}
                    disabledButton={!formValid} isLoading={props.isLoading}>
        <fieldset className="popup__set">
            <label className="popup__form-field">
                <input  ref={nameRef} onChange = {onChangeName.bind(this, nameRef)}
                        className="popup__input popup__input_type_name" id="place-input" type="text" 
                        name="name" placeholder="Название" required minLength="2" maxLength="30"/>
                <span className="popup__input-error place-input-error popup__input-error_active">{nameError}</span>
            </label>
            <label className="popup__form-field">
                <input  ref={linkRef} onChange = {onChangeLink.bind(this, linkRef)}
                        className="popup__input popup__input_type_job" id="url-input" type="url" 
                        name="link" placeholder="Ссылка на картинку" required/>
                <span className="popup__input-error url-input-error popup__input-error_active">{linkError}</span>
            </label>
        </fieldset>
    </PopupWithForm>
)
}

export default AddPlacePopup;
import React from "react";
import {createRef} from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function AddPlacePopup(props) {
    
    const nameRef = createRef();
    const linkRef = createRef()

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onAddPlace({
            name:   nameRef.current.value, 
            link:   linkRef.current.value
        })
      } 

return (
    <PopupWithForm  isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} 
                    name='add-card' title={"Новое место"} buttonText={"Создать"}>
        <fieldset className="popup__set">
            <label className="popup__form-field">
                <input  className="popup__input popup__input_type_name" id="place-input" type="text" 
                        name="name" placeholder="Название" required minLength="2" maxLength="30"
                        ref={nameRef}/>
                <span className="popup__input-error place-input-error"></span>
            </label>
            <label className="popup__form-field">
                <input  className="popup__input popup__input_type_job" id="url-input" type="url" 
                        name="link" placeholder="Ссылка на картинку" required
                        ref={linkRef}/>
                <span className="popup__input-error url-input-error"></span>
            </label>
        </fieldset>
    </PopupWithForm>
)
}

export default AddPlacePopup;
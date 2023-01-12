import React from "react";
import {createRef} from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function EditAvatarPopup(props) {
    const fotoRef = createRef()
    
    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar(
           fotoRef.current.value,
        );
      } 

return (
    <PopupWithForm  isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}
                    name='avatar' title={"Обновить аватар"} buttonText={"Сохранить"}>
        <fieldset className="popup__set">
            <label className="popup__form-field">
                <input  className="popup__input popup__input_type_name" 
                        id="avatar-input" type="url" name="avatar" 
                        ref={fotoRef} placeholder="Ссылка на картинку" 
                        required/>
                <span className="popup__input-error avatar-input-error"></span>
            </label>
        </fieldset>
    </PopupWithForm>
)
}

export default EditAvatarPopup;
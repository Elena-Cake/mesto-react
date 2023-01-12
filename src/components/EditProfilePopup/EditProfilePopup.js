import React from "react";
import {useState, useEffect} from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { CurrentUserContext } from '../CurrentUserContext';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = useState(currentUser.name);
    const [description , setDescription ] = useState(currentUser.about);

    function handleChangeName(e){
        setName(e.target.value)
    }

    function handleChangeDescription(e){
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
          name:     name,
          about:    description,
        });
      }

    useEffect(() => {
        if (props.isOpen) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [props.isOpen, currentUser]); 


    return(
    <PopupWithForm  isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}
                    name='edit' title={"Редактировать профиль"} buttonText={"Сохранить"}>
        <fieldset className="popup__set">
            <label className="popup__form-field">
                <input  onChange={handleChangeName} 
                        className="popup__input popup__input_type_name" 
                        id="place-input" type="text" name="name" 
                        required minLength="2" maxLength="40" 
                        placeholder="Введите имя" value={name}/>
                <span className="popup__input-error place-input-error"></span>
            </label>
            <label className="popup__form-field">
                <input  onChange={handleChangeDescription} 
                        className="popup__input popup__input_type_job" 
                        id="job-input" type="text" name="about" 
                        required  minlength="2" maxlength="200" 
                        placeholder="Чем вы занимаетесь?" value={description}/>
                <span className="popup__input-error url-input-error"></span>
            </label>
        </fieldset>
    </PopupWithForm>
    )
}

export default EditProfilePopup;
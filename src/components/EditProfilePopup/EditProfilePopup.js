import React from "react";
import {useState, useEffect} from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { CurrentUserContext } from '../CurrentUserContext';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = useState('');
    const [description , setDescription ] = useState('');

    const [nameError, setNameError] = useState('')
    const [descriptionError, setDescriptionError] = useState('')

    const [formValid, setFormValid] = useState(false)

    // проверяет ошибки для обозначения валидноти
    useEffect(()=> {
        if(nameError || descriptionError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [ nameError, descriptionError ])

    function handleChangeName(e) {
        setName(e.target.value)
        if (e.target.value.length < 3){
            setNameError(e.target.validationMessage)
        } else {
            setNameError('')
        }
    }

    function handleChangeDescription(e){
        setDescription(e.target.value)
        if (e.target.value.length <= 2 || e.target.value.length >= 200){
            setDescriptionError(e.target.validationMessage)
        } else {
            setDescriptionError('')
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
          name:     name,
          about:    description,
        });
      }

    // дезактивация кнопки при открытии попапа и начальные данные
    useEffect(() => {
        if (props.isOpen) {
            setName(currentUser.name);
            setDescription(currentUser.about);
            setFormValid(false)
        } else {
            setName('');
            setDescription('');
            setNameError('');
            setDescriptionError('');
        }
    }, [props.isOpen, currentUser]); 


    return(
    <PopupWithForm  isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}
                    name='edit' title={"Редактировать профиль"} 
                    buttonText={"Сохранить"} buttonTextLoading={"Сохранение..."}
                    disabledButton={!formValid} isLoading={props.isLoading}>
        <fieldset className="popup__set">
            <label className="popup__form-field">
                <input  onChange={handleChangeName} 
                        className="popup__input popup__input_type_name" 
                        id="place-input" type="text" name="name" 
                        required minLength="2" maxLength="40" 
                        placeholder="Введите имя" value={name}/>
                {(nameError) && 
                    <span className="popup__input-error place-input-error popup__input-error_active">{nameError}</span>}
            </label>
            <label className="popup__form-field">
                <input  onChange={handleChangeDescription} 
                        className="popup__input popup__input_type_job" 
                        id="job-input" type="text" name="about" 
                        required  minLength="2" maxLength="200" 
                        placeholder="Чем вы занимаетесь?" value={description}/>
                {(descriptionError) && 
                    <span className="popup__input-error url-input-error popup__input-error_active">{descriptionError}</span>}
            </label>
        </fieldset>
    </PopupWithForm>
    )
}

export default EditProfilePopup;
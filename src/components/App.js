import React from 'react';
import { useState, useEffect} from 'react';

import '../index.css';

import Header   from './Header/Header'
import Main     from './Main/Main'
import Footer   from './Footer/Footer'

import PopupWithForm from './Main/PopupWithForm.js'

function App() {



//  хук, отвечающий за открытие попапа редактирования аватара
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }

//  хук, отвечающий за открытие попапа редактирования профиля
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }

//  хук, отвечающий за открытие попапа добавления карточки
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

  return (
    <div className="page">
        <Header />
        <Main 
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace ={handleAddPlaceClick}
        />
        <Footer />

        <PopupWithForm isOpen={isEditAvatarPopupOpen} name='avatar' title={"Обновить аватар"} buttonText={"Сохранить"}>
            <fieldset className="popup__set">
                <label className="popup__form-field">
                    <input  className="popup__input popup__input_type_name" id="avatar-input" type="url" 
                            name="avatar" placeholder="Ссылка на картинку" required/>
                    <span className="popup__input-error avatar-input-error"></span>
                </label>
            </fieldset>
        </PopupWithForm>

        <PopupWithForm isOpen={isEditProfilePopupOpen} name='edit' title={"Редактировать профиль"} buttonText={"Сохранить"}>
            <fieldset className="popup__set">
                <label className="popup__form-field">
                    <input  className="popup__input popup__input_type_name" id="place-input" 
                            type="text" name="name" placeholder="Название" required minLength="2" maxLength="30"/>
                    <span className="popup__input-error place-input-error"></span>
                </label>
                <label className="popup__form-field">
                    <input className="popup__input popup__input_type_job" id="url-input" 
                            type="url" name="link" placeholder="Ссылка на картинку" required/>
                    <span className="popup__input-error url-input-error"></span>
                </label>
            </fieldset>
        </PopupWithForm>

        <PopupWithForm isOpen={isAddPlacePopupOpen} name='add-card' title={"Новое место"} buttonText={"Создать"}>
            <fieldset className="popup__set">
                <label className="popup__form-field">
                    <input  className="popup__input popup__input_type_name" id="place-input" type="text" 
                            name="name" placeholder="Название" required minLength="2" maxLength="30"/>
                    <span className="popup__input-error place-input-error"></span>
                </label>
                <label className="popup__form-field">
                    <input  className="popup__input popup__input_type_job" id="url-input" type="url" 
                            name="link" placeholder="Ссылка на картинку" required/>
                    <span className="popup__input-error url-input-error"></span>
                </label>
            </fieldset>
        </PopupWithForm>

 
        <PopupWithForm name='confirmation' title={"Вы уверены?"} buttonText={"Да"}></PopupWithForm>

        <template className="elements__list">
            <div className="element" id="card">
                <img className="element__foto"/>
                <button className="element__btn-trash" type="button" aria-label="Удалить"></button>
                <div className="element__discription">
                    <h2 className="element__name"></h2>
                    <div className="element__like-group">
                        <button className="element__btn-like " type="button" aria-label="Лайк"></button>
                        <p className="element__counter"></p>
                    </div>
                </div>
            </div>
        </template>
     
    </div>
  );
}

export default App;

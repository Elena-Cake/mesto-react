import React from 'react';
import {useState, useEffect} from 'react';

import '../index.css';

import Header       from './Header/Header'
import Main         from './Main/Main'
import Footer       from './Footer/Footer'

import PopupWithForm from './PopupWithForm/PopupWithForm'
import EditProfilePopup from './EditProfilePopup/EditProfilePopup'

import {api}         from '../utils/api'
import ImagePopup    from './ImagePopup/ImagePopup'

import { CurrentUserContext } from './CurrentUserContext'

function App() {
// открытие попапов
    const [isEditAvatarPopupOpen,   setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen,  setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen,     setIsAddPlacePopupOpen] = useState(false);
    const [isOpenCardPopup,         setIsOpenCardPopup] = useState(false);

// данные профиля
    const [currentUser, setCurrentUser] = useState({});

// данные карточек
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState({})

// загрузка профиля и карточек при старте страницы
    useEffect(() => {
        Promise.all([api.startPageProfile(), api.startPageCards()])
        .then(([user, cards]) => {
            setCurrentUser(user)
            setCards(cards)
        })
        .catch((err) => {
            console.log(err); 
        })
    }, [])

// зум карточки
    function handleCardClick(card) {
        setIsOpenCardPopup(true)
        setSelectedCard(card)
    }
    
// открытие попапов
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

// закрытие попапов
    function closeAllPopups() {
        if (isEditAvatarPopupOpen){     setIsEditAvatarPopupOpen(false)}
        if (isEditProfilePopupOpen){    setIsEditProfilePopupOpen(false)} 
        if (isAddPlacePopupOpen){       setIsAddPlacePopupOpen(false)}
        if (isOpenCardPopup){           setIsOpenCardPopup(false)}
    }

// лайк карточки
    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        // Отправляем запрос в API и получаем обновлённые данные карточки
        !isLiked    ? 
        //поставить лайк
            api.sendLike(card._id)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(err); 
            })
                    :
        //убрать лайк
            api.deleteLike(card._id)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(err); 
            })
    }

// удаление карточки
    function handleCardDelete(idCard) {
        api.deleteCard(idCard)
        .then(() => {
            setCards((state) => state.filter(card => card._id!==idCard))
        })
        .catch((err) => {
            console.log(err); 
        })
    }

// обновление профиля
    function handleUpdateUser(profileInfo) {
        api.editUserInfo(profileInfo)
        .then((user)=> {
            setCurrentUser(user)
            closeAllPopups()
        })
    }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
        <Header />
    
        <Main 
            onEditAvatar={handleEditAvatarClick}    onEditProfile={handleEditProfileClick}
            onAddPlace ={handleAddPlaceClick}       
            onClose={closeAllPopups}                
            onCardClick={handleCardClick}           onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}         
            cards={cards}
        ></Main>
        
        <Footer />

        <PopupWithForm  isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} 
                        name='avatar' title={"Обновить аватар"} buttonText={"Сохранить"}>
            <fieldset className="popup__set">
                <label className="popup__form-field">
                    <input  className="popup__input popup__input_type_name" id="avatar-input" type="url" 
                            name="avatar" placeholder="Ссылка на картинку" required/>
                    <span className="popup__input-error avatar-input-error"></span>
                </label>
            </fieldset>
        </PopupWithForm>

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}/> 

        <PopupWithForm  isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} 
                        name='add-card' title={"Новое место"} buttonText={"Создать"}>
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

        <ImagePopup isOpen={isOpenCardPopup} card={selectedCard} onClose={closeAllPopups}/>    
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

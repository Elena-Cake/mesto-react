import React from 'react';
import {useState, useEffect} from 'react';

import '../index.css';

import Header       from './Header/Header'
import Main         from './Main/Main'
import Footer       from './Footer/Footer'

import PopupWithForm from './PopupWithForm/PopupWithForm'
import {api}         from '../utils/api'
import ImagePopup    from './ImagePopup/ImagePopup'

function App() {
// открытие попапов
    const [isEditAvatarPopupOpen,   setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen,  setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen,     setIsAddPlacePopupOpen] = useState(false);
    const [isOpenCardPopup,         setIsOpenCardPopup] = useState(false);

// данные профиля
    const [userName,        setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar,      setUserAvatar] = useState('');

// данные карточек
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState({})

// загрузка профиля и карточек при старте страницы
    useEffect(() => {
        Promise.all([api.startPageProfile(), api.startPageCards()])
        .then(([user, cards]) => {
            setUserName(user.name);
            setUserDescription(user.about);
            setUserAvatar(user.avatar);

            setCards(cards.map((card)=>(
                {
                    _id:    card._id,
                    name:   card.name,
                    link:   card.link,
                    likes:  card.likes.length
                }
            )));
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

  return (
    <div className="page">
        <Header />
        <Main 
            onEditAvatar={handleEditAvatarClick}    onEditProfile={handleEditProfileClick}
            onAddPlace ={handleAddPlaceClick}       
            onClose={closeAllPopups}                onCardClick={handleCardClick}
            userName={userName}                     userDescription={userDescription}  
            userAvatar={userAvatar} 
            cards={cards}
        ><script>console.log(cards);</script></Main>
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

        <PopupWithForm  isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} 
                        name='edit' title={"Редактировать профиль"} buttonText={"Сохранить"}>
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
  );
}

export default App;

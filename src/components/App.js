import React from 'react';
import {useState, useEffect} from 'react';

import '../index.css';

import Header       from './Header/Header'
import Main         from './Main/Main'
import Footer       from './Footer/Footer'

import EditProfilePopup from './EditProfilePopup/EditProfilePopup'
import EditAvatarPopup  from './EditAvatarPopup/EditAvatarPopup'
import AddPlacePopup    from './AddPlacePopup/AddPlacePopup '

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
    function handleEditAvatarClick()    {setIsEditAvatarPopupOpen(true)}
    function handleEditProfileClick()   {setIsEditProfilePopupOpen(true)}
    function handleAddPlaceClick()      {setIsAddPlacePopupOpen(true)}

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
        .catch((err) => {
            console.log(err); 
        })
    }

// обновление аватара
    function handleUpdateAvatar(avatar) {
        api.editUserAvatar(avatar)
        .then((user)=> {
            setCurrentUser(user)
            closeAllPopups()
        })
        .catch((err) => {
            console.log(err); 
        })
    }

// добавление карточки
    function handleAddPlaceSubmit(newCard) {
        api.sendCard(newCard)
        .then((card)=> {
            setCards([card, ...cards]); 
            closeAllPopups()
        })
        .catch((err) => {
            console.log(err); 
        })
    }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
        <Header />
    
        <Main 
            onEditAvatar={handleEditAvatarClick}    onEditProfile={handleEditProfileClick}
            onAddPlace ={handleAddPlaceClick}       onClose={closeAllPopups} 

            onCardClick={handleCardClick}           onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}         
            cards={cards}
        ></Main>
        
        <Footer />


        <EditAvatarPopup isOpen={isEditAvatarPopupOpen}     onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}/> 

        <EditProfilePopup isOpen={isEditProfilePopupOpen}   onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}/> 

        <AddPlacePopup isOpen={isAddPlacePopupOpen}         onClose={closeAllPopups}
                        onAddPlace={handleAddPlaceSubmit}/> 


        <ImagePopup isOpen={isOpenCardPopup} card={selectedCard} onClose={closeAllPopups}/>    
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

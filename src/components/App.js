import React from 'react';
import { useState, useEffect } from 'react';

import '../index.css';

import Header from './Header/Header'
import Main from './Main/Main'
import Footer from './Footer/Footer'

import EditProfilePopup from './EditProfilePopup/EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup/AddPlacePopup '

import { api } from '../utils/api'
import ImagePopup from './ImagePopup/ImagePopup'
import ConfirmationPopup from './ConfirmationPopup/ConfirmationPopup'

import { CurrentUserContext } from '../contexts/CurrentUserContext'

function App() {
    // открытие попапов
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isOpenCardPopup, setIsOpenCardPopup] = useState(false);
    const [isOpenConfirmationPopup, setIsOpenConfirmationPopup] = useState(false);


    // данные профиля
    const [currentUser, setCurrentUser] = useState({});

    // данные карточек
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState({});
    const [idSelectedCard, setIdSelectedCars] = useState('')

    // загрузка данных
    const [isLoadingAvatar, setIsLoadingAvatar] = useState(false)
    const [isLoadingAddPlace, setIsLoadingPlace] = useState(false)
    const [isLoadingProfile, setIsLoadingProfile] = useState(false)
    const [isLoadingConfirmation, setIsLoadingConfirmation] = useState(false)

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
    function handleEditAvatarClick() { setIsEditAvatarPopupOpen(true) }
    function handleEditProfileClick() { setIsEditProfilePopupOpen(true) }
    function handleAddPlaceClick() { setIsAddPlacePopupOpen(true) }

    // закрытие попапов
    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false)
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsOpenCardPopup(false)
        setIsOpenConfirmationPopup(false)
    }

    // лайк карточки
    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        !isLiked ?
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
        setIdSelectedCars(idCard)
        setIsOpenConfirmationPopup(true)
    }

    function handleConfirmationDelete() {
        setIsLoadingConfirmation(true)
        api.deleteCard(idSelectedCard)
            .then(() => {
                setCards((state) => state.filter(card => card._id !== idSelectedCard))
                setIsLoadingConfirmation(false)
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // обновление профиля
    function handleUpdateUser(profileInfo) {
        setIsLoadingProfile(true)
        api.editUserInfo(profileInfo)
            .then((user) => {
                setCurrentUser(user)
                setIsLoadingProfile(false)
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // обновление аватара
    function handleUpdateAvatar(avatar) {
        setIsLoadingAvatar(true)
        api.editUserAvatar(avatar)
            .then((user) => {
                setCurrentUser(user)
                setIsLoadingAvatar(false)
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // добавление карточки
    function handleAddPlaceSubmit(newCard) {
        setIsLoadingPlace(true)
        api.sendCard(newCard)
            .then((card) => {
                setCards([card, ...cards]);
                setIsLoadingPlace(false)
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
                    onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick} onClose={closeAllPopups}

                    onCardClick={handleCardClick} onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    cards={cards}
                ></Main>

                <Footer />

                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar} isLoading={isLoadingAvatar} />
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser} isLoading={isLoadingProfile} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit} isLoading={isLoadingAddPlace} />

                <ImagePopup isOpen={isOpenCardPopup} card={selectedCard} onClose={closeAllPopups} />
                <ConfirmationPopup isOpen={isOpenConfirmationPopup} onClose={closeAllPopups}
                    onConfirmationSubmit={handleConfirmationDelete} isLoading={isLoadingConfirmation} />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;

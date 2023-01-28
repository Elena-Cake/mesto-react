import React from 'react';
import { useState, useEffect } from 'react';

import '../index.css';

import { Route, Routes } from 'react-router-dom';

import Header from './Header/Header'
import Main from './Main/Main'
import Register from './Register/Register'
import Login from './Login/Login'
import Footer from './Footer/Footer'

import EditProfilePopup from './EditProfilePopup/EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup/AddPlacePopup '

import { api } from '../utils/api'
import ImagePopup from './ImagePopup/ImagePopup'

import InfoTooltip from './InfoTooltip/InfoTooltip';

import ConfirmationPopup from './ConfirmationPopup/ConfirmationPopup'

import { CurrentUserContext } from '../contexts/CurrentUserContext'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';

function App() {
    // открытие попапов
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isOpenCardPopup, setIsOpenCardPopup] = useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

    const [isOpenConfirmationPopup, setIsOpenConfirmationPopup] = useState(false);

    // данные профиля
    const [currentUser, setCurrentUser] = useState({});

    // данные карточек
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState({});
    const [idSelectedCard, setIdSelectedCars] = useState('')

    // загрузка данных
    const [isLoading, setIsLoading] = useState(false)
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
        setIsInfoTooltipOpen(false)
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
        api.deleteCard(idCard)
            .then(() => {
                setCards((state) => state.filter(card => card._id !== idCard))
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // удаление карточки - нажатие корзины
    function handleCardDelete(idCard) {
        setIdSelectedCars(idCard)
        setIsOpenConfirmationPopup(true)
    }

    // удаление карточки - запрос после подтверждения
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
                setIsLoading(false)
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
                setIsLoading(false)
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
                setIsLoading(false)
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

                <Routes>
                    <Route path="/" element={
                        <ProtectedRoute
                            component={Main} isSignIn={false}
                            onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick} onClose={closeAllPopups}

                            onCardClick={handleCardClick} onCardLike={handleCardLike}
                            onCardDelete={handleCardDelete}
                            cards={cards}
                        />} />
                    <Route path="/sign-up" element={<Register />} />
                    <Route path="/sign-in" element={<Login />} />
                </Routes>

                <Footer />

                <InfoTooltip isOpen={isInfoTooltipOpen} isSignIn={false} onClose={closeAllPopups} />

                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading} />

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser} isLoading={isLoading} />

                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit} isLoading={isLoading} />


                <ImagePopup isOpen={isOpenCardPopup} card={selectedCard} onClose={closeAllPopups} />
                <ConfirmationPopup isOpen={isOpenConfirmationPopup} onClose={closeAllPopups}
                    onConfirmationSubmit={handleConfirmationDelete} isLoading={isLoadingConfirmation} />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;

import React from 'react';
import { useState, useEffect } from 'react';

import '../index.css';

import { Route, Routes, useNavigate } from 'react-router-dom';

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
import { register, login } from "../utils/auth";
import * as auth from '../utils/auth';

function App() {

    // авторизация и вход
    const [isSignIn, setIsSignIn] = useState(false);
    const navigate = useNavigate();
    const [emailUser, setEmailUser] = useState("");
    const [infoToolText, setInfoToolText] = useState("");

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
    const [isLoadingAvatar, setIsLoadingAvatar] = useState(false)
    const [isLoadingAddPlace, setIsLoadingPlace] = useState(false)
    const [isLoadingProfile, setIsLoadingProfile] = useState(false)
    const [isLoadingConfirmation, setIsLoadingConfirmation] = useState(false)


    function handelRegisterClick(password, email) {
        register({ password, email })
            .then((res) => {
                if (res) {
                    console.log(res)
                    setIsSignIn(true)
                    setInfoToolText('Вы успешно зарегистрировались!')
                    navigate('/sign-in', { replace: true })
                }
            })
            .catch(() => {
                setIsSignIn(false)
            })
            .finally(() => setIsInfoTooltipOpen(true))
    }

    function handelLoginClick(password, email) {
        login({ password, email })
            .then((data) => {
                localStorage.setItem("jwt", data.token);
                setIsSignIn(true);
                setInfoToolText('Успешно!')
                navigate('/', { replace: true });
                setEmailUser(email)
            })
            .catch((res) => {
                if (res === 'Ошибка 401') {
                    setIsInfoTooltipOpen(true);
                    setIsSignIn(false);
                    setInfoToolText("Пользователь не найден. Проверьте почту и пароль.")
                } else if (!res) {
                    setIsSignIn(false)
                }
            })
            .finally(() => setIsInfoTooltipOpen(true))
    }

    // проверка токена
    useEffect(() => {
        if (localStorage.getItem('jwt')) {
            auth.checkToken(localStorage.getItem('jwt'))
                .then((res) => {
                    if (res) {
                        setIsSignIn(true);
                        setEmailUser(res.data.email)
                        navigate("/", { replace: true })
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [])

    useEffect(() => {
        if (isSignIn) {
            pullInitialData()
        }
    }, [isSignIn]);


    // загрузка профиля и карточек при старте страницы
    const pullInitialData = () => {
        Promise.all([api.startPageProfile(), api.startPageCards()])
            .then(([user, cards]) => {
                setCurrentUser(user)
                setCards(cards)
            })
            .catch((err) => {
                console.log(err);
            })
    }

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
    function handleUpdateUser({ values, resetForm }) {
        setIsLoadingProfile(true)
        api.editUserInfo(values)
            .then((user) => {
                setCurrentUser(user)
                setIsLoadingProfile(false)
                closeAllPopups();
                resetForm()
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // обновление аватара
    function handleUpdateAvatar({ values, resetForm }) {
        setIsLoadingAvatar(true)
        api.editUserAvatar(values)
            .then((user) => {
                setCurrentUser(user)
                setIsLoadingAvatar(false)
                closeAllPopups()
                resetForm()
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // добавление карточки
    function handleAddPlaceSubmit({ values, resetForm }) {
        setIsLoadingPlace(true)
        api.sendCard(values)
            .then((card) => {
                setCards([card, ...cards]);
                setIsLoadingPlace(false)
                closeAllPopups()
                resetForm()
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (

        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header emailUser={emailUser} buttonText={1} onButtonClick={true} />

                <Routes>
                    <Route path="/" element={
                        <ProtectedRoute
                            component={Main} isSignIn={isSignIn}
                            onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick} onClose={closeAllPopups}

                            onCardClick={handleCardClick} onCardLike={handleCardLike}
                            onCardDelete={handleCardDelete}
                            cards={cards}
                        />} />
                    <Route path="/sign-up" element={<Register register={handelRegisterClick} />} />
                    <Route path="/sign-in" element={<Login login={handelLoginClick} />} />
                </Routes>

                <Footer />

                <InfoTooltip isOpen={isInfoTooltipOpen} isSignIn={isSignIn} onClose={closeAllPopups} text={infoToolText} />

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

import React from "react";
import PopupWithForm from './PopupWithForm.js'
import Card from './Card'

function Main(props) {
    return (
        <main className="main">
            <section className="profile">
                <button onClick={props.onEditAvatar} className="profile__btn-avatar"></button>
                <img className="profile__avatar" alt="аватар пользователя" src={props.userAvatar}/>
                <div className="profile__container">
                    <h1 className="profile__name">{props.userName}</h1>
                    <p className="profile__job">{props.userDescription}</p>
                    <button onClick={props.onEditProfile} className="profile__btn-edit" type="button" aria-label="открыть окно редактирования профиля"></button>
                </div>
                <button onClick={props.onAddPlace} className="profile__btn-add" type="button" aria-label="добавить место"></button>
            </section>
            <section className="elements" aria-label="Фотографии">
                <div className="photo-cards">
                    {props.cards.map((card) => (
                        <Card   nameCard={card.name} srcCard={card.link} 
                                countLikes={card.likes} key={card._id}/>
                     ))}
                </div>
            </section>
        </main>
    )
}

export default Main;
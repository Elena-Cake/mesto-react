import PopupWithForm from './PopupWithForm.js'

function Main(props) {

    return (
        <main className="main">
            <section className="profile">
                <button onClick={props.onEditAvatar} className="profile__btn-avatar"></button>
                <img className="profile__avatar" alt="аватар пользователя"/>
                <div className="profile__container">
                    <h1 className="profile__name"></h1>
                    <p className="profile__job"></p>
                    <button onClick={props.onEditProfile} className="profile__btn-edit" type="button" aria-label="открыть окно редактирования профиля"></button>
                </div>
                <button onClick={props.onAddPlace} className="profile__btn-add" type="button" aria-label="добавить место"></button>
            </section>
            <section className="elements" aria-label="Фотографии">
                
            </section>
        </main>
    )
}

export default Main;
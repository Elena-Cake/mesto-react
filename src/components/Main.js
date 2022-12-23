import PopupWithForm from './PopupWithForm.js'

function Main() {

    function handleEditAvatarClick() {
        document.querySelector('.popup-avatar').classList.add('popup_opened')
        // return(
        //     <PopupWithForm name='avatar' title={"Обновить аватар"} buttonText={"Сохранить"}/>
        // )
    }

    function handleEditProfileClick() {
        document.querySelector('.popup-edit').classList.add('popup_opened')
        return(
            <PopupWithForm name='edit' title={"Редактировать профиль"} buttonText={"Сохранить"}/>
        )
    }

    function handleAddPlaceClick() {
        return(
            <PopupWithForm name='add-card' title={"Новое место"} buttonText={"Создать"}/>
        )
    }


    return (
        <main className="main">
            <section className="profile">
                <button onClick={handleEditAvatarClick} className="profile__btn-avatar"></button>
                <img className="profile__avatar" alt="аватар пользователя"/>
                <div className="profile__container">
                    <h1 className="profile__name"></h1>
                    <button onClick={handleEditProfileClick} className="profile__btn-edit" type="button" aria-label="открыть окно редактирования профиля"></button>
                    <p className="profile__job"></p>
                </div>
                <button onClick={handleAddPlaceClick} className="profile__btn-add" type="button" aria-label="добавить место"></button>
            </section>
            <section className="elements" aria-label="Фотографии">
                
            </section>
        </main>
    )
}

export default Main;
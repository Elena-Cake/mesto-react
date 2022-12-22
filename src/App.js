import logo from './logo.svg';
import './index.css';
import logoPath from './images/header_logo.svg'

function App() {
  return (
    <div className="page">
        <header className="header">
            <img className="header__logo" src={logoPath} alt="логотип 'Место'"/>
        </header>
        <main className="main">
            <section className="profile">
                <button className="profile__btn-avatar"></button>
                <img className="profile__avatar" alt="аватар пользователя"/>
                <div className="profile__container">
                    <h1 className="profile__name"></h1>
                    <button className="profile__btn-edit" type="button" aria-label="открыть окно редактирования профиля"></button>
                    <p className="profile__job"></p>
                </div>
                <button className="profile__btn-add" type="button" aria-label="добавить место"></button>
            </section>
            <section className="elements" aria-label="Фотографии">
                
            </section>
        </main>
        <footer className="footer">
            <p className="footer__author">&#169; 2020 Mesto Russia</p>
        </footer>
        <div className="popup popup-add-card">
            <div className="popup__container">
                <button className="popup__btn-close" type="button" aria-label="закрыть окно"></button>
                <form className="popup__form" name="addFoto" novalidate>
                    <h3 className="popup__title">Новое место</h3>
                    <fieldset className="popup__set">
                        <label className="popup__form-field">
                            <input className="popup__input popup__input_type_name" id="place-input" 
                                    type="text" name="name" placeholder="Название" required minlength="2" maxlength="30"/>
                            <span className="popup__input-error place-input-error"></span>
                        </label>
                        <label className="popup__form-field">
                            <input className="popup__input popup__input_type_job" id="url-input" 
                                    type="url" name="link" placeholder="Ссылка на картинку" required/>
                            <span className="popup__input-error url-input-error"></span>
                        </label>
                        <button className="popup__btn-save" type="submit">Создать</button>
                    </fieldset>
                </form>
            </div>
        </div>
        <div className="popup popup-edit">
            <div className="popup__container">
                <button className="popup__btn-close" type="button" aria-label="закрыть окно"></button>
                <form className="popup__form" name="editPerconalInfo" novalidate>
                    <h3 className="popup__title">Редактировать профиль</h3>
                    <fieldset className="popup__set">
                        <label className="popup__form-field">
                            <input className="popup__input popup__input_type_name" id="name-input" 
                                    type="text" name="name" placeholder="Введите имя" required  minlength="2" maxlength="40"/>
                            <span className="popup__input-error name-input-error"></span>
                        </label>
                        <label className="popup__form-field">
                            <input className="popup__input popup__input_type_job" id="job-input" 
                                    type="text" name="about" placeholder="Чем вы занимаетесь?" required  
                                    minlength="2" maxlength="200"/>
                            <span className="popup__input-error job-input-error"></span>
                        </label>
                        <button className="popup__btn-save" type="submit">Сохранить</button>
                    </fieldset>
                </form>
            </div>
        </div>
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
        <div className="popup popup-foto">
            <div className="popup__container popup__container_place_foto">
                <img className="popup__foto" src="#" alt="фото"/>
                <button className="popup__btn-close" type="button" aria-label="закрыть окно"></button>
                <h3 className="popup__name"></h3>
            </div>
        </div>
        <div className="popup popup-confirmation">
            <div className="popup__container">
                <button className="popup__btn-close" type="button" aria-label="закрыть окно"></button>
                <form className="popup__form" name="deleteCard" novalidate>
                    <h3 className="popup__title">Вы уверены?</h3>
                        <button className="popup__btn-save" type="submit">Да</button>
                </form>
            </div>
        </div>
        <div className="popup popup-avatar">
            <div className="popup__container">
                <button className="popup__btn-close" type="button" aria-label="закрыть окно"></button>
                <form className="popup__form" name="deleteCard" novalidate>
                    <h3 className="popup__title">Обновить аватар</h3>
                    <fieldset className="popup__set">
                        <label className="popup__form-field">
                            <input className="popup__input popup__input_type_name" id="avatar-input" 
                                  type="url" name="avatar" placeholder="Ссылка на картинку" required/>
                            <span className="popup__input-error avatar-input-error"></span>
                        </label>
                        <button className="popup__btn-save" type="submit">Сохранить</button>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
  );
}

export default App;

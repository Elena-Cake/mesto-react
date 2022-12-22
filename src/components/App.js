
import '../index.css';

import Header   from '../components/Header'
import Main     from '../components/Main'
import Footer   from '../components/Footer'

import PopupWithForm from './PopupWithForm.js'

function App() {

    // const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =  React.useState(false)

    // function handleEditAvatarClick() {
    //     setIsEditAvatarPopupOpen(true)
    // }

  return (
    <div className="page">
        <Header />
        <Main 
            // onEditAvatar={handleEditAvatarClick}
        />
        <Footer />
        <PopupWithForm name='edit' title={"Редактировать профиль"}>
            <fieldset className="popup__set">
                <label className="popup__form-field">
                    <input className="popup__input popup__input_type_name" id="place-input" 
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

<div>
    <label className="popup__form-field">
        <input className="popup__input popup__input_type_name" id="name-input" 
            type="text" name="name" placeholder="Введите имя" required  minLength="2" maxLength="40"/>
        <span className="popup__input-error name-input-error"></span>
    </label>
    <label className="popup__form-field">
        <input className="popup__input popup__input_type_job" id="job-input" 
            type="text" name="about" placeholder="Чем вы занимаетесь?" required  
            minLength="2" maxLength="200"/>
    <span className="popup__input-error job-input-error"></span>
    </label>
</div> 

       
        <form className="popup__form" name="addFoto" noValidate>
            <h3 className="popup__title">Новое место</h3>
            <fieldset className="popup__set">
                <label className="popup__form-field">
                    <input className="popup__input popup__input_type_name" id="place-input" 
                            type="text" name="name" placeholder="Название" required minLength="2" maxLength="30"/>
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
    


        <form className="popup__form popup-editPerconalInfo" name="editPerconalInfo" noValidate>
            <h3 className="popup__title">Редактировать профиль</h3>
            <fieldset className="popup__set">
                <label className="popup__form-field">
                    <input className="popup__input popup__input_type_name" id="name-input" 
                            type="text" name="name" placeholder="Введите имя" required  minLength="2" maxLength="40"/>
                    <span className="popup__input-error name-input-error"></span>
                </label>
                <label className="popup__form-field">
                    <input className="popup__input popup__input_type_job" id="job-input" 
                            type="text" name="about" placeholder="Чем вы занимаетесь?" required  
                            minLength="2" maxLength="200"/>
                    <span className="popup__input-error job-input-error"></span>
                </label>
                <button className="popup__btn-save" type="submit">Сохранить</button>
            </fieldset>
        </form>


        <form className="popup__form" name="deleteCard" noValidate>
            <h3 className="popup__title">Вы уверены?</h3>
                <button className="popup__btn-save" type="submit">Да</button>
        </form>

        <form className="popup__form" name="editAvatar" noValidate>
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
    </div>
  );
}

export default App;

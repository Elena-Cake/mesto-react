
function AuthForm({title, button}) {
    return (
        <div className='form'>
            <h1 className="form__title">{title}</h1>
            <input className="form__input" placeholder="Email"/>
            <input className="form__input" placeholder="Пароль"/>
            <button className="form__btn-save">{button}</button>
        </div>
    )
}

export default AuthForm;
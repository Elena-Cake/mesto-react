import './Register.css' //+form
import { NavLink } from "react-router-dom";

function Register() {
    return (
        <div className="register">
            <div className='form'>
            <h1 className="form__title">Регистрация</h1>
            <input className="form__input"/>
            <input className="form__input"/>
            <button className="form__btn-save">Зарегистрироваться</button>
            </div>
            <NavLink to="/sign-in" className="register__link">
                Уже зарегистрированы? Войти
            </NavLink>
        </div>
    )
}

export default Register;
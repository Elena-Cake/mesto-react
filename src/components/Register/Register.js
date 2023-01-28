import './Register.css' //+form
import { NavLink } from "react-router-dom";
import AuthForm from '../AuthForm/AuthForm';

function Register() {


    return (
        <div className="register">
            <AuthForm title='Регистрация' button='Зарегистрироваться' />
            <NavLink to="/sign-in" className="register__link">
                Уже зарегистрированы? Войти
            </NavLink>
        </div>
    )
}

export default Register;
import logoPath from '../../images/header_logo.svg';

import { Route, Link, Routes } from 'react-router-dom';

function Header({ emailUser, clearToken }) {
    return (
        <header className="header">
            <img className="header__logo" src={logoPath} alt="логотип 'Место'" />
            <div className='header__navbar navbar'>
                <Routes>
                    <Route path="/sign-up" element={
                        <Link to={"/sign-in"} className="navbar__text navbar__text_type_link">Войти</Link>} />
                    <Route path="/sign-in" element={
                        <Link to={"/sign-up"} className="navbar__text navbar__text_type_link">Регистрация</Link>} />
                    <Route path="/" element={
                        <>
                            <p className='navbar__text'>{emailUser}</p>
                            <button className="navbar__text navbar__text_type_link" onClick={clearToken}>Выйти</button>
                        </>} />
                </Routes>
            </div>
        </header>
    )
}

export default Header;
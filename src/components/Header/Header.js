import logoPath from '../../images/header_logo.svg'

function Header() {
    return (
        <header className="header">
            <img className="header__logo" src={logoPath} alt="логотип 'Место'" />
            <div className='header__navbar navbar'>
                <p className='navbar__text navbar__text_type_email'>email</p>
                <p className='navbar__text navbar__text_type_link'>Вход</p>
            </div>
        </header>
    )
}

export default Header;
function InfoTooltip ({isOpen, isSignIn, onClose}) {
    const className = `popup popup-status ${isOpen ? 'popup_opened':''}`
    return (
        <div className={className}>
            <div className="popup__container">
                <button onClick={onClose} className="popup__btn-close" type="button" aria-label="закрыть окно"></button>
                <div className="popup__form">
                    <div className={`popup__status-img ${isSignIn ? 
                        'popup__status-img_type_ok' : 'popup__status-img_type_err' }`}>
                    </div>
                    <p className="popup__status-text" >
                            {isSignIn ? 
                        'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.' }
                    </p>
                </div> 
                
            </div>
        </div>
    )
}

export default InfoTooltip;
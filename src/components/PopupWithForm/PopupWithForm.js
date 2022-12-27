
function PopupWithForm(props) {
    const className = `popup popup-${props.name} ${props.isOpen ? 'popup_opened':''}`
    return (
    <div className={className}>
        <div className="popup__container">
            <button onClick={ props.onClose} className="popup__btn-close" type="button" aria-label="закрыть окно"></button>
            <form className="popup__form" name={props.name}>
                <h3 className="popup__title">{props.title}</h3>
                   {props.children}
                <button className="popup__btn-save" type="submit">{props.buttonText}</button>
            </form> 
        </div>
    </div>
    )
}

export default PopupWithForm;


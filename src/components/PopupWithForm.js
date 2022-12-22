
function PopupWithForm(props) {
    console.log(1)
    return (
    <div className={`popup popup_opened popup-${props.name}`}>
        <div className="popup__container">
            <button className="popup__btn-close" type="button" aria-label="закрыть окно"></button>
            <form className="popup__form" name='editPerconalInfo'>
                <h3 className="popup__title">{props.title}</h3>
                   {props.children}
                <button className="popup__btn-save" type="submit">Сохранить</button>
            </form> 
        </div>
    </div>
    )
}

export default PopupWithForm;


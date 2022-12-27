function ImagePopup(props) {
    return (
        <div className={`popup popup-foto ${props.isOpen ? 'popup_opened':''}`}>
            <div className="popup__container popup__container_place_foto">
                <img className="popup__foto" src={props.card.link} alt={props.card.name}/>
                <button onClick={props.onClose} className="popup__btn-close" type="button" aria-label="закрыть окно"></button>
                <h3 className="popup__name">{props.card.name}</h3>
            </div>
        </div>
    )
}

export default ImagePopup;
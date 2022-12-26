function ImagePopup() {
    return (
        <div className="popup popup-foto">
            <div className="popup__container popup__container_place_foto">
                <img className="popup__foto" src="#" alt="фото"/>
                <button className="popup__btn-close" type="button" aria-label="закрыть окно"></button>
                <h3 className="popup__name"></h3>
            </div>
        </div>
    )
}

export default ImagePopup;
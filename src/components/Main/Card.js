function Card(props) {

    return (
        <div className="element" id="card">
            <img className="element__foto" src={props.srcCard} alt={props.nameCard}/>
            <button className="element__btn-trash" type="button" aria-label="Удалить"></button>
            <div className="element__discription">
                <h2 className="element__name">{props.nameCard}</h2>
                <div className="element__like-group">
                    <button className="element__btn-like" type="button" aria-label="Лайк"></button>
                    <p className="element__counter">{props.countLikes}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;
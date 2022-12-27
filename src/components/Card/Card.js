function Card({card, onCardClick}) {

    function handleCardClick() {
        // передается через мэйн из апп
        onCardClick(card);
    } 

    return (
        <div className="element" key={card._id}>
            <img className="element__foto" src={card.link} alt={card.name}
                 onClick={handleCardClick}/>
            <button className="element__btn-trash" type="button" aria-label="Удалить"></button>
            <div className="element__discription">
                <h2 className="element__name">{card.name}</h2>
                <div className="element__like-group">
                    <button className="element__btn-like" type="button" aria-label="Лайк"></button>
                    <p className="element__counter">{card.likes}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;
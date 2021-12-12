
function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <li className="card">
      <button className="card__del-btn" type="button" aria-label="Кнопка удаления карточки" onClick={props.onDelCardClick}></button>
      <img src={props.card.link} alt={props.card.name} className="card__image" onClick={handleClick}/>
      <div className="card__content">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like-container">
          <button className="card__like" type="button" aria-label="Поставить лайк"></button>
          <p className="card__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
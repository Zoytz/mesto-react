
function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_active' : ''}`}>
      <div className="popup__container">
        <button className="popup__close-btn" type="button" aria-label="Кнопка закрытия попапа" onClick={props.onClose}></button>
        <form onSubmit={props.onSubmit} className={`form form_type_${props.name}`} name={`${props.name}-form`}>
          <h2 className="form__item form__title">{props.title}</h2>
          {props.children}
          <button type="submit" className="form__item form__button" value={props.buttonText} aria-label="Кнопка отправки формы">{props.buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
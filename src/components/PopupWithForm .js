
function PopupWithForm(props) {

  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_active' : ''}`} onClick={props.onClose}>
      <div className="popup__container">
        <button className="popup__close-btn" type="button" aria-label="Кнопка закрытия попапа" onClick={props.onClose}></button>
        <form className={`form form_type_${props.name}`} name={`${props.name}-form`} noValidate>
          <h2 className="form__item form__title">{props.title}</h2>
          {props.children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
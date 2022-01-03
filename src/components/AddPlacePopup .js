import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

  const [placeName, setPlaceName] = React.useState('');
  const [placeLink, setPlaceLink] = React.useState('');

  function handleNameChange(evt) {
    return setPlaceName(evt.target.value);
  }

  function handleLinkChange(evt) {
    return setPlaceLink(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: placeName,
      link: placeLink,
    });
  }

  React.useEffect(() => {
    setPlaceName('');
    setPlaceLink('');
  }, [props.isOpen]);

  return (
    <PopupWithForm onSubmit={handleSubmit} name='card' title='Новое место' isOpen={props.isOpen} onClose={props.onClose} buttonText='Создать'>
      <input value={placeName} onChange={handleNameChange} type="text" className="form__input form__input_type_place-name" name="name" id="place-name" placeholder="Название" minLength="2" maxLength="30" required />
      <span className="form__input-error place-name-error"></span>
      <input value={placeLink} onChange={handleLinkChange} type="url" className="form__input form__input_type_place-image" name="link" id="place-image" placeholder="Ссылка на картинку" required />
      <span className="form__input-error place-image-error"></span>
    </PopupWithForm>
  )
}

export { AddPlacePopup };
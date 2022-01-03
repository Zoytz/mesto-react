import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {

  const userInfo = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState(userInfo.name);
  const [description, setDescription] = React.useState(userInfo.about);

  React.useEffect(() => {
    setName(userInfo.name);
    setDescription(userInfo.about);
  }, [userInfo, props.isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value );
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value );
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} name='profile' title='Редактировать профиль' isOpen={props.isOpen} onClose={props.onClose} buttonText='Сохранить'>
      <input value={`${name}`} onChange={handleNameChange} type="text" className="form__input form__input_type_name " name="name" id="name" minLength="2" maxLength="40" required />
      <span className="form__input-error name-error"></span>
      <input value={`${description}`} onChange={handleDescriptionChange} type="text" className="form__input form__input_type_job" name="about" id="about" minLength="2" maxLength="200" required />
      <span className="form__input-error about-error"></span>
    </PopupWithForm>
  )
}

export { EditProfilePopup };
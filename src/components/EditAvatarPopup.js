import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    });
    inputRef.current.value='';
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} name='avatar' title='Обновить аватар' isOpen={props.isOpen} onClose={props.onClose} buttonText='Сохранить'>
      <input ref={inputRef} type="url" className="form__input form__input_type_avatar" name="avatar" id="avatar" placeholder="Ссылка на картинку" required />
      <span className="form__input-error avatar-error"></span>
    </PopupWithForm>
  )
}

export { EditAvatarPopup };
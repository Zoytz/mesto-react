
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Main from '../components/Main';
import PopupWithForm from '../components/PopupWithForm ';
import ImagePopup from '../components/ImagePopup';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleConfirmClick() {
    setIsConfirmPopupOpen(true);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard({});
  }

  return (
    <>
      <div className="page">
        <div className="page__container">
          <Header />

          <Main onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick} 
                onCardClick={handleCardClick}
                onDelCardClick={handleConfirmClick}
          />

          <Footer />
          <PopupWithForm name='profile' title='Редактировать профиль' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
              <input type="text" className="form__input form__input_type_name " name="name" id="name" minLength="2" maxLength="40" required />
              <span className="form__input-error name-error"></span>
              <input type="text" className="form__input form__input_type_job" name="about" id="about" minLength="2" maxLength="200" required />
              <span className="form__input-error about-error"></span>
              <button type="submit" className="form__item form__button" value="Сохранить" aria-label="Кнопка отправки формы">Сохранить</button>
          </PopupWithForm>
          <PopupWithForm name='card' title='Новое место' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
              <input type="text" className="form__input form__input_type_place-name" name="name" id="place-name" placeholder="Название" minLength="2" maxLength="30" required />
              <span className="form__input-error place-name-error"></span>
              <input type="url" className="form__input form__input_type_place-image" name="link" id="place-image" placeholder="Ссылка на картинку" required />
              <span className="form__input-error place-image-error"></span>
              <button type="submit" className="form__item form__button form__button_disabled" value="Сохранить" aria-label="Кнопка отправки формы" disabled>Создать</button>
          </PopupWithForm>
          <PopupWithForm name='confirm' title='Вы уверены?' isOpen={isConfirmPopupOpen} onClose={closeAllPopups}>
              <button type="submit" className="form__item form__button" value="Да" aria-label="Кнопка отправки формы">Да</button>
          </PopupWithForm>
          <PopupWithForm name='avatar' title='Обновить аватар' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
              <input type="url" className="form__input form__input_type_avatar" name="avatar" id="avatar" placeholder="Ссылка на картинку" required />
              <span className="form__input-error avatar-error"></span>
              <button type="submit" className="form__item form__button form__button_disabled" value="Сохранить" aria-label="Кнопка отправки формы" disabled>Сохранить</button>

          </PopupWithForm>
          <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups}/>
        </div>
      </div>
    </>
  );
}

export default App;

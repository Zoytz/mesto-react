
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Main from '../components/Main';
import PopupWithForm from '../components/PopupWithForm';
import ImagePopup from '../components/ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { EditProfilePopup } from '../components/EditProfilePopup';
import { EditAvatarPopup } from '../components/EditAvatarPopup';
import { AddPlacePopup } from '../components/AddPlacePopup ';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({});

  const [cards, setCards] = React.useState([]);

  

  React.useEffect(() => {
    api.getInitialCards()
      .then((resCards) => {
        setCards(resCards);
      })
      .catch((err) => { console.log('Ошибочка вышла', err) });
  }, [])


  function handleCardLike(card) {

    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (!isLiked) {
      api.setLikeCard(card._id)
      .then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log('Ошибка в handleCardLike', err));
    } else {
      api.delLikeCard(card._id)
      .then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log('Ошибка в handleCardLike', err));
    }

  }

  function handleCardDelete(card) {

    api.deleteCard(card._id)
      .then((res) => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log('Ошибка в handleCardDelete'));
  }

  function handleAddPlaceSubmit(data) {
    api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then((res) => closeAllPopups())
      .catch((err) => console.log('Ошибка в handleAddPlaceSubmit', err));
  }

  React.useEffect(() => {
    api.getUserInfo()
      .then((resUser) => {
        setCurrentUser(resUser)
      })
      .catch((err) => { console.log('Ошибочка вышла', err) });
  }, []);

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

  // function handleConfirmClick() {
  //   setIsConfirmPopupOpen(true);
  // };

  function closeAllPopups() {
      setIsEditAvatarPopupOpen(false);
      setIsEditProfilePopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setIsImagePopupOpen(false);
      setIsConfirmPopupOpen(false);
      setSelectedCard({});

  }

  function handleUpdateUser(data) {
    return api.editUserInfo(data)
      .then((res) => setCurrentUser(res))
      .then((res) => closeAllPopups())
      .catch((err) => console.log('Ошибка в handleUpdateUser'));
  }

  function handleUpdateAvatar(data) {
    return api.editUserAvatar(data)
      .then((res) => setCurrentUser(res))
      .then((res) => closeAllPopups())
      .catch((err) => console.log('Ошибка в handleUpdateAvatar'));
  }


  return (
    <>
      <div className="page">
        <div className="page__container">
          <CurrentUserContext.Provider value={currentUser}>
            <Header />

            <Main onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />

            <Footer />
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>

            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

            <PopupWithForm name='confirm' title='Вы уверены?' isOpen={isConfirmPopupOpen} onClose={closeAllPopups} buttonText='Да'>
            </PopupWithForm>

            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

            <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
          </CurrentUserContext.Provider>
        </div>
      </div>
    </>
  );
}

export default App;

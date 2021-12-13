import React from 'react';
import api from '../utils/Api';
import Card from '../components/Card';

function Main(props) {

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([resUser, resCards]) => {
        setUserName(resUser.name);
        setUserDescription(resUser.about);
        setUserAvatar(resUser.avatar);
        setCards(resCards);
      })
      .catch((err) => { console.log('Ошибочка вышла', err) });
  }, [])

  return (
    <>
      <section className="profile page__profile">
        <div className="profile__avatar-container">
          <img src={userAvatar} alt="Аватар" className="profile__avatar" />
          <button className="profile__avatar-edit-btn" type="button" aria-label="Кнопка редактирования аватара" onClick={props.onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{userName}</h1>
          <button className="profile__edit-button" type="button" aria-label="Кнопка редактирования профиля" onClick={props.onEditProfile}>
          </button>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button className="profile__add-button" type="button" aria-label="Кнопка добавления карточек" onClick={props.onAddPlace}>
        </button>
      </section>
      <section className="elements page__elements">
        <ul className="cards page__list">
          {
            cards.map((card) => {
              return (<Card 
              card={card} 
              key={card._id} 
              onCardClick={props.onCardClick}
              onDelCardClick={props.onDelCardClick}
              />)
            })
          }
        </ul>
      </section>
    </>
  );
}

export default Main;
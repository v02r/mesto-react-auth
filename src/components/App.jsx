import logo from "../images/header-logo.svg"
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import {useState} from "react";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  }
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }

  const handleCardClick = (card) => {
    setSelectedCard(card)
  }
  return (
    <div className="page">
      <Header/>
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer/>

      <PopupWithForm
        title={"Редактировать профиль"}
        name={"edit"}
        onClose={closeAllPopups}
        isOpen={isEditProfilePopupOpen}
        buttonText={"Сохранить"}
      >
        <label className="popup__input-field">
          <input type="text" className="popup__input popup__input_type_name" placeholder="Имя" name="p-name"
                 required minLength="2" maxLength="40"/></label>
        <span id="error-p-name" className="error-message"/>

        <label className="popup__input-field">
          <input type="text" className="popup__input popup__input_type_job" placeholder="Должность" name="p-job"
                 required minLength="2" maxLength="200"/></label>
        <span id="error-p-job" className="error-message"/>
      </PopupWithForm>

      <PopupWithForm
        title={"Новое место"}
        name={"add-mesto"}
        onClose={closeAllPopups}
        isOpen={isAddPlacePopupOpen}
        buttonText={"Создать"}
      >
        <label className="popup__input-field">
          <input type="text" className="popup__input popup__input_type_mesto" placeholder="Название"
                 name="place-name" required minLength="2" maxLength="30"/></label>
        <span id="error-place-name" className="error-message"></span>

        <label className="popup__input-field">
          <input type="url" className="popup__input popup__input_type_link" placeholder="Ссылка на картинку"
                 name="img-link" required/></label>
        <span id="error-img-link" className="error-message"></span>
      </PopupWithForm>

      <section className="popup popup_type_delete" id="popup__delete-confirmation">
        <div className="popup__container">
          <button className="popup__cancel-button" type="button"></button>
          <h2 className="popup__title popup__title-confirm">Вы уверены?</h2>
          <button id="delete-card" className="popup__end-button">Да</button>
        </div>
      </section>

      <PopupWithForm
        title={"Обновить аватар"}
        name={"profile-photo-change"}
        onClose={closeAllPopups}
        isOpen={isEditAvatarPopupOpen}
        buttonText={"Сохранить"}
      >
        <input
          type="url"
          name="avatar"
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_type_link"
          required
        />
        <p data-target="avatar" id="error-avatar" className="error-message"/>
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
    </div>);
}

export default App;

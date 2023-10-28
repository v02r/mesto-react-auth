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
        onCardClick={ handleCardClick}
      />
      <Footer/>

      <PopupWithForm title={"Редактировать профиль"} name={"edit"} onClose={closeAllPopups}
                     isOpen={isEditProfilePopupOpen}>
        <label className="popup__input-field">
          <input type="text" className="popup__input popup__input_type_name" placeholder="Имя" name="p-name"
                 required minLength="2" maxLength="40"/></label>
        <span id="error-p-name" className="error-message"></span>

        <label className="popup__input-field">
          <input type="text" className="popup__input popup__input_type_job" placeholder="Должность" name="p-job"
                 required minLength="2" maxLength="200"/></label>
        <span id="error-p-job" className="error-message"></span>
        <button className="popup__end-button" disabled type="submit">Сохранить</button>
      </PopupWithForm>

      <PopupWithForm title={"Новое место"} name={"add-mesto"} onClose={closeAllPopups} isOpen={isAddPlacePopupOpen}>
        <label className="popup__input-field">
          <input type="text" className="popup__input popup__input_type_mesto" placeholder="Название"
                 name="place-name" required minLength="2" maxLength="30"/></label>
        <span id="error-place-name" className="error-message"></span>

        <label className="popup__input-field">
          <input type="url" className="popup__input popup__input_type_link" placeholder="Ссылка на картинку"
                 name="img-link" required/></label>
        <span id="error-img-link" className="error-message"></span>
        <button className="popup__end-button" disabled type="submit">Создать</button>
      </PopupWithForm>

      {/*<div className="popup popup_type_edit">*/}
      {/*  <div className="popup__container">*/}
      {/*    <button className="popup__cancel-button popup__cancel-button_type_edit" type="button" title="Закрыть окно"/>*/}
      {/*    <h2 className="popup__title">Редактировать профиль</h2>*/}
      {/*    <form className="popup__form" id="formEditProfile" name="formEditProfile" noValidate>*/}
      {/*      <label className="popup__input-field">*/}
      {/*        <input type="text" className="popup__input popup__input_type_name" placeholder="Имя" name="p-name"*/}
      {/*               required minLength="2" maxLength="40"/></label>*/}
      {/*      <span id="error-p-name" className="error-message"></span>*/}

      {/*      <label className="popup__input-field">*/}
      {/*        <input type="text" className="popup__input popup__input_type_job" placeholder="Должность" name="p-job"*/}
      {/*               required minLength="2" maxLength="200"/></label>*/}
      {/*      <span id="error-p-job" className="error-message"></span>*/}
      {/*      <button className="popup__end-button" disabled type="submit">Сохранить</button>*/}
      {/*    </form>*/}
      {/*  </div>*/}
      {/*</div>*/}

      {/*<div className="popup popup_type_add-mesto">*/}
      {/*  <div className="popup__container">*/}
      {/*    <button className="popup__cancel-button popup__cancel-button_type_add" type="button"*/}
      {/*            title="Закрыть окно"></button>*/}
      {/*    <h2 className="popup__title">Новое место</h2>*/}
      {/*    <form className="popup__form" id="formAddMesto" name="formAddmesto" noValidate>*/}
      {/*      <label className="popup__input-field">*/}
      {/*        <input type="text" className="popup__input popup__input_type_mesto" placeholder="Название"*/}
      {/*               name="place-name" required minLength="2" maxLength="30"/></label>*/}
      {/*      <span id="error-place-name" className="error-message"></span>*/}

      {/*      <label className="popup__input-field">*/}
      {/*        <input type="url" className="popup__input popup__input_type_link" placeholder="Ссылка на картинку"*/}
      {/*               name="img-link" required/></label>*/}
      {/*      <span id="error-img-link" className="error-message"></span>*/}
      {/*      <button className="popup__end-button" disabled type="submit">Создать</button>*/}
      {/*    </form>*/}
      {/*  </div>*/}
      {/*</div>*/}

      {/*<div className="popup popup_type_image">*/}
      {/*  <div className="popup__image-container">*/}
      {/*    <button className="popup__cancel-button popup__cancel-button_type_image" type="button" title="Закрыть окно"></button>*/}
      {/*    <img className="popup__image" src="https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg" alt="место"/>*/}
      {/*      <h2 className="popup__title-bigimage"></h2>*/}
      {/*  </div>*/}
      {/*</div>*/}


      <section className="popup popup_type_delete" id="popup__delete-confirmation">
        <div className="popup__container">
          <button className="popup__cancel-button" type="button"></button>
          <h2 className="popup__title popup__title-confirm">Вы уверены?</h2>
          <button id="delete-card" className="popup__end-button">Да</button>
        </div>
      </section>

      <PopupWithForm title={"Обновить аватар"} name={"profile-photo-change"} onClose={closeAllPopups}
                     isOpen={isEditAvatarPopupOpen}>
        <input
          type="url"
          name="avatar"
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_type_link"
          required
        />


        <p data-target="avatar" id="error-avatar" className="error-message"></p>

        <button id="" className="popup__end-button" type="submit">
          Сохранить
        </button>
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

      {/*<section className="popup popup_type_profile-photo-change" id="popup__photo-change">*/}
      {/*  <div className="popup__container">*/}
      {/*    <button className="popup__cancel-button" type="button"></button>*/}
      {/*    <h2 className="popup__title">Обновить аватар</h2>*/}
      {/*    <form*/}
      {/*      className="popup__form popup__info-picture"*/}
      {/*      name="popup picture link"*/}
      {/*      noValidate*/}
      {/*    >*/}
      {/*      <input*/}
      {/*        type="url"*/}
      {/*        name="avatar"*/}
      {/*        placeholder="Ссылка на картинку"*/}
      {/*        className="popup__input popup__input_type_link"*/}
      {/*        required*/}
      {/*      />*/}


      {/*      <p data-target="avatar" id="error-avatar" className="error-message"></p>*/}

      {/*      <button id="" className="popup__end-button" type="submit">*/}
      {/*        Сохранить*/}
      {/*      </button>*/}
      {/*    </form>*/}
      {/*  </div>*/}
      {/*</section>*/}


      {/*<script type="module" src="./index.js"></script>*/}
    </div>);
}

export default App;

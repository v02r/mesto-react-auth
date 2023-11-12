import logo from "../images/header-logo.svg"
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import {useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import {api} from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});

    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getInitialCards()
            .then((res) => {
                setCards(res);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }, []);

    useEffect(() => {
        api.getUserInfo()
            .then((userData) => {
                setCurrentUser(userData);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }, []);

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

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        if( isLiked ) {
            api.unlikeCard(card._id, !isLiked).then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            }).catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
        } else {
            api.likeCard(card._id, !isLiked).then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            }).catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
        }
    }

    function handleCardDelete(id) {
        api.deleteCard(id)
            .then(() => {
                setCards((cards) => cards.filter((card) => card._id !== id));
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }

    function handleUpdateUser(data) {
        api.editUserInfo(data)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }

    function handleUpdateAvatar(data) {
        api.editAvatar(data.avatar)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }

    function handleAddPlaceSubmit (data) {
        api
            .addCard(data.name, data.link)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    }


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header/>
                <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    cards={cards}
                    onCardDelete={handleCardDelete}
                />
                <Footer/>

                <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />

                <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />

                <section className="popup popup_type_delete" id="popup__delete-confirmation">
                    <div className="popup__container">
                        <button className="popup__cancel-button" type="button"></button>
                        <h2 className="popup__title popup__title-confirm">Вы уверены?</h2>
                        <button id="delete-card" className="popup__end-button">Да</button>
                    </div>
                </section>

                <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}/>

                <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;

import React, {useEffect, useState} from 'react';
import {api} from "../utils/Api";
import Card from "./Card";

const Main = (props) => {
  const {onEditProfile, onAddPlace, onEditAvatar, onCardClick } = props;
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

  useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

  return (
    <main className="content">

      <section className="profile">
        <div className="profile__profile-info">
          <div className="profile__avatar-button" onClick={onEditAvatar}>
            <img src={userAvatar} alt="фото пофиля Жак-Ив Кусто" className="profile__avatar-image"/>
            <button className="profile__avatar-edit" type="button"></button>
          </div>
          <div className="profile__name-block">
            <div className="profile__edit-info">
              <h1 className="profile__name">{userName}</h1>
              <button className="profile__edit-button" type="button" title="Редактировать профиль" onClick={onEditProfile}></button>
            </div>
            <h2 className="profile__job">{userDescription}</h2>
          </div>
        </div>
        <button className="profile__add-button" type="button" title="Добавить профиль" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        {
          cards.map((card) => (
            <Card card={card} onCardClick={onCardClick}/>
          ))
        }
        {/*<template id="template-element">*/}
          {/*<div className="elements__card">*/}
          {/*  <img className="elements__image" src="#" alt="место"/>*/}
          {/*  <div className="elements__mesto">*/}
          {/*    <h2 className="elements__title"></h2>*/}
          {/*    <div className="elements__title_like-block">*/}
          {/*      <button className="elements__like-button" type="button" title="Нравится"></button>*/}
          {/*      <span*/}
          {/*        className="elements__like-number"*/}
          {/*        aria-label="Количество лайков"></span>*/}
          {/*    </div>*/}
          {/*    <button className="elements__delete-button" type="button" title="Удалить"></button>*/}
          {/*  </div>*/}
          {/*</div>*/}
        {/*</template>*/}
      </section>
    </main>
  );
};

export default Main;

import React from 'react';

const Card = ({card, onCardClick}) => {
  console.log(card);
  const {
    likes,
    _id,
    name,
    link,
    owner,
    createdAt,
  } = card;

  function handleClick() {
    onCardClick(card);
  }


  return (
    <div className="elements__card">
      <img className="elements__image" src={link} alt="место" onClick={handleClick}/>
      <div className="elements__mesto">
        <h2 className="elements__title">{name}</h2>
        <div className="elements__title_like-block">
          <button className="elements__like-button" type="button" title="Нравится"/>
          <span
            className="elements__like-number"
            aria-label="Количество лайков">{likes.length}</span>
        </div>
        <button className="elements__delete-button" type="button" title="Удалить"/>
      </div>
    </div>
  );
};

export default Card;

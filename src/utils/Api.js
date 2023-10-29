class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }


  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
  }

  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
  }

  editAvatar(avatar) {
    return this._request(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      })
    })
  }

  editUserInfo(data) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    })
  }

  addCard(name, link) {
    return this._request(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name, link
      })
    })
  }

  deleteCard(id) {
    return this._request(this._baseUrl + '/cards/' + id, {
      method: 'DELETE',
      headers: this._headers,
    })
  }

  likeCard(id) {
    return this._request(this._baseUrl + '/cards/' + id + '/likes', {
      method: 'PUT',
      headers: this._headers,
    })
  }

  unlikeCard(id) {
    return this._request(this._baseUrl + '/cards/' + id + '/likes', {
      method: 'DELETE',
      headers: this._headers,
    })
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-77',
  headers: {
    authorization: 'e7ff8be3-ef39-402f-a4c6-7e1a28df428f',
    'Content-Type': 'application/json'
  },
});

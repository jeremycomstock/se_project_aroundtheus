export default class Card {
  constructor(cardData, cardSelector, handleImageClick) {
    this._cardSelector = cardSelector;
    this._name = cardData.name;
    this._link = cardData.link;

    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    return this._cardSelector.cloneNode(true);
  }

  _handleLikeButton = () => {
    const likeButton = this._likeButton;
    likeButton.classList.toggle("card__like-button_active");
  };

  _handleDeleteButton = () => {
    this._element.remove();
    this._element = null;
  };

  _setEventListeners() {
    this._likeButton.addEventListener("click", this._handleLikeButton);
    this._deleteButton.addEventListener("click", this._handleDeleteButton);
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({
        name: this._name,
        link: this._link,
      });
    });
  }

  getView() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._cardNameContent = this._element.querySelector(".card__name");

    this._cardImage.setAttribute("src", this._link);
    this._cardImage.setAttribute("alt", this._name);

    this._cardNameContent.textContent = this._name;

    this._setEventListeners();
    return this._element;
  }
}

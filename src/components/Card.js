export default class Card {
  constructor(
    {
      cardData,
      handleImageClick,
      handleDeleteButton,
      handleCardLike,
      handleCardUnlike,
    },
    cardSelector
  ) {
    this._cardSelector = cardSelector;
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id;

    this._handleImageClick = handleImageClick;
    this._handleDeleteButton = handleDeleteButton;
    this._handleCardLike = handleCardLike;
    this._handleCardUnlike = handleCardUnlike;
  }

  _getTemplate() {
    return this._cardSelector.cloneNode(true);
  }

  getId() {
    return this._id;
  }

  removeItem() {
    this._element.remove();
  }

  _handleLikeButton = () => {
    if (!this._likeButton.classList.contains("card__like-button_active")) {
      this._handleCardLike(this._id);
      this._likeButton.classList.add("card__like-button_active");
    } else if (
      this._likeButton.classList.contains("card__like-button_active")
    ) {
      this._handleCardUnlike(this._id);
      this._likeButton.classList.remove("card__like-button_active");
    }
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

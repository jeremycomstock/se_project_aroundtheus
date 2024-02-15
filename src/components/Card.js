export default class Card {
  constructor(
    {
      cardData,

      handleImageClick,
      handleTrashClick,
      handleCardLike,
    },
    cardSelector
  ) {
    this._cardSelector = cardSelector;
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id;

    this._handleImageClick = handleImageClick;
    this._handleTrashClick = handleTrashClick;
    this._handleLikeClick = handleCardLike;
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

  isLiked() {
    return this._isLiked;
  }

  setIsLiked(isLiked) {
    console.log(isLiked, "hello from setisliked");
    this._isLiked = isLiked;
    this._renderLikes();
  }

  _renderLikes() {
    if (this.isLiked()) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });
    this._deleteButton.addEventListener("click", () => {
      this._handleTrashClick(this);
    });
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
    this._renderLikes();
    return this._element;
  }
}

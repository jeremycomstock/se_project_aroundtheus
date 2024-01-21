export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(".modal__close");
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    this.setEventListeners();
  }

  close() {
    this._closeButton.removeEventListener("click", this._handleCloseButton);
    this._popupElement.removeEventListener("click", this._handleClickClose);
    this._popupElement.classList.remove("modal_opened");
  }

  _handleCloseButton = () => {
    this.close();
  };

  _handleClickClose = (e) => {
    if (e.target == this._popupElement) {
      this.close();
    }
  };

  _handleEscClose = (e) => {
    if (e.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._closeButton.addEventListener("click", this._handleCloseButton);
    this._popupElement.addEventListener("click", this._handleClickClose);
    document.addEventListener("keydown", this._handleEscClose);
  }
}

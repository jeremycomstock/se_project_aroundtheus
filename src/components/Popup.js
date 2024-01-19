export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(".modal__close");
  }

  open() {
    //Open the popup
    this._popupElement.classList.add("modal_opened");
    this.setEventListeners();
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
  }

  _handleCloseButton() {
    this.close();
  }

  _handleClickClose() {
    this.close();
  }

  _handleEscClose() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.close();
      }
    });
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
    this._popupElement.addEventListener("click", (e) => {
      if (e.target == this._popupElement) {
        this.close();
      }
    });
    this._popupElement.addEventListener("keydown", this._handleEscClose());
  }
}

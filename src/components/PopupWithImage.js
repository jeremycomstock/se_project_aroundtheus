import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, cardData) {
    super(popupSelector);
    data = cardData;
  }

  open(data) {
    super.open();
    imageElement.src = this._link;
    super.setEventListeners();
  }

  close() {
    this._handleFormSubmit;
    super.close();
    this._popupForm.reset();
  }
}

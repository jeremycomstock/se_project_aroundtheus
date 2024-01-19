export default class Section {
  constructor(items, renderer, gallerySelector) {
    this._items = items;
    this._renderer = renderer;
    this._gallerySelector = gallerySelector;
  }

  renderItems(cardData, cardList) {
    this._items.forEach((cardData) => renderCard(cardData, cardList));
  }

  addItem() {
    this._renderer;
  }
}

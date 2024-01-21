export default class Section {
  constructor({ items, renderer }, gallerySelector) {
    this._items = items;
    this._renderer = renderer;
    this._gallerySelector = gallerySelector;
  }

  renderItems() {
    this._items.forEach((cardData) => this._renderer(cardData));
  }

  addItem(cardData) {
    const cardElement = this._renderer(cardData);
  }
}

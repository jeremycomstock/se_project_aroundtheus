export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((cardData) => {
      this.addItem(cardData);
    });
  }

  addItem(cardData) {
    const cardElement = this._renderer(cardData);
    this._container.prepend(cardElement);
  }
}

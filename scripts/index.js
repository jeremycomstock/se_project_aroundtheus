const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// Elements

const editButton = document.querySelector(".profile__edit-button");
const modalBox = document.querySelector(".modal");
const closeButton = document.querySelector(".modal__close");
const saveButton = modalBox.querySelector(".modal__button");
let modalInputName = modalBox.querySelector("#title");
let modalInputDescription = modalBox.querySelector("#description");
const profile = document.querySelector(".profile");
let profileName = profile.querySelector(".profile__name");
let profileDescription = profile.querySelector(".profile__description");
let cardList = document.querySelector(".gallery__cards");
let cardTemplate = cardList.querySelector("#gallery-template").content;

// Functions

function getCardElement(i) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardName = cardElement.querySelector(".card__name");
  cardImage.setAttribute("src", initialCards[i].link);
  cardImage.setAttribute("alt", initialCards[i].name);
  cardName.textContent = initialCards[i].name;
  cardList.append(cardElement);
  return getCardElement;
}

function handleOpenEditor() {
  modalBox.setAttribute("style", "display: flex");
  modalInputName.value = profileName.textContent;
  modalInputDescription.value = profileDescription.textContent;
}

function handleSaveProfile(e) {
  profileName.textContent = modalInputName.value;
  profileDescription.textContent = modalInputDescription.value;
  e.preventDefault();
}

function handleClosePopup() {
  modalBox.setAttribute("style", "display: none");
}

// Event Handlers

editButton.addEventListener("click", handleOpenEditor);
closeButton.addEventListener("click", handleClosePopup);
saveButton.addEventListener("click", handleSaveProfile);
saveButton.addEventListener("click", handleClosePopup);

// Loops

for (i = 0; i < initialCards.length; i++) {
  getCardElement(i);
}

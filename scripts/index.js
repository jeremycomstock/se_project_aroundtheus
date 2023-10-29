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
const popup = document.querySelector(".modal");
const closeButton = document.querySelector(".modal__close");
const saveButton = popup.querySelector(".modal__button");
const modalInputName = popup.querySelector("#title");
const modalInputDescription = popup.querySelector("#description");
const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");
const cardList = document.querySelector(".gallery__cards");
const cardTemplate = cardList.querySelector("#gallery-template").content;

// Functions

function createCard(i) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardName = cardElement.querySelector(".card__name");
  cardImage.setAttribute("src", initialCards[i].link);
  cardImage.setAttribute("alt", initialCards[i].name);
  cardName.textContent = initialCards[i].name;
  return cardElement;
}

function getCardElement(i) {
  const cardElement = createCard(i);
  cardList.append(cardElement);
}

function openPopup() {
  popup.classList.add("modal_opened");
}

function closePopup() {
  popup.classList.remove("modal_opened");
}

function handleOpenEditor() {
  modalInputName.value = profileName.textContent;
  modalInputDescription.value = profileDescription.textContent;
}

function handleSaveProfile(e) {
  profileName.textContent = modalInputName.value;
  profileDescription.textContent = modalInputDescription.value;
  popup.classList.remove("modal_opened");
}

// Event Handlers

editButton.addEventListener("click", openPopup);
editButton.addEventListener("click", handleOpenEditor);
closeButton.addEventListener("click", closePopup);
saveButton.addEventListener("click", handleSaveProfile);

// Loops

for (i = 0; i < initialCards.length; i++) {
  getCardElement(i);
}

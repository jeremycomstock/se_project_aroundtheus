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

const editButton = document.querySelector(".profile__edit-button");
const modalBox = document.querySelector(".modal");
const closeButton = document.querySelector(".modal__close");
const saveButton = modalBox.querySelector(".modal__button");
let modalInputName = modalBox.querySelector("#title");
let modalInputDescription = modalBox.querySelector("#description");
const profile = document.querySelector(".profile");
let profileName = profile.querySelector(".profile__name");
let profileDescription = profile.querySelector(".profile__description");

function openEditor() {
  modalBox.setAttribute("style", "display: flex");
  modalInputName.value = profileName.textContent;
  modalInputDescription.value = profileDescription.textContent;
}

function saveProfile(e) {
  profileName.textContent = modalInputName.value;
  profileDescription.textContent = modalInputDescription.value;
  e.preventDefault();
}

function closePopup() {
  modalBox.setAttribute("style", "display: none");
}

editButton.addEventListener("click", openEditor);
closeButton.addEventListener("click", closePopup);
saveButton.addEventListener("click", saveProfile);
saveButton.addEventListener("click", closePopup);

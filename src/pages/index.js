// ! ||--------------------------------------------------------------------------------||
// ! ||                                    Imports                                     ||
// ! ||--------------------------------------------------------------------------------||

import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupConfirmation from "../components/PopupConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import Constants from "../utils/constants.js";
import Api from "../components/Api.js";

// ! ||--------------------------------------------------------------------------------||
// ! ||                                      API                                       ||
// ! ||--------------------------------------------------------------------------------||

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "7d9b26b0-78d0-422a-941a-09c95ea2b082",
    "Content-Type": "application/json",
  },
});

api
  .getUserInfo()
  .then((userData) => {
    profileInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
    });
    profileInfo.updateAvatar(userData.avatar);
  })
  .catch(api.processError);

function handleUpdateProfile(userData) {
  api
    .updateProfile(userData)
    .then((userData) => {
      profileInfo.setUserInfo({
        name: userData.name,
        description: userData.about,
      });
    })
    .catch(api.processError);
}

function handleUpdateAvatar(userData) {
  api.updateAvatar(userData);
  profileInfo.updateAvatar(userData.avatar);
}

// ! ||--------------------------------------------------------------------------------||
// ! ||                               Declared Variables                               ||
// ! ||--------------------------------------------------------------------------------||

// Profile Elements
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
// Edit Modal Elements
const editPopup = document.querySelector(".modal_type_edit");

const profileForm = document.forms["profile-form"];

const modalInputName = editPopup.querySelector("#name");
const modalInputDescription = editPopup.querySelector("#description");
// Avatar Modal Elements
const avatar = document.querySelector(".profile__avatar");
const avatarOverlay = document.querySelector(".profile__avatar-overlay");
const avatarPopup = document.querySelector(".modal_type_avatar");
const modalInputAvatar = avatarPopup.querySelector("#avatar-link");
const avatarForm = document.forms["avatar-form"];
// Card Modal Elements
const cardForm = document.forms["card-form"];
// Card List Elements
const cardList = document.querySelector(".gallery__cards");
const cardTemplate = cardList
  .querySelector("#gallery-template")
  .content.querySelector(".card");

// ! ||--------------------------------------------------------------------------------||
// ! ||                                 Card Functions                                 ||
// ! ||--------------------------------------------------------------------------------||

function handleImageClick(cardData) {
  imagePopup.open(cardData);
}

const handleTrashClick = (card) => {
  confirmDeletePopup.open();
  confirmDeletePopup.setConfirmAction(() => {
    const id = card.getId();
    confirmDeletePopup.renderLoading();
    api
      .removeCard(id)
      .then(() => {
        confirmDeletePopup.close();
        card.removeItem();
      })
      .catch(api.processError)
      .finally(() => {
        confirmDeletePopup.endLoading();
      });
  });
};

const handleCardLike = (card) => {
  if (card.isLiked()) {
    api
      .dislikeCard(card._id)
      .then((res) => card.setIsLiked(res.isLiked))
      .catch(api.processError);
  } else {
    api
      .likeCard(card._id)
      .then((res) => card.setIsLiked(res.isLiked))
      .catch(api.processError);
  }
};

// ! ||--------------------------------------------------------------------------------||
// ! ||                                 Event Listeners                                ||
// ! ||--------------------------------------------------------------------------------||

editButton.addEventListener("click", () => {
  const { name, description } = profileInfo.getUserInfo();
  modalInputName.value = name;
  modalInputDescription.value = description;
  editProfilePopup.open();
});

avatarOverlay.addEventListener("click", () => {
  updateAvatarPopup.open();
});

// ! ||--------------------------------------------------------------------------------||
// ! ||                               Class Instantiation                              ||
// ! ||--------------------------------------------------------------------------------||

const constants = new Constants();

const editFormValidator = new FormValidator(
  constants.validationSettings,
  profileForm
);
const addFormValidator = new FormValidator(
  constants.validationSettings,
  cardForm
);

const avatarFormValidator = new FormValidator(
  constants.validationSettings,
  avatarForm
);

const profileInfo = new UserInfo({
  name: ".profile__name",
  description: ".profile__description",
  avatar: ".profile__avatar",
});

const editProfilePopup = new PopupWithForm("#edit-popup", handleUpdateProfile);

const updateAvatarPopup = new PopupWithForm(
  "#avatar-popup",
  handleUpdateAvatar
);

const confirmDeletePopup = new PopupConfirmation("#delete-popup");

const imagePopup = new PopupWithImage("#preview-image-popup");

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();

// ! ||--------------------------------------------------------------------------------||
// ! ||                                Gallery Creation                                ||
// ! ||--------------------------------------------------------------------------------||

let cardGallery;

api
  .getInitialCards()
  .then((cards) => {
    cardGallery = new Section(
      { items: cards, renderer: renderCard },
      ".gallery__cards"
    );
    cardGallery.renderItems();
  })
  .catch(api.processError);

function renderCard(cardData) {
  const card = new Card(
    {
      cardData,

      handleImageClick,
      handleTrashClick,
      handleCardLike,
    },
    cardTemplate
  );

  return card.getView();
}

function handleAddCard({ title: name, link: link }) {
  newCardPopup.renderLoading();
  api
    .addCard({ name, link })
    .then((data) => {
      newCardPopup.close();
      cardGallery.addItem(data);
    })
    .catch(api.processError)
    .finally(() => {
      newCardPopup.endLoading();
    });
}

const newCardPopup = new PopupWithForm("#new-card-popup", handleAddCard);

addButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  newCardPopup.open();
});

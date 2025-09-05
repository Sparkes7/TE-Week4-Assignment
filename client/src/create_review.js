import { deleteReview, likeReview } from "./app.js";
const reviewsBox = document.getElementById("reviews");

// constructor function in charge of handling the creation of each review
export function CreateReview(
  id,
  name,
  message,
  locationscore,
  valuescore,
  facilitiesscore,
  cleanlinessscore,
  servicescore,
  reviewlikes
) {
  const review = document.createElement("div");
  review.classList.add("review-container");
  const reviewContent = document.createElement("div");
  reviewContent.classList.add("review-content");
  const reviewScores = document.createElement("div");
  reviewScores.classList.add("review-scores");

  const pName = document.createElement("p");
  pName.classList.add("review-name");
  pName.textContent = name;
  reviewContent.appendChild(pName);

  const pMessage = document.createElement("p");
  pMessage.classList.add("review-message");
  pMessage.textContent = message;
  reviewContent.appendChild(pMessage);

  const likesContainer = document.createElement("div");
  likesContainer.classList.add("like-container");

  const pLikes = document.createElement("p");
  pLikes.classList.add("like-number");
  pLikes.textContent = "Likes: " + reviewlikes;
  reviewContent.appendChild(pLikes);

  const likeButton = document.createElement("button");
  likeButton.textContent = "Like Review";
  likeButton.classList.add("review-button");
  likeButton.addEventListener("click", () => {
    likeReview(1, id);
  });
  const dislikeButton = document.createElement("button");
  dislikeButton.textContent = "Dislike Review";
  dislikeButton.classList.add("review-button");
  dislikeButton.addEventListener("click", () => {
    likeReview(-1, id);
  });
  likesContainer.appendChild(pLikes);
  likesContainer.appendChild(likeButton);
  likesContainer.appendChild(dislikeButton);
  reviewContent.appendChild(likesContainer);

  // Location score
  const locScoreGroup = document.createElement("div");
  locScoreGroup.classList.add("score-group");

  // Create Label
  const locLabel = document.createElement("p");
  locLabel.textContent = "Location";
  locLabel.classList.add("score-label");

  // Create Main and Inner Bar
  const locScoreBar = document.createElement("div");
  locScoreBar.classList.add("score-bar");
  const locScoreFilled = document.createElement("div");
  locScoreFilled.classList.add("score-bar-filled");
  locScoreFilled.style.width = locationscore + "0%";
  locScoreBar.appendChild(locScoreFilled);

  // Create Score
  const pLocScore = document.createElement("p");
  pLocScore.textContent = locationscore + "/10";
  pLocScore.classList.add("score-number");

  locScoreGroup.appendChild(locLabel);
  locScoreGroup.appendChild(locScoreBar);
  locScoreGroup.appendChild(pLocScore);

  // value score
  const valScoreGroup = document.createElement("div");
  valScoreGroup.classList.add("score-group");

  // Create Label
  const valLabel = document.createElement("p");
  valLabel.textContent = "Value";
  valLabel.classList.add("score-label");

  // Create Bar and Inner Bar
  const valScoreBar = document.createElement("div");
  valScoreBar.classList.add("score-bar");
  const valScoreFilled = document.createElement("div");
  valScoreFilled.classList.add("score-bar-filled");
  valScoreFilled.style.width = valuescore + "0%";
  valScoreBar.appendChild(valScoreFilled);

  // Create Score Number
  const pValScore = document.createElement("p");
  pValScore.textContent = valuescore + "/10";
  pValScore.classList.add("score-number");

  valScoreGroup.appendChild(valLabel);
  valScoreGroup.appendChild(valScoreBar);
  valScoreGroup.appendChild(pValScore);

  // facilities score
  const facScoreGroup = document.createElement("div");
  facScoreGroup.classList.add("score-group");

  // Create Label
  const facLabel = document.createElement("p");
  facLabel.textContent = "Facilities";
  facLabel.classList.add("score-label");

  // Create Main and Inner Bar
  const facScoreBar = document.createElement("div");
  facScoreBar.classList.add("score-bar");
  const facScoreFilled = document.createElement("div");
  facScoreFilled.classList.add("score-bar-filled");
  facScoreFilled.style.width = facilitiesscore + "0%";
  facScoreBar.appendChild(facScoreFilled);

  // Create Score
  const pFacScore = document.createElement("p");
  pFacScore.textContent = facilitiesscore + "/10";
  pFacScore.classList.add("score-number");

  facScoreGroup.appendChild(facLabel);
  facScoreGroup.appendChild(facScoreBar);
  facScoreGroup.appendChild(pFacScore);

  // cleanliness score
  const cleanScoreGroup = document.createElement("div");
  cleanScoreGroup.classList.add("score-group");

  // Create Label
  const cleanLabel = document.createElement("p");
  cleanLabel.textContent = "Cleanliness";
  cleanLabel.classList.add("score-label");

  // Create Main and Inner Bar
  const cleanScoreBar = document.createElement("div");
  cleanScoreBar.classList.add("score-bar");
  const cleanScoreFilled = document.createElement("div");
  cleanScoreFilled.classList.add("score-bar-filled");
  cleanScoreFilled.style.width = cleanlinessscore + "0%";
  cleanScoreBar.appendChild(cleanScoreFilled);

  // Create Score
  const pCleanScore = document.createElement("p");
  pCleanScore.textContent = cleanlinessscore + "/10";
  pCleanScore.classList.add("score-number");

  cleanScoreGroup.appendChild(cleanLabel);
  cleanScoreGroup.appendChild(cleanScoreBar);
  cleanScoreGroup.appendChild(pCleanScore);

  // Service score

  const servScoreGroup = document.createElement("div");
  servScoreGroup.classList.add("score-group");

  // Create Label
  const servLabel = document.createElement("p");
  servLabel.textContent = "Service";
  servLabel.classList.add("score-label");

  // Create Main and Inner Bar
  const servScoreBar = document.createElement("div");
  servScoreBar.classList.add("score-bar");
  const servScoreFilled = document.createElement("div");
  servScoreFilled.classList.add("score-bar-filled");
  servScoreFilled.style.width = servicescore + "0%";

  servScoreBar.appendChild(servScoreFilled);

  const pServScore = document.createElement("p");
  pServScore.textContent = servicescore + "/10";
  pServScore.classList.add("score-number");

  servScoreGroup.appendChild(servLabel);
  servScoreGroup.appendChild(servScoreBar);
  servScoreGroup.appendChild(pServScore);

  // add all the score groups to the review div
  reviewScores.appendChild(locScoreGroup);
  reviewScores.appendChild(valScoreGroup);
  reviewScores.appendChild(facScoreGroup);
  reviewScores.appendChild(cleanScoreGroup);
  reviewScores.appendChild(servScoreGroup);

  const overallScore = document.createElement("strong");
  overallScore.classList.add("overall-score");
  overallScore.textContent =
    "Overall: " +
    (locationscore +
      valuescore +
      facilitiesscore +
      cleanlinessscore +
      servicescore) /
      5;
  reviewScores.appendChild(overallScore);

  const deleteButton = document.createElement("div");
  deleteButton.classList.add("review-delete");
  deleteButton.textContent = "X";

  deleteButton.addEventListener("click", () => {
    deleteReview(id);
  });

  review.appendChild(reviewContent);
  review.appendChild(reviewScores);
  review.appendChild(deleteButton);
  reviewsBox.prepend(review);
}

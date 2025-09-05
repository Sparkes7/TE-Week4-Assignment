import { CreateReview } from "./create_review.js";

const reviewForm = document.getElementById("review-form");

reviewForm.addEventListener("submit", handleSumbit);

function handleSumbit(e) {
  e.preventDefault();

  const formData = new FormData(reviewForm);
  const formValues = Object.fromEntries(formData);
  reviewForm.reset();
  const reviewlikes = 0; // this isn't data we're collecting, but we want to initialise this as 0 so that it isn't entered as NULL in our database table

  const response = fetch("http://localhost:8080/add-review", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formValues, reviewlikes }),
  });
  setTimeout(initReviews, 500);
}

async function getReviews() {
  try {
    const response = await fetch("http://localhost:8080/reviews");
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("FETCH RESPONSE ERROR: " + error);
  }
}
const reviewsBox = document.getElementById("reviews");
async function initReviews() {
  reviewsBox.innerHTML = "";
  const reviews = await getReviews();
  console.log(reviews);

  for (const review of reviews) {
    new CreateReview(
      review.id,
      review.name,
      review.message,
      review.locationscore,
      review.valuescore,
      review.facilitiesscore,
      review.cleanlinessscore,
      review.servicescore,
      review.reviewlikes
    );
  }
}
initReviews();

export function deleteReview(id) {
  console.log("deleting post: " + id);
  fetch("http://localhost:8080/delete-review", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  setTimeout(initReviews, 500);
}

export async function likeReview(id) {
  console.log("liking post: " + id);
  await fetch("http://localhost:8080/like-review", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
}

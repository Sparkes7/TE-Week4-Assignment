import { CreateReview } from "./create_review.js";

const reviewForm = document.getElementById("review-form");

reviewForm.addEventListener("submit", handleSumbit);

function handleSumbit(e) {
  e.preventDefault();

  const formData = new FormData(reviewForm);
  const formValues = Object.fromEntries(formData);
  reviewForm.reset();

  const response = fetch(
    "https://havenvale-guestbook.onrender.com/add-review",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formValues }),
    }
  );
  response.then(window.location.reload());
}

async function getReviews() {
  try {
    const response = await fetch(
      "https://havenvale-guestbook.onrender.com/reviews"
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("FETCH RESPONSE ERROR: " + error);
  }
}

async function initReviews() {
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
  const response = fetch(
    "https://havenvale-guestbook.onrender.com/delete-review",
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }
  );
  response.then(window.location.reload());
}

export async function likeReview(id) {
  console.log("liking post: " + id);
  fetch("https://havenvale-guestbook.onrender.com/like-review", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
}

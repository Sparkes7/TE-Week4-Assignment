# Reflection

## Requirements

✅🎯 Ensure your HTML form is working and submitting data into the database as expected.

- Done and linked with POST route.

✅🎯 Confirm that your project is functional on multiple screen sizes using either Responsive Design or media queries.

- designed mobile-first. I had a much easier time this time around!

✅🎯 Create a working GET API route in your server.

- GET route pulls all reviews and initialises them to the page

✅🎯 Create a working POST API route in your client.

- POST route added for new reviews

✅🎯 Seed your database with realistic-looking ‘dummy’ data through the Supabase query editor or a seed file in your server. Ensure that this is saved and submitted (in a screenshot or seed file form) so it can be marked and tested efficiently.

- Done. An example of dummy data is in the SQL editor screeshot provided

## Stretch Goals

✅🏹 Provide additional functionality on the form, for example, by adding form validation or other options.

- all fields required are marked as such so NULL data cannot be submitted where we need it. Data types expect the right data, such as email, text, a list of options for the review scores.

✅🏹 Style the page excellently, for example, by adding extra UX considerations or animations.

- colour contrast is suitable and passes checks, hover feedback on the few examples where its needed. required fields are specified with the universal red '\*'. Styling is consistent with colours, font-family and sizes etc.

✅🏹 Add a delete button to each message and a DELETE route in the server.

- Done. Indicated with an "X" in the top right of the reviews.

✅🏹 Create an option for users to like others’ posts.

- Done. Created a PUT route to update the current score by 1

## Constructor functions and keeping code clean!

**The Problem**

For the week 2 and week 3 assignments, both involved a similar `for loop` in that they were pulling data from an object and rendering it to the screen. Within those loops I was also creating the elements to render to the DOM, as well as giving them classes and appending them to the containers they needed to be in etc. This weeks assignment presented the same challenge -> take the API data pulled from our database and render it on the screen.

I initially started doing this exactly like I had done before. I created a function to initialise the reviews to the screen, yet this time because each 'review' had many different parts, the function became more about 'creating the structure' of the review instead of just initialising them, and the function got very large. (over 200 lines!)

**Solution**
I decided to take a different approach for this weeks `for loop`. I wanted to put into practice a type of function that I had learned about called Constructor Functions. Constructors are essentially like a template for an object that we can instantiate and change values based on input parameters.

I separated all of my code responsible for creating the individual elements for a review and put them into one constructor function, then called that function with the `new` keyword to create an instance of that object.

The constructor function alone was over 200 lines of code, so I decided to put the function in it's own .js file and export it, then import it into my main app.js file to call it. This method felt MUCH cleaner and readable when looking through my code as it meant that I didn't have to scroll past over 200 lines of code setting up the DOM elements. If I ever needed to amend anything to do with how each review is created, I can simply go into my `create_review.js` file where everything is contained.

```javascript
async function initReviews() {
  const reviews = await getReviews();
  console.log(reviews);

  //Instantiating a new 'CreateReview' object for each review, and passing in the key values into the constructor
  for (const review of reviews) {
    new CreateReview(
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
```

## Design Principles - Ease of use

When thinking about who would use this website, particularly this page, it's because a user may make a review of their own, but also to serve as a testimony page of sorts for potential customers. In my own experience when looking for campsites, the things that I value to determine if it's right for me are different to other peoples values. For example, I don't particularly care about the campground facilities, as long as it's in a great location, whereas others really depend on these facilities for various reasons. Reviews are very opinionated, and some users looking at campsites often don't care about the ramblings, they just want quick numbers to compare.

For my form i've decided to collect scores of various aspects of the grounds so that I can display those for the customers, who can pick out the data that they want without having to scour the review text if they don't want to. Often times when people are looking for campsites, they have many tabs open and if they can't get a quick 'vibe check' they might just close out. Showing some quick numbers is a good way for a user to engage with the content because at a glance they can see the general consensus. Concluding how to actually show this data served it own challenges, to which you can see my ramblings on below!

## "Score Bars" for the user reviews

**The Challenge**

I got inspiration for 'score bars' next to a review by looking at other websites for rating campsites. A popular website called 'pitchup' has these and I wanted to replicate it.

![score-bars-example](./assignment-extras/score-bars-example.png)

**Solution**

When inspecting the page I could see that each bar had it's width set as a percentage which made replicating this quite simple. By making the rating system out of 10, a score of 10 would be 100%, and therefore a score of 7 would be 70%. Taking the review score and appending "0%" to the end of the value would give me the width size that it would need to be.

I created a `div` to represent the full bar, then placed another `div` inside of it. Since width percentages are relative to its container, I could simply set the inner `div` up to 100% and it would be contained within its parent container.

## Waiting for a fetch request to reload the page

One particular problem that I really stuggled with was trying to automatically refresh the page after a user submits a new post, or if a post is deleted. I tried looking around for solutions and kept finding a `then()` method. To my knowledge reading on this, the `then()` method would wait for the fetch promise to be fulfilled before proceeding with the `then()` method, allowing an order of execution to our functions. In practice, I really struggled to get this to work. Initially I thought it was working because I was seeing the results that I expected on localhost, however after deploying, the page was reloading before the API request was fulfilled and essentially stopping any request due to the page reload

**Solution:**
Due to not being able to get the first idea to work, I went back to basics a little bit and used what I know. I placed a `setTimeout()` function to simply allow some time to pass for the `POST`, `PUT` or `DELETE` requests to go through, before re-initialising my reviews. This has its own problems that i'm aware of, as it wouldn't account for situations where the fetch requests are particularly slow. At this point in my coding journey, having spoke with Manny about a solution, he advised that a timeout at this stage would be the best solution with the tools that I have, as in Week 7 we look at other ways to achieve what I wanted to do.

## CSS Styling

Just a quick note on this - In previous weeks I've noted how although I was getting the results I wanted to in CSS, that I was struggling with organisation. For this assignment, I think i've gotten into the rhythm of things with CSS. For this week's assignment I found the styling process to be much better and I had way less issues getting elements to do the things I wanted.

# Resources

[W3Schools: Constructor Functions](https://www.w3schools.com/js/js_object_constructors.asp)

[Stack Overflow: DELETE method request](https://stackoverflow.com/questions/40284338/javascript-fetch-delete-and-put-requests)

[DELETE method request 2](https://blog.stackademic.com/demystifying-fetch-a-guide-to-get-post-patch-and-delete-da8514f041e4)

[Pitchup: score bar inspiration](https://www.pitchup.com/campsites/England/North_East/North_Yorkshire/Skipton/draughton-heights-campsite/)

[W3Schools: HTML dropdown select option](https://www.w3schools.com/tags/tag_select.asp)

[Stack Overflow: HTML dropdown validation](https://stackoverflow.com/a/44638785)

[Stack Overflow: Updating a column](https://stackoverflow.com/questions/19370088/how-to-add-plus-one-1-to-a-sql-server-column-in-a-sql-query)

[W3Schools: Adding a column to a table using SQL](https://www.w3schools.com/sql/sql_alter.asp)

[W3Schools: Promises, and the "then" function](https://www.w3schools.com/js/js_promise.asp)

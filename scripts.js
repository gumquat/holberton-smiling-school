//perform on load
$(document).ready(function(){
  populateTutorials();
  populateLatest();
});

// Targets 'quote section'
const quoteSection = document.querySelector("#quote-carousel")
// Targets 'loader'
const loader = document.querySelector("#loader");
// Targets 'popular videos section'
const popularVideos = document.querySelector("#popularVideos");
// Targets 'latest videos section'
const latestVideos = document.querySelector("#latestVideos");

$(document).ready(function () { // fetch() quotes on page load
  // populateQuotes if the page is any of the homepages
  console.log(window.location.pathname);
  if (window.location.pathname == "/0-homepage.html" || window.location.pathname == "/1-homepage.html" || window.location.pathname == "/2-homepage.html") {
    loader.classList.remove("d-none");
    populateQuotes();
    //populateTutorials;
  }

  //if the current page is 'pricing.html'
  if (window.location.pathname == "/0-pricing.html" || "/1-pricing.html" || "/2-pricing.html") {
    //remove the 'd-none' class from the loader
    loader.classList.remove("d-none");
  }

});

//FETCH() to reach API below
function populateQuotes() {  // fetch() json text:'quotes' from the given API
  fetch("https://smileschool-api.hbtn.info/quotes")
    .then((response) => response.json()) //convert response to JSON
    .then((quotes) => {
      loader.classList.add("d-none"); // remove d-none from loader
      quoteSection.classList.remove("text-center"); // remove 'text-center' class from quote section

      console.log(quotes); // log to console for QA
      // loop thru 'quotes:text', add them to the page
      quotes.forEach((quote) => {
        // initialize variables for the quote info
        let pic = quote.pic_url;
        let name = quote.name;
        let title = quote.title;
        let text = quote.text;

        // create the carousel-item
        let carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");
        //if the quote id is 1, add class 'active' to the carousel item
        if (quote.id == 1) {
          carouselItem.classList.add("active");
        }
        //create the rest of the carousel items and append them to the webpage
        let carouselRow = document.createElement("div");
        carouselRow.classList.add("row", "mx-auto", "align-items-center");

        let carouselCol = document.createElement("div");
        carouselCol.classList.add("col-12", "col-sm-2", "col-lg-2", "offset-lg-1", "text-center");

        let carouselImg = document.createElement("img");
        carouselImg.classList.add("d-block", "align-self-center", "rounded-circle");
        carouselImg.setAttribute("src", pic);
        carouselImg.setAttribute("alt", `Carousel Pic ${quote.id}`);

        let carouselCol2 = document.createElement("div");
        carouselCol2.classList.add("col-12", "col-sm-7", "offset-sm-2", "col-lg-9", "offset-lg-0");

        let quoteText = document.createElement("div");
        quoteText.classList.add("quote-text");

        let quoteParagraph = document.createElement("p");
        quoteParagraph.classList.add("text-white");
        quoteParagraph.innerHTML = text;

        let personName = document.createElement("h4");
        personName.classList.add("text-white", "font-weight-bold");
        personName.innerHTML = name;

        let personTitle = document.createElement("span");
        personTitle.classList.add("text-white");
        personTitle.innerHTML = title;

        // append all elements to the page, remove the loader
        // Append Quote Section
        quoteSection.appendChild(carouselItem);
        // Append Carousel Formatting & Data
        carouselItem.appendChild(carouselRow);
        carouselRow.appendChild(carouselCol);
        carouselCol.appendChild(carouselImg);
        carouselRow.appendChild(carouselCol2);
        carouselCol2.appendChild(quoteText);
        // Append Quotes
        quoteText.appendChild(quoteParagraph);
        quoteText.appendChild(personName);
        quoteText.appendChild(personTitle);
      });
    })
    .catch((error) => {
      console.log("error", error);
    });
}

//AJAX to reach API below
// Function to populate the tutorials carousel
function populateTutorials() {
  // Make an AJAX call to the tutorials API
  $.ajax({
      // The URL of the API
      url: "https://smileschool-api.hbtn.info/popular-tutorials",
      // The HTTP method to use
      method: "GET",
      // A function to be executed if the AJAX call is successful
      success: function(response){
          // Select the HTML element with the id 'tutorial-carousel'
          const quoteCarousel = $('#tutorial-carousel');
          
          // Iterate over each item in the response array
          response.forEach(function makeCarouselItem(tutorial, index) {
              // Create a new HTML structure for each tutorial
              const card = $('<div>').addClass('card p-3');
              const thumbnail = $('<img>').addClass('card-img-top').attr('src', tutorial['thumb_url']);
              const cardOverlay = $('<div>').addClass('card-img-overlay text-center');
              const playButton = $('<img>').addClass('mx-auto my-auto play-overlay').attr('src', 'images/play.png').attr('width', '64px');
              const cardBody = $('<div>').addClass('card-body');
              const cardTitle = $('<h5>').addClass('card-title font-weight-bold').text(tutorial['title']);
              const cardPrg = $('<p>').addClass('card-text text-muted').text(tutorial['sub-title']);
              const creator = $('<div>').addClass('creator d-flex align-items-center');
              const creatorImg = $('<img>').addClass('rounded-circle').attr('src', tutorial['author_pic_url']).attr('width', '30px');
              const creatorName = $('<h6>').addClass('pl-3 m-0 main-color').text(tutorial['author']);
              const cardFooter = $('<div>').addClass('info pt-3 d-flex justify-content-between');
              const ratingDiv = $('<div>').addClass('rating d-flex');
              // Create a full or empty star image for each rating level
              for(let i = 1; i < 6; i++){
                if(i <= tutorial['star']) {
                    const fullStar = $('<img>').attr('src', 'images/star_on.png').attr('width', '15px').attr('height', '15px');
                    ratingDiv.append(fullStar);
                }
                else {
                    const emptyStar = $('<img>').attr('src', 'images/star_off.png').attr('width', '15px').attr('height', '15px');
                    ratingDiv.append(emptyStar);
                }
              }
              // Create a time element with the tutorial's duration
              const time = $('<span>').addClass('main-color').text(tutorial['duration']);
              
              // Append the rating div and time to the card footer
              cardFooter.append(ratingDiv, time);
              // Append the creator image and name to the creator div
              creator.append(creatorImg, creatorName);
              // Append the title, paragraph, creator, and card footer to the card body
              cardBody.append(cardTitle, cardPrg, creator, cardFooter);
              // Append the play button to the card overlay
              cardOverlay.append(playButton);
              // Append the thumbnail, card overlay, and card body to the card
              card.append(thumbnail, cardOverlay, cardBody);
              // Append the card to the quote carousel
              quoteCarousel.append(card);
          });
          // Initialize the slick carousel with specific settings
          $('#tutorial-carousel').slick({
              slidesToShow: 4,
              slidesToScroll: 1,
              prevArrow: $('.carousel-control-prev'),
              nextArrow: $('.carousel-control-next'),
              responsive: [
                {
                  breakpoint: 775,
                  settings: {
                    slidesToShow: 2
                  }
                },
                {
                  breakpoint: 575,
                  settings: {
                    slidesToShow: 1
                  }
                }
                ]
            });
          // Hide the loading indicator and show the tutorial carousel
          $('#loading-tutorials').addClass('d-none');
          $('#tutorial-carousel').removeClass('d-none');
      },
      // A function to be executed if the AJAX call fails
      error: function() {
          // Display an error message
          alert("Error loading tutorials");
      }
  })
}


// Function to populate the latest videos carousel
function populateLatest() {
  // Make an AJAX call to the latest videos API
  $.ajax({
     // The URL of the API
    url: "https://smileschool-api.hbtn.info/latest-videos",
    // The HTTP method to use
    method: "GET",
    // A function to be executed if the AJAX call is successful
    success: function(response){
        // Select the HTML element with the id 'latest-carousel'
        const quoteCarousel = $('#latest-carousel');
        
        // Iterate over each item in the response array
        response.forEach(function makeCarouselItem(tutorial, index) {
            // Create a new HTML structure for each video
            const card = $('<div>').addClass('card p-3');
            const thumbnail = $('<img>').addClass('card-img-top').attr('src', tutorial['thumb_url']);
            const cardOverlay = $('<div>').addClass('card-img-overlay text-center');
            const playButton = $('<img>').addClass('mx-auto my-auto play-overlay').attr('src', 'images/play.png').attr('width', '64px');
            const cardBody = $('<div>').addClass('card-body');
            const cardTitle = $('<h5>').addClass('card-title font-weight-bold').text(tutorial['title']);
            const cardPrg = $('<p>').addClass('card-text text-muted').text(tutorial['sub-title']);
            const creator = $('<div>').addClass('creator d-flex align-items-center');
            const creatorImg = $('<img>').addClass('rounded-circle').attr('src', tutorial['author_pic_url']).attr('width', '30px');
            const creatorName = $('<h6>').addClass('pl-3 m-0 main-color').text(tutorial['author']);
            const cardFooter = $('<div>').addClass('info pt-3 d-flex justify-content-between');
            const ratingDiv = $('<div>').addClass('rating d-flex');
            // Create a full or empty star image for each rating level
            for(let i = 1; i < 6; i++){
              if(i <= tutorial['star']) {
                  const fullStar = $('<img>').attr('src', 'images/star_on.png').attr('width', '15px').attr('height', '15px');
                  ratingDiv.append(fullStar);
              }
              else {
                  const emptyStar = $('<img>').attr('src', 'images/star_off.png').attr('width', '15px').attr('height', '15px');
                  ratingDiv.append(emptyStar);
              }
            }
            // Create a time element with the video's duration
            const time = $('<span>').addClass('main-color').text(tutorial['duration']);
            
            // Append the rating div and time to the card footer
            cardFooter.append(ratingDiv, time);
            // Append the creator image and name to the creator div
            creator.append(creatorImg, creatorName);
            // Append the title, paragraph, creator, and card footer to the card body
            cardBody.append(cardTitle, cardPrg, creator, cardFooter);
            // Append the play button to the card overlay
            cardOverlay.append(playButton);
            // Append the thumbnail, card overlay, and card body to the card
            card.append(thumbnail, cardOverlay, cardBody);
            // Append the card to the quote carousel
            quoteCarousel.append(card);
        });
        // Initialize the Slick carousel with specific settings
        $('#latest-carousel').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            prevArrow: $('.prev2'),
            nextArrow: $('.next2'),
            responsive: [
              {
                breakpoint: 775,
                settings: {
                  slidesToShow: 2
                }
              },
              {
                breakpoint: 575,
                settings: {
                  slidesToShow: 1
                }
              }
              ]
          });
        // Hide the loading indicator and show the latest videos carousel
        $('#loading-latest').addClass('d-none');
        $('#latest-carousel').removeClass('d-none');
    },
    // A function to be executed if the AJAX call fails
    error: function() {
        // Display an error message
        alert("Error loading tutorials");
    }
})
}


/* TRASHED CODE BELOW */
/*
// fetch() the vids from the given API
function populateVideos(section) { 
  // if the section is 'popular videos' ...
  if (section == popularVideos) {
    fetch("https://smileschool-api.hbtn.info/popular-tutorials") //fetch() from the API
      .then((response) => response.json()) //convert the response to JSON
      .then((videos) => {
        console.log(videos); // log to console for QA

        loader.classList.add("d-none"); // remove 'd-none' from loader
        section.classList.remove("text-center"); // remove text-center from the section

        // loop thru the vids, add them to the webpage
        videos.forEach((video) => {

          // set the variables for the video info
          let videoThumb = video.thumb_url;
          let videoTitle = video.title;
          let subTitle = video.sub-title;
          let authorPic = video.author_pic_url;
          let authorName = video.author;
          let rateStars = video.star;
          let videoDuration = video.duration;

          // create the carousel-item, the first one will be our "active" one
          let carouselItem = document.createElement("div");
          carouselItem.classList.add("carousel-item");
          // if the video id is 1, add the 'active' class to the carousel item
          if (video.id == 1) {
            carouselItem.classList.add("active");
          }
        })

    })
  } else {
    console.log("not popular videos")
  }
}
*/
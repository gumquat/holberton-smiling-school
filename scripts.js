// Targets 'quote section'
const quoteSection = document.querySelector("#quote-carousel")
// Targets 'loader'
const loader = document.querySelector("#loader");
// Targets 'popular videos section'
const popularVideos = document.querySelector("#popularVideos");
// Targets 'latest videos section'
const latestVideos = document.querySelector("#latestVideos");

$(document).ready(function () { // fetch quotes on page load
  // fetchQuotes if the page is index.html
  console.log(window.location.pathname);
  if (window.location.pathname == "/0-homepage.html") {
    loader.classList.remove("d-none");
    fetchQuotes();
    fetchVideos(popularVideos);
    // fetchVideos(latestVideos);
  }

  if (window.location.pathname == "/0-pricing.html") {
    loader.classList.remove("d-none");
    fetchQuotes();
  }

});

function fetchQuotes() {  // Fetch() quotes from the given API
  // add in the loader HERE
  fetch("https://smileschool-api.hbtn.info/quotes")
    .then((response) => response.json())
    .then((quotes) => {
      loader.classList.add("d-none"); // remove the loader & text-center HERE
      quoteSection.classList.remove("text-center");

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

        if (quote.id == 1) {
          carouselItem.classList.add("active");
        }

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
        // quotesection appending
        quoteSection.appendChild(carouselItem);
        // carousel appending
        carouselItem.appendChild(carouselRow);
        carouselRow.appendChild(carouselCol);
        carouselCol.appendChild(carouselImg);
        carouselRow.appendChild(carouselCol2);
        carouselCol2.appendChild(quoteText);
        // quote appending
        quoteText.appendChild(quoteParagraph);
        quoteText.appendChild(personName);
        quoteText.appendChild(personTitle);
      });
    })
    .catch((error) => {
      console.log("error", error);
    });
}

// Fetch() the vids from the given API
function fetchVideos(section) { 
  // check which 'section' is being called
  if (section == popularVideos) {
    fetch("https://smileschool-api.hbtn.info/popular-tutorials")
      .then((response) => response.json())
      .then((videos) => {
        console.log(videos); // log for QA

        loader.classList.add("d-none"); // remove the loader & text-center HERE
        section.classList.remove("text-center");

        // loop thru the vids, add them to the page
        videos.forEach((video) => {

          // set the variables for the video info
          let videoPreview = video.thumb_url;
          let videoTitle = video.title;
          let subTitle = video.sub-title;
          let authorPhoto = video.author_pic_url;
          let authorName = video.author;
          let ratingStars = video.star;
          let videoDuration = video.duration;

          // create the carousel-items, the first one will be active
          let carouselItem = document.createElement("div");
          carouselItem.classList.add("carousel-item");

          if (video.id == 1) {
            carouselItem.classList.add("active");
          }


        })

    })
  } else {
    console.log("not popular videos")
  }
}
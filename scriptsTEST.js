$(document).ready(function(){
  populateQuotes();
  populateTutorials();
  populateLatest();
});

function populateQuotes() {
  $.ajax({
      url: "https://smileschool-api.hbtn.info/quotes",
      method: "GET",
      success: function(response){
          const quoteCarousel = $('#quote-carousel');

          response.forEach(function makeCarouselItem(quote, index) {
              const carouselItem = $('<div>').addClass('carousel-item');
              const rowItem = $('<div>').addClass('row mx-auto align-items-center');
              const picDiv = $('<div>').addClass('col-12 col-sm-2 col-lg-2 offset-lg-1 text-center');
              const quoteImg = $('<img>').addClass('d-block align-self-center').attr('src', quote['pic_url']);
              const quoteDiv = $('<div>').addClass('col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0');
              const quoteTextDiv = $('<div>').addClass('quote-text');
              const quotePrg = $('<p>').addClass('text-white').text(quote['text']);
              const quoteeName = $('<h4>').addClass('text-white font-weight-bold').text(quote['name']);
              const quoteeTitle = $('<span>').addClass('text-white').text(quote['title']);
              
              quoteTextDiv.append(quotePrg, quoteeName, quoteeTitle);
              quoteDiv.append(quoteTextDiv);
              picDiv.append(quoteImg);
              rowItem.append(picDiv, quoteDiv);
              carouselItem.append(rowItem);
              quoteCarousel.append(carouselItem);

              if (index === 0) {
                  carouselItem.addClass('active');
              }
          });
          $('#loading-quotes').addClass('d-none');
          $('#quotes-container').removeClass('d-none');
      },
      error: function() {
          alert("Error loading quotes");
      }
  })
}

function populateTutorials() {
  $.ajax({
      url: "https://smileschool-api.hbtn.info/popular-tutorials",
      method: "GET",
      success: function(response){
          const quoteCarousel = $('#tutorial-carousel');
          

          response.forEach(function makeCarouselItem(tutorial, index) {
              // const carouselItem = $('<div>').addClass('carousel-item');
              // const rowItem = $('<div>').addClass('row align-items-center mx-auto');
              // const colItem = $('<div>').addClass('col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center justify-content-md-end justify-content-lg-center');
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
              const time = $('<span>').addClass('main-color').text(tutorial['duration']);
              
              cardFooter.append(ratingDiv, time); //1
              creator.append(creatorImg, creatorName); //2
              cardBody.append(cardTitle, cardPrg, creator, cardFooter); //3
              cardOverlay.append(playButton); //4
              card.append(thumbnail, cardOverlay, cardBody); //5
              // colItem.append(card); //6
              // rowItem.append(colItem); //7
              // carouselItem.append(rowItem); //8
              quoteCarousel.append(card);//9
              
              // if (index === 0) {
              //     console.log('adding active class');
              //     carouselItem.addClass('active');
              // }
          });
          $('#tutorial-carousel').slick({
              slidesToShow: 4,
              slidesToScroll: 1,
              prevArrow: $('.carousel-control-prev'),
              nextArrow: $('.carousel-control-next'),
              responsive: [
                  {
                    breakpoint: 768,
                    settings: {
                      slidesToShow: 2
                    }
                  },
                  {
                    breakpoint: 576,
                    settings: {
                      slidesToShow: 1
                    }
                  }
                ]
            });
          $('#loading-tutorials').addClass('d-none');
          $('#tutorial-carousel').removeClass('d-none');
      },
      error: function() {
          alert("Error loading tutorials");
      }
  })
}

function populateLatest() {
  $.ajax({
      url: "https://smileschool-api.hbtn.info/latest-videos",
      method: "GET",
      success: function(response){
          // alert('success!')
          const quoteCarousel = $('#latest-carousel');
          

          response.forEach(function makeCarouselItem(tutorial, index) {
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
              const time = $('<span>').addClass('main-color').text(tutorial['duration']);
              
              cardFooter.append(ratingDiv, time); //1
              creator.append(creatorImg, creatorName); //2
              cardBody.append(cardTitle, cardPrg, creator, cardFooter); //3
              cardOverlay.append(playButton); //4
              card.append(thumbnail, cardOverlay, cardBody); //5
              quoteCarousel.append(card);//9
          });
          $('#latest-carousel').slick({
              slidesToShow: 3.99,
              slidesToScroll: 1,
              prevArrow: $('.prev2'),
              nextArrow: $('.next2'),
              responsive: [
                  {
                    breakpoint: 768,
                    settings: {
                      slidesToShow: 2
                    }
                  },
                  {
                    breakpoint: 576,
                    settings: {
                      slidesToShow: 1
                    }
                  }
                ]
            });
          $('#loading-latest').addClass('d-none');
          $('#latest-carousel').removeClass('d-none');
      },
      error: function() {
          alert("Error loading tutorials");
      }
  })
}
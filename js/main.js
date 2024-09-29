//slider

$(document).ready(function () {

  // Step 1: Initialize Owl Carousel first
  var owl = $(".owl-carousel").owlCarousel({
    margin: 10,
    mouseDrag: false,
    loop: true,  // Enable loop to make carousel infinite
    responsive: {
      0: {
        items: 1.1,  // 1.1 items on mobile
      },
      600: {
        items: 2,  // 2 items on tablet
      },
      1000: {
        items: 3.5,  // 3.5 items on desktop
      },
    },
    onInitialized: function() {
      console.log('Owl Carousel initialized');
      // Call other functions after Owl Carousel has been initialized
      initializeOtherElements();  // Step 2: Initialize other components
    },
    onResized: function() {
      // Ensure heights are recalculated when resized
      equalizeHeights();
    }
  });

  // Custom Navigation Events
  $(".custom-next").click(function () {
    owl.trigger("next.owl.carousel");
  });
  $(".custom-prev").click(function () {
    owl.trigger("prev.owl.carousel", [300]);
  });

  // Step 2: Function to load other elements after slider initialization
  function initializeOtherElements() {

    // Event delegation for opening popups
    $(document).on('click', '.popup-trigger', function () {
      // Get the popup id from the data-popup attribute
      var popupId = $(this).data('popup');
      // Show the corresponding popup
      $('#' + popupId).fadeIn();
    });

    // Close popup event
    $(document).on('click', '.close-btn', function () {
      $(this).closest('.service-popup').fadeOut();
    });

    // Equalize heights for service-area elements (if needed)
    function equalizeHeights() {
      var maxHeight = 0;
      $(".service-area").css("height", "auto"); // Reset heights to auto

      // Calculate the maximum height
      $(".service-area").each(function () {
        var thisHeight = $(this).outerHeight();
        if (thisHeight > maxHeight) {
          maxHeight = thisHeight;
        }
      });

      // Set all service-area elements to the maximum height
      $(".service-area").css("height", maxHeight + "px");
    }

    // Run equalizeHeights after Owl Carousel is initialized
    equalizeHeights();

    // Debounce the resize event to improve performance
    function debounce(func, wait) {
      var timeout;
      return function () {
        clearTimeout(timeout);
        timeout = setTimeout(func, wait);
      };
    }

    // Re-run equalizeHeights on window resize with debounce
    $(window).resize(debounce(function () {
      equalizeHeights();
    }, 250));  // 250ms delay
  }


});





document.addEventListener("DOMContentLoaded", function () {
  const video = document.querySelector("#desktop-video");
  const mobileVideo = document.querySelector("#mobile-video");

  if (window.innerWidth <= 768) {
    mobileVideo.load();
  } else {
    video.load();
  }
});

//slider-hero
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// Function to change slide
function changeSlide(direction) {
    slides[currentSlide].classList.remove('active');

    currentSlide += direction;

    // Looping around the slides
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1; // Loop to last slide
    } else if (currentSlide >= totalSlides) {
        currentSlide = 0; // Loop to first slide
    }

    slides[currentSlide].classList.add('active');
    document.querySelector('.slider').style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Auto slide function
function autoSlide() {
    changeSlide(1);
}

// Set interval for auto sliding every 3 seconds
let autoSlideInterval = setInterval(autoSlide, 3000);

// Clear the interval on mouse enter and set it again on mouse leave
document.querySelector('.slider-container').addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

document.querySelector('.slider-container').addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(autoSlide, 9000);
});





//coundown

function countdown() {
  const countDate = new Date("October 14, 2024 00:00:00").getTime();
  const now = new Date().getTime();
  const gap = countDate - now;

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(gap / day);
  const hours = Math.floor((gap % day) / hour);
  const minutes = Math.floor((gap % hour) / minute);
  const seconds = Math.floor((gap % minute) / second);

  // Update numbers
  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;

  // Calculate percentage for stroke-dashoffset
  const daysPercent = (days / 365) * 283;
  const hoursPercent = (hours / 24) * 283;
  const minutesPercent = (minutes / 60) * 283;
  const secondsPercent = (seconds / 60) * 283;

  // Set stroke-dashoffset for each circle
  document.getElementById("days-circle").style.strokeDashoffset =
    283 - daysPercent;
  document.getElementById("hours-circle").style.strokeDashoffset =
    283 - hoursPercent;
  document.getElementById("minutes-circle").style.strokeDashoffset =
    283 - minutesPercent;
  document.getElementById("seconds-circle").style.strokeDashoffset =
    283 - secondsPercent;
}

setInterval(countdown, 1000);

//popup

// Variable to store the name of the clicked button
let clickedButtonName = "";

// Select all elements with the class 'openPopup' and add event listeners to each
document.querySelectorAll(".openPopup").forEach(function (element) {
  element.addEventListener("click", function () {
    // Capture the button name from the data attribute
    clickedButtonName = element.getAttribute("data-button-name");

    // Set the hidden input field value
    document.getElementById("buttonName").value = clickedButtonName;

    // Display the popup form
    document.getElementById("popupForm").style.display = "flex";
  });
});

// Close button within the popup
document
  .querySelector(".popup-content .close-button")
  .addEventListener("click", function () {
    document.getElementById("popupForm").style.display = "none";
  });

// Close the popup when clicking outside the popup content
window.addEventListener("click", function (event) {
  if (event.target === document.getElementById("popupForm")) {
    document.getElementById("popupForm").style.display = "none";
  }
});





//leader slider

var leaderOwl = $(".leader-carousel").owlCarousel({
  loop: true,
  margin: 20,
  autoplay: false,
  responsive: {
    0: {
      items: 2, // Show 2 items on mobile devices
    },
    600: {
      items: 3, // Show 3 items on medium devices
    },
    1000: {
      items: 4, // Show 4 items on larger devices
    },
  },
});






//faq

const accordionItemHeaders = document.querySelectorAll(
  ".accordion-item-header"
);

accordionItemHeaders.forEach((accordionItemHeader) => {
  accordionItemHeader.addEventListener("click", (event) => {
    const currentlyActiveAccordionItemHeader = document.querySelector(
      ".accordion-item-header.active"
    );
    if (
      currentlyActiveAccordionItemHeader &&
      currentlyActiveAccordionItemHeader !== accordionItemHeader
    ) {
      currentlyActiveAccordionItemHeader.classList.toggle("active");
      currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
    }

    accordionItemHeader.classList.toggle("active");
    const accordionItemBody = accordionItemHeader.nextElementSibling;
    if (accordionItemHeader.classList.contains("active")) {
      accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
    } else {
      accordionItemBody.style.maxHeight = 0;
    }
  });
});

//menu

const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
const menuItems = document.querySelectorAll("#menu li a");
const navbar = document.querySelector(".navbar");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("menu-active");
});

// Close the menu and remove fixed position from navbar on mobile
menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      // Mobile screen size check
      menu.classList.remove("menu-active");
      navbar.classList.add("menu-closed"); // Remove fixed position
    }
  });
});

//partner-logo

const track = document.querySelector(".carousel-track");

// Clone the partner-logos for infinite scroll effect
track.innerHTML += track.innerHTML;

// JavaScript for handling popups
document.addEventListener("DOMContentLoaded", function () {
  const popupTriggers = document.querySelectorAll(".popup-trigger");
  popupTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function () {
      const popupId = this.getAttribute("data-popup");
      const popup = document.getElementById(popupId);
      popup.style.display = "flex";
    });
  });

  const closeButtons = document.querySelectorAll(".close-btn");
  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const popup = this.closest(".service-popup");
      popup.style.display = "none";
    });
  });

  const popups = document.querySelectorAll(".service-popup");
  popups.forEach((popup) => {
    popup.addEventListener("click", function (event) {
      if (event.target === popup) {
        popup.style.display = "none";
      }
    });
  });
});

//
$('.menu a[href^="#"]').click(function (e) {
  e.preventDefault();
  var target = this.hash;
  $("html, body").animate(
    {
      scrollTop: $(target).offset().top - 50,
    },
    500
  );
});

//

var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
if (isSafari) {
  document.body.classList.add("safari");
}

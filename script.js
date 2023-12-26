var carousel = {
  target: ".mySlides",
  autoPlay: true,
  currentIndex: 0,
  length: null,
  slideChangeSpeed: 5000,
  intervalId: null,

  changeSlide: function (delta) {
    var target = document.querySelectorAll(this.target);
    var targetLength = target.length;
    this.length = target.length;

    target.forEach(function (slide) {
      slide.classList.remove("active");
    });

    this.currentIndex += delta;

    if (this.currentIndex >= this.length) {
      this.currentIndex = 0;
    } else if (this.currentIndex < 0) {
      this.currentIndex = this.length - 1;
    }

    target[this.currentIndex].classList.add("active");
  },

  updateIndex: function () {
    this.currentIndex >= this.length - 1
      ? (this.currentIndex = 0)
      : (this.currentIndex = this.currentIndex + 1);
  },
};

carousel.changeSlide(0);

if (carousel.autoPlay) {
  carousel.intervalId = setInterval(function () {
    carousel.changeSlide(1);
  }, carousel.slideChangeSpeed);
}

function nextSlide() {
  clearInterval(carousel.intervalId);
  carousel.changeSlide(1);
  carousel.intervalId = setInterval(function () {
    carousel.changeSlide(1);
  }, carousel.slideChangeSpeed);
}

function prevSlide() {
  clearInterval(carousel.intervalId);
  carousel.changeSlide(-1);
  carousel.intervalId = setInterval(function () {
    carousel.changeSlide(1);
  }, carousel.slideChangeSpeed);
}

document.addEventListener("DOMContentLoaded", function() {
  const cards = document.querySelectorAll('.card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, { threshold: 0.5 }); // Adjust the threshold as needed

  const hiddenElements = document.querySelectorAll('.card');
  hiddenElements.forEach((el) => observer.observe(el));

  cards.forEach(card => {
    card.addEventListener('click', function() {
      card.classList.toggle('flipped');
    });
  });
});

function showSlides(className) {
    let slideIndex = 0;
    const slides = document.querySelectorAll(`.${className} img`);
    
    function displaySlide() {
      // Hide all slides
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      
      // Display the current slide
      slideIndex++;
      if (slideIndex > slides.length) {
        slideIndex = 1;
      }
      slides[slideIndex - 1].style.display = "inline";
      
      setTimeout(displaySlide, 3000);
    }
    
    displaySlide();
  }
  showSlides("slideshow-container");
  showSlides("slideshow-container1");
  showSlides("slideshow-container2");
  
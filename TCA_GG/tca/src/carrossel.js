let currentIndex = 1;
  const items = document.querySelectorAll('.carousel-item');
  const totalItems = items.length;

  function moveCarousel(direction) {
    if (currentIndex==0 && direction==-1){currentIndex=totalItems-1}
    currentIndex = (currentIndex + direction) % totalItems;
    const offset = -currentIndex * items[0].offsetWidth;
    document.querySelector('.carousel-content').style.transform = `translateX(${offset}px)`;
  }
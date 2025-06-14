document.addEventListener('DOMContentLoaded', function () {
  initProductSlider();
  initCaseStudiesSlider();
  initBrandLogosRotation();
  initNumberCounters();
});

function initProductSlider() {
  const sliderContainer = document.querySelector(
    '.featured-section .slider-container'
  );
  const productCards = document.querySelectorAll(
    '.featured-section .product-card'
  );
  const prevBtn = document.querySelector('.featured-section .prev-btn');
  const nextBtn = document.querySelector('.featured-section .next-btn');

  let currentIndex = 1;
  const totalProducts = productCards.length;

  function updateSlider() {
    productCards.forEach((card) => {
      card.classList.remove('visible');
      card.classList.remove('active');
    });

    const prevIndex = (currentIndex - 1 + totalProducts) % totalProducts;
    const nextIndex = (currentIndex + 1) % totalProducts;

    productCards[prevIndex].classList.add('visible');
    productCards[currentIndex].classList.add('visible', 'active');
    productCards[nextIndex].classList.add('visible');
  }

  prevBtn.addEventListener('click', () => {
    if (currentIndex - 1 > 0) {
      currentIndex = currentIndex - 1;
      updateSlider();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex + 1 < totalProducts - 1) {
      currentIndex = currentIndex + 1;
      updateSlider();
    }
  });

  updateSlider();

  let touchStartX = 0;
  let touchEndX = 0;

  sliderContainer.addEventListener(
    'touchstart',
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    false
  );

  sliderContainer.addEventListener(
    'touchend',
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    false
  );

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      if (currentIndex + 1 < totalProducts - 1) {
        currentIndex = currentIndex + 1;
        updateSlider();
      }
    }

    if (touchEndX > touchStartX + 50) {
      if (currentIndex - 1 > 0) {
        currentIndex = currentIndex - 1;
        updateSlider();
      }
    }
  }
}

function initCaseStudiesSlider() {
  const sliderTrack = document.querySelector('.case-studies-track');
  const cards = document.querySelectorAll('.case-study-card');
  const prevBtn = document.querySelector('.prev-case');
  const nextBtn = document.querySelector('.next-case');
  const sliderContainer = document.querySelector('.case-studies-slider');

  if (
    !sliderTrack ||
    !cards.length ||
    !prevBtn ||
    !nextBtn ||
    !sliderContainer
  ) {
    return;
  }

  let currentIndex = 0;
  const totalCards = cards.length;
  const visibleCards = 5;
  let isTransitioning = false;
  let autoplayInterval;
  const autoplayDelay = 4000;

  function createClones() {
    for (let i = totalCards - visibleCards; i < totalCards; i++) {
      const clone = cards[i].cloneNode(true);
      clone.classList.add('clone');
      sliderTrack.insertBefore(clone, cards[0]);
    }

    for (let i = 0; i < visibleCards; i++) {
      const clone = cards[i].cloneNode(true);
      clone.classList.add('clone');
      sliderTrack.appendChild(clone);
    }
  }

  if (totalCards > visibleCards) {
    createClones();
  }

  const allCards = document.querySelectorAll('.case-study-card');
  const startIndex = totalCards > visibleCards ? visibleCards + 1 : 1; // İkinci element aktiv olsun
  currentIndex = startIndex;

  updateSliderHeight();

  function updateSliderHeight() {
    let maxHeight = 0;
    cards.forEach((card) => {
      const cardHeight = card.offsetHeight;
      if (cardHeight > maxHeight) {
        maxHeight = cardHeight;
      }
    });
    sliderContainer.style.height = maxHeight + 40 + 'px';
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(() => {
      if (!isTransitioning) {
        nextBtn.click();
      }
    }, autoplayDelay);
  }

  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }

  function setupCardInteractions() {
    allCards.forEach((card, index) => {
      card.classList.add('interactive');

      card.addEventListener('mouseenter', function () {
        stopAutoplay();
        const currentActiveCard = document.querySelector(
          '.case-study-card.active'
        );
        if (currentActiveCard && currentActiveCard !== this) {
          currentActiveCard.classList.remove('active');
        }
        this.classList.add('active');
      });

      card.addEventListener('mouseleave', function () {
        startAutoplay();
        allCards.forEach((c) => c.classList.remove('active'));
        allCards[currentIndex].classList.add('active');
      });
    });
  }

  setupCardInteractions();

  function updateSlider(withTransition = true) {
    if (withTransition) {
      sliderTrack.classList.add('transitioning');
    } else {
      sliderTrack.classList.remove('transitioning');
    }

    allCards.forEach((card) => card.classList.remove('active'));
    if (allCards[currentIndex]) {
      allCards[currentIndex].classList.add('active');
    }

    const cardWidth = allCards[0] ? allCards[0].offsetWidth : 150;
    const expandedWidth = 330;
    const gap = 20;

    let translateX;

    if (totalCards <= visibleCards) {
      translateX = 0;
    } else {
      const activeCardOffset = currentIndex * (cardWidth + gap);
      const centerOffset = sliderContainer.offsetWidth / 2 - expandedWidth / 2;
      translateX = centerOffset - activeCardOffset;
    }

    sliderTrack.style.transform = `translateX(${translateX}px)`;

    if (totalCards > visibleCards && withTransition) {
      setTimeout(() => {
        handleInfiniteLoop();
      }, 300);
    }
  }

  function handleInfiniteLoop() {
    if (totalCards <= visibleCards) return;

    sliderTrack.classList.remove('transitioning');

    if (currentIndex >= allCards.length - visibleCards) {
      currentIndex = visibleCards;
      updateSlider(false);
    } else if (currentIndex < visibleCards) {
      currentIndex = allCards.length - visibleCards - 1;
      updateSlider(false);
    }
  }

  updateSlider(false);

  prevBtn.addEventListener('click', () => {
    if (isTransitioning) return;
    stopAutoplay();
    isTransitioning = true;

    currentIndex--;
    if (totalCards <= visibleCards && currentIndex < 0) {
      currentIndex = totalCards - 1;
    }

    updateSlider(true);

    setTimeout(() => {
      isTransitioning = false;
      startAutoplay();
    }, 300);
  });

  nextBtn.addEventListener('click', () => {
    if (isTransitioning) return;
    stopAutoplay();
    isTransitioning = true;

    currentIndex++;
    if (totalCards <= visibleCards && currentIndex >= totalCards) {
      currentIndex = 0;
    }

    updateSlider(true);

    setTimeout(() => {
      isTransitioning = false;
      startAutoplay();
    }, 300);
  });

  let touchStartX = 0;
  let touchEndX = 0;

  sliderTrack.addEventListener(
    'touchstart',
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    false
  );

  sliderTrack.addEventListener(
    'touchend',
    (e) => {
      if (isTransitioning) return;
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    false
  );

  function handleSwipe() {
    const swipeThreshold = 50;

    if (touchEndX < touchStartX - swipeThreshold) {

      nextBtn.click();
    } else if (touchEndX > touchStartX + swipeThreshold) {

      prevBtn.click();
    }
  }

  sliderContainer.addEventListener('mouseenter', () => {
    stopAutoplay();
  });

  sliderContainer.addEventListener('mouseleave', () => {
    startAutoplay();
  });

  startAutoplay();





  window.addEventListener('resize', () => {
    updateSlider(false);
    updateSliderHeight();
  });
}

function initBrandLogosRotation() {
  const allLogos = Array.from(
    document.querySelectorAll('.brand-logo-container')
  );
  const brandLogosWrapper = document.querySelector('.brand-logos');

  if (!brandLogosWrapper || allLogos.length === 0) return;

  let visibleCount = 4;
  let visibleLogos = allLogos.slice(0, visibleCount);
  let hiddenLogos = allLogos.slice(visibleCount);

  function updateVisibleLogos() {
    brandLogosWrapper.innerHTML = '';

    visibleLogos.forEach((logo) => {
      brandLogosWrapper.appendChild(logo);
    });
  }

  function swapLogos() {
    if (hiddenLogos.length === 0) return;

    const visibleIndex = Math.floor(Math.random() * visibleLogos.length);
    const hiddenIndex = Math.floor(Math.random() * hiddenLogos.length);

    const visibleLogo = visibleLogos[visibleIndex];
    const hiddenLogo = hiddenLogos[hiddenIndex];

    visibleLogos[visibleIndex] = hiddenLogo;
    hiddenLogos[hiddenIndex] = visibleLogo;

    visibleLogo.classList.add('changing');
    hiddenLogo.classList.add('changing');

    updateVisibleLogos();

    setTimeout(() => {
      visibleLogo.classList.remove('changing');
      hiddenLogo.classList.remove('changing');
    }, 500);
  }

  updateVisibleLogos();

  setInterval(swapLogos, 1500);
}

function initNumberCounters() {
  const statValues = [
    { value: 8, unit: '', startFrom: 0 },
    { value: 1.5, unit: 'k', startFrom: 1.0 },
    { value: 82, unit: '', startFrom: 0 },
    { value: 8, unit: 'm', startFrom: 0 },
  ];

  const statBoxes = document.querySelectorAll(
    '.section-best-offers .stat-box h3'
  );

  if (statBoxes.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          statBoxes.forEach((box, index) => {
            animateNumber(box, statValues[index]);
          });
          observer.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );

  const bestOffersSection = document.querySelector('.section-best-offers');
  if (bestOffersSection) {
    observer.observe(bestOffersSection);
  }
}

function animateNumber(element, statInfo) {
  const startValue = statInfo.startFrom;
  const targetValue = statInfo.value;
  const unit = statInfo.unit;

  const duration = 2000;
  const range = targetValue - startValue;
  const increment = range / (duration / 16);

  let currentValue = startValue;
  let startTime = null;

  function updateNumber(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsedTime = timestamp - startTime;

    if (elapsedTime < duration) {
      currentValue = startValue + (increment * elapsedTime) / 16;

      const formattedValue = Number.isInteger(targetValue)
        ? Math.floor(currentValue).toString()
        : currentValue.toFixed(1);

      element.textContent = formattedValue + unit;

      requestAnimationFrame(updateNumber);
    } else {
      element.textContent = Number.isInteger(targetValue)
        ? targetValue.toString() + unit
        : targetValue.toFixed(1) + unit;
    }
  }

  requestAnimationFrame(updateNumber);
}

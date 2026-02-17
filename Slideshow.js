const images = [
  {
    url: 'Logo.jpg',
    alt: 'Kennesaw State University Logo',
    caption: 'KSU Logo',
  },
  {
    url: 'Scrappy.jpg',
    alt: 'KSU mascot',
    caption: 'Scrappy the Owl',
  },
  {
    url: 'BOB.jpg',
    alt: 'KSU transportation',
    caption: 'Big Owl Bus (BOB)',
  },
  {
    url: 'Chevin.png',
    alt: 'Me',
    caption: 'A handsome student from KSU',
  },
  {
    url: 'blank',
    alt: 'Image 5',
    // This image is intentionally left blank to demonstrate error handling
    caption: 'Oops! This image is missing.',
  },
];

let currentIndex = 0;

const imgElement = document.getElementById('current-image');
const captionElement = document.getElementById('caption');
const counterElement = document.getElementById('image-counter');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const thumbnailList = document.getElementById('thumbnail-list');

function loadImage() {
  const currentImage = images[currentIndex];
  imgElement.src = currentImage.url;
  imgElement.alt = currentImage.alt;
  captionElement.textContent = currentImage.caption;
  counterElement.textContent = `Image ${currentIndex + 1} of ${images.length}`;
  updateThumbnails();
}

function updateThumbnails() {
  thumbnailList.innerHTML = '';
  images.forEach((image, index) => {
    const li = document.createElement('li');
    const thumbnail = document.createElement('img');
    thumbnail.src = image.url;
    thumbnail.alt = image.alt;
    li.appendChild(thumbnail);
    li.addEventListener('click', () => {
      currentIndex = index;
      loadImage();
    });
    if (index === currentIndex) {
      li.classList.add('selected');
    }
    thumbnailList.appendChild(li);
  });
}

function prev() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  loadImage();
}

function next() {
  currentIndex = (currentIndex + 1) % images.length;
  loadImage();
}

let autoChangeInterval = setInterval(next, 5000);

function pause() {
  clearInterval(autoChangeInterval);
  autoChangeInterval = setInterval(next, 5000);
}

prevButton.addEventListener('click', () => {
  prev();
  pause();
});

nextButton.addEventListener('click', () => {
  next();
  pause();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    prev();
  } else if (e.key === 'ArrowRight') {
    next();
  }
  pause();
});

imgElement.onerror = () => {
  imgElement.src = 'https://via.placeholder.com/600x400?text=Error+Loading+Image';
  
  imgElement.alt = 'Error loading image';
  captionElement.textContent = 'An error occurred while loading the image.';
  captionElement.style.color = '#FFC629';
};

loadImage();

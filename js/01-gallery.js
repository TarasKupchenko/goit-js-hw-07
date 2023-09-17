import { galleryItems } from './gallery-items.js';
// Change code below this line

const gallery = document.querySelector('.gallery');
let lightboxInstance = null; 
const galleryMarkup = galleryItems
  .map(({ preview, original, description }) => {
    return `
      <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>
    `;
  })
  .join('');

gallery.insertAdjacentHTML('beforeend', galleryMarkup);

gallery.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.classList.contains('gallery__image')) {
    const src = e.target.dataset.source;
    const alt = e.target.alt;

    lightboxInstance = basicLightbox.create(
      `<img src="${src}" alt="${alt}" />`,
      {
        onShow: (instance) => {
          window.addEventListener('keydown', handleKeyDown);
        },
        onClose: (instance) => {
          window.removeEventListener('keydown', handleKeyDown);
        },
      }
    );

    lightboxInstance.show();
  }
});

function handleKeyDown(e) {
  if (e.key === 'Escape') {
    lightboxInstance.close(); 
  }
}

console.log(galleryItems);

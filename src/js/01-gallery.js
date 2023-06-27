// Add imports above this line
import { galleryItems } from './gallery-items';
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

console.log(galleryItems);
const galery = document.querySelector('.gallery')
const markup = galleryItems.map(({ preview, original, description }) => `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="Image ${description}"
    />
  </a>
</li>`)

galery.insertAdjacentHTML('beforeend', markup.join(''));
galery.addEventListener('click', onClick);

function onClick(e) {
  e.preventDefault();
  if (!e.target.classList.contains("gallery__image")) { return; }

  const imgUrl = e.target.dataset.source;
   const instance = basicLightbox.create(`
    <img src="${imgUrl}" width="800" height="600">
`)

  instance.show()
  
  window.addEventListener('keydown', keyPress);

function keyPress(e) {
    if (e.code === 'Escape') {
      instance.close();
      window.removeEventListener('keydown', keyPress);
    }
  }
}
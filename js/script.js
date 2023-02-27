const lightbox = document.querySelector(".gallery-lightbox")
const galleryBox = Array.from(lightbox.querySelectorAll(".gallery-lightbox__box"))
const lightboxPopup = document.querySelector(".gallery-lightbox__popup")
const optionsHeader = document.querySelector(".gallery-lightbox__popup--options")
const optionsLinks = document.querySelectorAll(".option-link")
const fullscreenOption = document.querySelector(".fullscreen")
const downloadOption = lightboxPopup.querySelector(".download")
const zoomOutOption = lightboxPopup.querySelector(".zoom-out")
const zoomInOption = lightboxPopup.querySelector(".zoom-in")
let zoomLevel = 1
let zoomInc = .05;
const fullViewContainer = lightboxPopup.querySelector(".gallery-lightbox__popup--content")
const fullView = lightboxPopup.querySelector(".fullview")
const fullViewCaption = lightboxPopup.querySelector("p")
const leftArrow = lightboxPopup.querySelector(".arrow--left")
const rightArrow = lightboxPopup.querySelector(".arrow--right")
let active = lightbox.querySelector(".gallery-lightbox__box.active")
let nextGallery, prevGallery, galleryDirection, index;

// Function to start the lightbox
const startLightbox = () => {

  const fullSize = active.dataset.fullsize
  const caption = active.dataset.caption
  index = Number(active.dataset.index);

  fullView.innerHTML = `<img src="${fullSize}">`
  fullViewCaption.textContent = caption

  // Options and Zoom
  downloadOption.href = fullSize
  zoomInOption.setAttribute("data-zoom-level", zoomLevel)
  zoomOutOption.setAttribute("data-zoom-level", zoomLevel)

  fullView.style.transform = ""

  // Reseting fullscreen
  fullViewContainer.classList.remove("fullscreen")
  fullView.style.width = ""
  fullView.style.height = ""
}

startLightbox()

// Gallery box
galleryBox.forEach((gallery) => {

  gallery.addEventListener("click", (e) => {
    e.preventDefault()

    if (!gallery.classList.contains("active")) {
      active.classList.remove("active")
    }

    gallery.classList.add("active")
    nextGallery = lightbox.querySelector(".gallery-lightbox__box.active")
    active = lightbox.querySelector(".gallery-lightbox__box.active")

    lightboxPopup.classList.add("active")
    zoomLevel = 1
    startLightbox()
  })

})


// Arrow navigation
rightArrow.addEventListener("click", () => changeGallery("right"))
leftArrow.addEventListener("click", () => changeGallery("left"))

function changeGallery(direction) {

  (direction === "right") ? index++ : index--;
  if (direction === "right" && index >= galleryBox.length) index = 0;
  if (direction === "left" && index < 0) index = galleryBox.length - 1;

  galleryDirection = galleryBox[index]
  active.classList.remove("active")
  galleryDirection.classList.add("active")
  active = lightbox.querySelector(".gallery-lightbox__box.active")

  zoomLevel = 1

  startLightbox()

}

// Prevent page from refreshing
optionsLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
  });
})

// Zooming and out effect
zoomInOption.addEventListener("click", function () {
  zoomLevel += zoomInc

  if (zoomLevel >= 1.4) {
    zoomLevel = zoomLevel - 0.01;
    this.classList.add("disabled")
    return;
  }

  // Updating the zoom in
  this.setAttribute("data-zoom-level", zoomLevel)
  // Updating the zoom out
  zoomOutOption.setAttribute("data-zoom-level", zoomLevel)
  zoomOutOption.classList.remove("disabled")

  // Update the view width
  fullView.style.transform = `scale(${zoomLevel})`

})

zoomOutOption.addEventListener("click", function () {
  zoomLevel -= zoomInc

  if (zoomLevel < 0.6) {
    zoomLevel = zoomLevel + 0.01;
    this.classList.add("disabled")
    return;
  }

  // Updating the zoom in
  this.setAttribute("data-zoom-level", zoomLevel)
  // Updating the zoom out
  zoomInOption.setAttribute("data-zoom-level", zoomLevel)
  zoomInOption.classList.remove("disabled")

  // Update the view width
  fullView.style.transform = `scale(${zoomLevel})`

})


// Fullscreen
fullscreenOption.addEventListener("click", () => {
  const optionsHeaderHeight = optionsHeader.clientHeight
  fullViewContainer.classList.toggle("fullscreen")
  if (fullViewContainer.classList.contains("fullscreen")) {
    fullView.style.width = "100vw"
    fullView.style.height = `calc(100vh - ${optionsHeaderHeight}px)`
    zoomLevel = 1
    fullView.style.transform = `scale(${zoomLevel})`
  } else {
    fullView.style.width = ""
    fullView.style.height = ""
  }

})

// Closing modal
lightboxPopup.addEventListener("mouseup", (e) => {
  const target = e.target
  if (!target.classList.contains("gallery-lightbox__popup")) return;
  lightboxPopup.classList.remove("active")

  // Reseting fullscreen
  fullViewContainer.classList.remove("fullscreen")
  fullView.style.width = ""
  fullView.style.height = ""
})



const imageContainer = document.querySelector('.image-container')
const loader = document.querySelector('.loader')
count = 8

const KEY = 'J5Dfr2vdnpnvQPdxJVlXyiMyxXBUVtaFLGOr42pYu0U'
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${KEY}&count=${count}`

let imagesArray = []

let imageLoadStack = 0

function putImagesOnPage() {
    imagesArray.forEach((image) => {
        const item = document.createElement('a')
        item.setAttribute('href', image.links.html)
        item.setAttribute('target', '_blank')
        item.setAttribute('z-index', '2')
        const containerDiv = document.createElement('div')
        const photo = document.createElement('img')
        photo.setAttribute('src', image.urls.regular)
        item.appendChild(containerDiv)
        containerDiv.appendChild(photo)
        imageContainer.appendChild(item)
        console.log(imageLoadStack)
    })
}

async function getPhotos() {
    if (imageLoadStack === 0) {
    const response = await fetch(apiUrl)
    imagesArray = await response.json()
    imageLoadStack ++
    loader.hidden = true
    putImagesOnPage()
    }
}

window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight && imageLoadStack === 1) {
        imagesArray = []
        imageLoadStack --
        getPhotos()
    }
})

getPhotos()

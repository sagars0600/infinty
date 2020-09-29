const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// api
const count = 30;
const apiKey ='wHtx7aID0JpbLJIpTzBcYdTHbxPAmy7QTjt6_fKeIPY';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images
function imageLoaded(){
   
    imagesLoaded++;
    console.log('imagesLoaded');
   if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}

// helper function
function setAttribute(element , attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key])
    }
}



// create element for links and photos
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    

    photosArray.forEach((photo)=>{
        //create <a> to link
        const item = document.createElement('a');
      
        setAttribute(item, {
            href: photo.links.html,
            target:'_blank',
        });
        //create img
        const img = document.createElement('img');
        setAttribute(img, {
            src:photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        img.addEventListener('load' , imageLoaded)

        //put img in <a>
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}



// get photos
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }catch (error){

    }
}

// check to see if scolling
window.addEventListener('scroll', ()=>{
   if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
       getPhotos();
       ready = false;
   }
});

// onload

getPhotos();
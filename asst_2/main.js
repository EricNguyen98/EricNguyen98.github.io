const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Looping through images */
/*Code from MDN  https://mdn.github.io/learning-area/javascript/building-blocks/gallery/*/

for(let i = 1; i <= 5; i++) {
  const Image = document.createElement('img');
  Image.setAttribute('src', 'images/pic' + i + '.jpg');
  thumbBar.appendChild(Image);
  Image.onclick = function(x) {
    displayedImage.src = x.target.src;
  }
}

/* Wiring up the Darken/Lighten button */
/*Code from MDN  https://mdn.github.io/learning-area/javascript/building-blocks/gallery/*/

btn.onclick = function() {
  const buttonState = btn.getAttribute('class');
  if(buttonState === 'dark') {
    btn.setAttribute('class','light');
    btn.textContent = 'Lighten';
    overlay.setAttribute('style','background-color:rgba(0,0,0,0.5)');
  } else {
    btn.setAttribute('class','dark');
    btn.textContent = 'Darken';
    overlay.setAttribute('style','background-color:rgba(0,0,0,0)');
  }
}
  
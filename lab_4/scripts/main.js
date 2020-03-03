
var body = document.querySelector('body');
body.prepend(document.createElement('img'));
let myImage = document.querySelector('img');
myImage.setAttribute ('src','images/firefox-icon.png');
myImage.onclick = function() {
    let mySrc = myImage.getAttribute('src');
    if(mySrc === 'images/firefox-icon.png') {
      myImage.setAttribute ('src','images/firefox2.png');
    } else {
      myImage.setAttribute ('src','images/firefox-icon.png');
    }
}


body.appendChild(document.createElement('button'));
let myButton = document.querySelector('button');
myButton.textContent="change user";
let myHeading = document.querySelector('h1');

if(!localStorage.getItem('name')) {
    setUserName();
  } else {
    let storedName = localStorage.getItem('name');
    myHeading.innerHTML = 'Mozilla is cool, ' + storedName;
  }
  
myButton.onclick = function() {
setUserName();
}

function setUserName() {
    let myName = prompt('Please enter your name.');
    if(!myName || myName === null) {
      setUserName();
    } else {
      localStorage.setItem('name', myName);
      myHeading.innerHTML = 'Mozilla is cool, ' + myName;
    }
  }

var str = "Eric Nguyen";
var n = str.length
var sub1 = str.charAt(3);
var sub2 = str.substring(8,11);
var firstN = str.substring(0,4);
var lastN = str.substring(5,11)

const myTitle = document.querySelector('h1');
myTitle.textContent = str + "'s Lab 4";

const content = document.querySelector('.content');
let p1 = document.createElement("p");
p1.classList.add('paragraphOne');
content.appendChild(p1);
p1.textContent = "my name has "+ (str.length-1) +" characters";

let p2 = document.createElement("p");
p2.classList.add('paragraphTwo');
content.appendChild(p2);
p2.setAttribute('style', 'white-space: pre;')
p2.textContent= "the third character in my name is";
p2.textContent+= " "+sub1.toUpperCase();

p2.textContent += "\r\n";

p2.textContent+= sub2.toUpperCase();
let br = document.createElement("br");

var total = firstN.length+lastN.length;

var mod = myTitle.textContent;
var newheader =[mod.slice(0,11),total,mod.slice(11)].join(' ');
myTitle.textContent = newheader;

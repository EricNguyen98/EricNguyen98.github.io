let doc = document.querySelector('body');

doc.onclick = function() {
const myTitle = document.querySelector('.header');
myTitle.textContent = "Eric Nguyen's List Of Countries";

const content = document.querySelector('.content');

content.removeChild(content.lastElementChild)
const  country= document.createElement("ol");
country.classList.add('countries');

let contList = [];

let a =getInt();
a.sort(sortNum);
a.forEach(element => {
    contList.push(countries[element]);
});
contList.forEach(element => console.log(element));
contList.forEach(element => {
    let line = document.createElement('li');
    let name = element['name'];
    let code = element['code'].bold();
    line.innerHTML= code  + ' ' + name;
    country.appendChild(line)
    
});
content.appendChild(country);
}


function getInt(){
    let a2= [];
    let step = 0;
    while(step<25){
        let num = Math.floor(Math.random() *countries.length);
        if(!a2.includes(num)){
            a2.push(num);
            step ++;
        }
    }
return a2;
}
function sortNum(a, b) {
    return a - b;
}
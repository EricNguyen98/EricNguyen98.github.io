let cont = document.querySelector('.container');

let div = document.createElement('div');
cont.appendChild(div);

let form = document.createElement('form');
form.setAttribute('action',"https://nameless-thicket-21836.herokuapp.com/lab");
form.setAttribute('method',"post");
div.appendChild(form);

let nameLabel = document.createElement('label');
nameLabel.setAttribute('for','name');
nameLabel.textContent = "Name";
form.appendChild(nameLabel);

let nameInput = document.createElement('input');
nameInput.setAttribute('type','text');
nameInput.setAttribute('id','name');
nameInput.setAttribute('maxlength','140');
form.appendChild(nameInput);

let interestLabel = document.createElement('label');
interestLabel.setAttribute('for','interest');
interestLabel.textContent = "Interests";
form.appendChild(interestLabel);

let interestBox = document.createElement('textarea');
interestBox.setAttribute('id','interests');
interestBox.setAttribute('name','interests');
interestBox.setAttribute('rows','5');
interestBox.setAttribute('cols','33');
interestBox.setAttribute('placeholder',"Enter Interests");
form.appendChild(interestBox);

let nextLine = document.createElement('br');
form.appendChild(nextLine);

let button = document.createElement('button');
button.setAttribute('class','button');
button.setAttribute('type','submit');
button.textContent = "Submit"
form.appendChild(button)
let texttoadd = document.querySelector('#add-text');
console.log(texttoadd.value);
let edittext = null;
let allcard = document.querySelector('#all-cards');

let newtext = null;
let add = document.querySelector('#add');
add.addEventListener('click', () => {
    let inputtext = texttoadd.value;
    console.log("button clicked");

    let card = document.createElement('div');
    card.setAttribute('id', 'card');
    if (texttoadd.value == '') {
        alert("Add the task to be performed");
    }
    if (add.innerText === "EDIT") {
        editlocalcard(edittext.target.parentElement.previousSibling.children[0].innerText);
        edittext.target.parentElement.previousSibling.children[0].innerText = texttoadd.value;
        add.innerText = "ADD";
        texttoadd.value = "";

    }
    else {
        let part1 = document.createElement('div');
        part1.setAttribute('class', 'part1');
        let todo = document.createElement('p');
        todo.setAttribute('class', 'to-do');
        todo.innerHTML = texttoadd.value;
        part1.appendChild(todo);

        let part2 = document.createElement('div');
        part2.setAttribute('class', 'part2');
        let edit = document.createElement('p');
        edit.setAttribute('id', 'edit');
        edit.innerText = 'Edit';
        let remove = document.createElement('p');
        remove.setAttribute('id', 'remove');
        remove.innerText = 'Remove';

        part2.appendChild(edit);
        part2.appendChild(remove);
        card.appendChild(part1);
        card.appendChild(part2);
        console.log(part2);

        console.log(card);
        let input = document.querySelector('#input');
        console.log(input);
        allcard.appendChild(card);
        texttoadd.value = "";
        savelocalStorage(inputtext);
        console.log(inputtext)
    }

})
var changesintodo = (e) => {
    console.log(e.target);
    if (e.target.innerHTML === 'Edit') {
        texttoadd.value = e.target.parentElement.previousSibling.children[0].innerText;
        texttoadd.focus();
        add.innerText = "EDIT";
        edittext = e;
    }
    if (e.target.innerHTML === 'Remove') {
        allcard.removeChild(e.target.parentElement.parentElement);
        removelocalcard(e.target.parentElement.parentElement);
    }
}
allcard.addEventListener('click', changesintodo);

var savelocalStorage = (todo) => {
    let data;
    if (localStorage.getItem("data") === null) {
        data = [];
    }
    else {
        data = JSON.parse(localStorage.getItem("data"));
    }
    data.push(todo);
    console.log(data);
    localStorage.setItem("data", JSON.stringify(data))
}

var displaylocalcard = () => {
    let data;
    if (localStorage.getItem("data") === null) {
        data = [];
    }
    else {
        data = JSON.parse(localStorage.getItem("data"));
        data.forEach(Element => {
            let card = document.createElement('div');
            card.setAttribute('id', 'card');
            let part1 = document.createElement('div');
            part1.setAttribute('class', 'part1');
            let todo = document.createElement('p');
            todo.setAttribute('class', 'to-do');
            todo.innerHTML = Element;
            part1.appendChild(todo);

            let part2 = document.createElement('div');
            part2.setAttribute('class', 'part2');
            let edit = document.createElement('p');
            edit.setAttribute('id', 'edit');
            edit.innerText = 'Edit';
            let remove = document.createElement('p');
            remove.setAttribute('id', 'remove');
            remove.innerText = 'Remove';

            part2.appendChild(edit);
            part2.appendChild(remove);
            card.appendChild(part1);
            card.appendChild(part2);
            console.log(part2);

            console.log(card);
            let input = document.querySelector('#input');
            console.log(input);
            allcard.appendChild(card);
        });
    }
}

var removelocalcard = (todo) => {
    let data;
    if (localStorage.getItem("data") === null) {
        data = [];
    }
    else {
        data = JSON.parse(localStorage.getItem("data"));
    }
    let datatext = todo.children[0].children[0].innerHTML;
    let dataindex = data.indexOf(datatext);
    data.splice(dataindex, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(dataindex);

}

var editlocalcard = (todo) => {
    let editText = JSON.parse(localStorage.getItem("data"));
    console.log(editText)
    console.log(todo);
    let editindex = editText.indexOf(todo);
    console.log(editindex);
    console.log(texttoadd.value)
    editText[editindex] = texttoadd.value;
    console.log(editText[editindex]);
    localStorage.setItem("data", JSON.stringify(editText));
}
document.addEventListener('DOMContentLoaded', displaylocalcard);




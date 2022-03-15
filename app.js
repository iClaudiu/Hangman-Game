const btn = document.getElementById("btn");
const photo = document.getElementById("photo");
const letters = document.getElementById("letters");
const errors = document.getElementById("errors");

let word;
let mistakes = 6;

document.addEventListener("DOMContentLoaded", onLoad);
document.addEventListener("keyup", onKeyUp);

function onLoad(){
    onReset();
    btn.addEventListener("click", onReset);
}

function onReset(){
    mistakes = 6;
    errors.innerHTML="";
    photo.querySelectorAll("[id]")
         .forEach(x=>x.style.display="none");
    word = chooseWord();
    drawWord(word);
}

function chooseWord(){
    let words = ["motorcycle", "pineapple", "flower"];
    let ndx = generateNumber(0, words.length-1);
    return words[ndx];
}

function drawWord(word){
    let letter;
    letters.innerHTML="";
    word.split("").forEach((l,i)=>{
        letter = document.createElement("span");
        if(i == 0 || i == word.length - 1)
            letter.textContent = l;
        else
            letter.k = l;
        letters.appendChild(letter);
    });
}

function generateNumber(minValue, maxValue){
    return Math.ceil(minValue + Math.random() * (maxValue - minValue));
}

function onKeyUp(e){
    if(e.keyCode<65 || e.keyCode>90) return;
    let  letter = e.key;
    let empty = getEmptySlots();
    let guess = 0;
    empty.forEach(l=>{
        if(l.k == letter){
            l.textContent = letter;
            delete l.k;
            guess++;
        }
    });
    if(guess == 0){
        errors.textContent = `${errors.textContent} ${letter} |`;
        drawCharacter(mistakes);
        mistakes--;
    }
    if(getEmptySlots().length == 0){
        alert("You Won!");
    }else if(mistakes == 0){
        alert("You Lost!");
    }
}

function getEmptySlots(){
    return Array.from(letters.querySelectorAll("span"))
                .filter(l=>l.textContent=="");
}

function drawCharacter(mistakes){
    let id = `id${mistakes}`;
    photo.getElementById(id).style.display="inherit";
}
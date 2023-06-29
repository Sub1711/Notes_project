
const board = document.querySelector('#board')
const Add_btn = document.querySelector('#Add_btn')
const notesArr = []

const textOfNote = document.querySelector('#textOfNote')
const dateNote = document.querySelector('#dateNote')
const timeNote = document.querySelector('#timeNote')
let id = 0;

class Note {
    constructor(textOfNote, dateNote, timeNote, id) {
        this.textOfNote = textOfNote
        this.dateNote = dateNote
        this.timeNote = timeNote
        this.id = id
    }

showHtml() {
    board.innerHTML += `
    <div id="${this.id}">
         ${this.textOfNote}<br>
         ${this.dateNote} <br> 
         ${this.timeNote} <br>
         <button class="btn btn-danger" onclick="removeNote(${this.id})">x</button>
    </div>
    ` }
}

function addNote(e) {
    // e.preventDefault();
    id++;
    const note = new Note(textOfNote.value, dateNote.value, timeNote.value, id);
    notesArr.push(note);
    note.showHtml()
    saveInLocalstorage();

    textOfNote.value = ''
    dateNote.value = ''
    timeNote.value = ''
}

function removeNote(id) {
    var index = notesArr.map(item => item.id).indexOf(id);
    notesArr.splice(index, 1);
    document.getElementById(id).remove();
    saveInLocalstorage();
}

function saveInLocalstorage(){
    localStorage.setItem('notes', JSON.stringify(notesArr));
}

function init(){
    let notes = JSON.parse(localStorage.getItem('notes'));

    notes.forEach(function (note) {
        const n = new Note(note.textOfNote, note.dateNote, note.dateNote, note.id);
        notesArr.push(n);
        n.showHtml()
        id = note.id;
    });
}
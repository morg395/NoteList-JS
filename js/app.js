const createNote =  document.querySelector('.createNewNote');
const noteDesc = document.querySelector('.message');
const noteList = document.querySelector('.notesWrapper');
const noteComplete = document.querySelector('.noteComplete');
const newNotes = document.querySelector('.newNotes');
const deleteAllNotes = document.querySelector('.removeAllNotes');
const filterNotesButton = document.querySelector('.filterNotes');
const notesSettings = document.querySelector('.notesSettings');
const openNotesSettings = document.querySelector('.settingsNotes');
const closeNotesSettings = document.querySelector('.closeNotesSettings');
const saveNotesSettingsChanges = document.querySelector('.notesSettingsSaveChanges');
const notesSettingsPopup = document.querySelector('.noteSettingsPopup');
const deleteAllNotesAfterTimeButton = document.querySelector('.deleteNotesAfterSomeTime');
const noteToUpperCaseButton = document.querySelector('.noteToUpperCase');

let notes;
!localStorage.notes ? notes = [] : notes = JSON.parse(localStorage.getItem('notes'));

let noteItemElements = [];

function Note(description) {
    this.description = description;
    this.completed = false;
}

const createTemplateNote = function(note, index) {
    return `
        <div class="notesListItem${note.completed ? ' completed' : ''}">
            <p class="notesListItem-text">${note.description}</p>
            <div class="notesListItem-change">
                <input onclick='completeNote(${index})' class="noteComplete" id='completeAllNotes' type="checkbox" ${note.completed ? 'checked' : ''}>
                <button onclick='deleteNote(${index})' class="deleteNote"><svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
                <path d="M11.75 4.875H17.25C17.25 4.14565 16.9603 3.44618 16.4445 2.93046C15.9288 2.41473 15.2293 2.125 14.5 2.125C13.7707 2.125 13.0712 2.41473 12.5555 2.93046C12.0397 3.44618 11.75 4.14565 11.75 4.875V4.875ZM9.6875 4.875C9.6875 4.24301 9.81198 3.61722 10.0538 3.03334C10.2957 2.44946 10.6502 1.91893 11.097 1.47205C11.5439 1.02517 12.0745 0.670681 12.6583 0.42883C13.2422 0.186979 13.868 0.0625 14.5 0.0625C15.132 0.0625 15.7578 0.186979 16.3417 0.42883C16.9255 0.670681 17.4561 1.02517 17.903 1.47205C18.3498 1.91893 18.7043 2.44946 18.9462 3.03334C19.188 3.61722 19.3125 4.24301 19.3125 4.875H27.2188C27.4923 4.875 27.7546 4.98365 27.948 5.17705C28.1414 5.37044 28.25 5.63275 28.25 5.90625C28.25 6.17975 28.1414 6.44206 27.948 6.63545C27.7546 6.82885 27.4923 6.9375 27.2188 6.9375H25.4038L23.795 23.5901C23.6716 24.8661 23.0773 26.0503 22.1281 26.9119C21.1788 27.7734 19.9427 28.2505 18.6608 28.25H10.3392C9.05756 28.2501 7.82176 27.7729 6.8728 26.9114C5.92385 26.0499 5.32976 24.8659 5.20638 23.5901L3.59625 6.9375H1.78125C1.50775 6.9375 1.24544 6.82885 1.05205 6.63545C0.858649 6.44206 0.75 6.17975 0.75 5.90625C0.75 5.63275 0.858649 5.37044 1.05205 5.17705C1.24544 4.98365 1.50775 4.875 1.78125 4.875H9.6875ZM12.4375 11.4062C12.4375 11.1327 12.3289 10.8704 12.1355 10.677C11.9421 10.4836 11.6798 10.375 11.4062 10.375C11.1327 10.375 10.8704 10.4836 10.677 10.677C10.4836 10.8704 10.375 11.1327 10.375 11.4062V21.7188C10.375 21.9923 10.4836 22.2546 10.677 22.448C10.8704 22.6414 11.1327 22.75 11.4062 22.75C11.6798 22.75 11.9421 22.6414 12.1355 22.448C12.3289 22.2546 12.4375 21.9923 12.4375 21.7188V11.4062ZM17.5938 10.375C17.8673 10.375 18.1296 10.4836 18.323 10.677C18.5164 10.8704 18.625 11.1327 18.625 11.4062V21.7188C18.625 21.9923 18.5164 22.2546 18.323 22.448C18.1296 22.6414 17.8673 22.75 17.5938 22.75C17.3202 22.75 17.0579 22.6414 16.8645 22.448C16.6711 22.2546 16.5625 21.9923 16.5625 21.7188V11.4062C16.5625 11.1327 16.6711 10.8704 16.8645 10.677C17.0579 10.4836 17.3202 10.375 17.5938 10.375ZM7.25925 23.3921C7.33341 24.1575 7.68996 24.8679 8.25938 25.3846C8.8288 25.9014 9.57028 26.1877 10.3392 26.1875H18.6608C19.4297 26.1877 20.1712 25.9014 20.7406 25.3846C21.31 24.8679 21.6666 24.1575 21.7408 23.3921L23.333 6.9375H5.667L7.25925 23.3921Z" fill="white"/>
                </svg></button>
            </div>
        </div>
    `
}

const filterNotes = function() {
    if (filterNotesButton.checked == true) {
        const activeNotes = notes.length && notes.filter(item => item.completed == false);
        const completedNotes = notes.length && notes.filter(item => item.completed == true);
        notes = [...activeNotes,...completedNotes];
    } else {
        return false;
    }
}

deleteAllNotesAfterTimeButton.addEventListener('change', function() {
    if (deleteAllNotesAfterTimeButton.checked == true) {
        setInterval(function() {
            notes = []
            updateLocal();
            htmlList();
        }, 86400000)
    } else {
        return false;
        updateLocal();
        htmlList();
    }
})

const htmlList = function() {
    noteList.innerHTML = '';
    if(notes.length > 0) {
        filterNotes();
        notes.forEach(function(item, index) {
            noteList.innerHTML += createTemplateNote(item, index);
        })
        noteItemElements = document.querySelectorAll('.notesListItem');
    }
}

htmlList();

const updateLocal = function() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function saveSettings(){
    var checkbox = document.getElementById('checkbox');
    var checkbox2 = document.getElementById('checkbox2');
    var checkbox3 = document.getElementById('checkbox3');
    localStorage.setItem('checkbox', checkbox.checked);
    localStorage.setItem('checkbox2', checkbox2.checked);
    localStorage.setItem('checkbox3', checkbox3.checked);
}

function loadSettings(){    
    var checked = JSON.parse(localStorage.getItem('checkbox'));
    var checked2 = JSON.parse(localStorage.getItem('checkbox2'));
    var checked3 = JSON.parse(localStorage.getItem('checkbox3'));
    checkbox.checked = checked;
    checkbox2.checked = checked2;
    checkbox3.checked = checked3;
}

loadSettings();

const completeNote = function(index) {
    notes[index].completed = !notes[index].completed;
    if(notes[index].completed) {
        noteItemElements[index].classList.add('completed');
    } else {
        noteItemElements[index].classList.remove('completed');
    }
    updateLocal();
    htmlList();
}

createNote.addEventListener('click', function() {
    if (noteDesc.value.length < 3) {
        alert('Заметка должна состоять не менее, чем из 3 символов!');
        return false;
    } else {
        notes.push(new Note(noteDesc.value));
        updateLocal();
        htmlList();
        noteDesc.value = '';
    }
})

deleteAllNotes.addEventListener('click', function() {
    notes = [];
    updateLocal();
    htmlList();
})

const deleteNote = function(index) {
    noteItemElements[index].classList.add('del')
    setTimeout(function() {
        notes.splice(index, 1);
        updateLocal();
        htmlList();
    }, 600);
}

openNotesSettings.addEventListener('click', function() {
    notesSettings.style.display = 'flex';
})

closeNotesSettings.addEventListener('click', function() {
    notesSettings.style.display = 'none';
})

notesSettingsPopup.style.display = 'none';

saveNotesSettingsChanges.addEventListener('click', function() {
    notesSettingsPopup.style.display = 'flex';
    notesSettingsPopup.style.top = '20px';
    setTimeout(function() {
        notesSettingsPopup.style.display = 'none';
        notesSettingsPopup.style.top = '-120px';
    }, 3500)
})
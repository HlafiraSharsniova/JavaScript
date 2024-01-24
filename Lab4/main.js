let notes = [];
let tags = [];
const addNote = document.querySelector("#submit");
const btnShowForm = document.querySelector(".add-note");
const form = document.querySelector(".form");
const overlay = document.querySelector(".overlay");
const editOverlay = document.querySelector(".edit-overlay");
const addNoteBtn = document.querySelector(".add-note");
const addTagBtn = document.querySelector(".add-tag");
const notesList = document.querySelector(".notes-list");
const editForm = document.querySelector(".edit-form");
const noteSearch = document.querySelector(".note-search");
const noteSearchTag = noteSearch.querySelector('input[type="text"]');
const tagsMenu = document.querySelector("#tags");
const notesMenu = document.querySelector("#notes");

const loadNotes = () => {
  const jsonNotes = JSON.parse(window.localStorage.getItem("notes"));
  jsonNotes ? (notes = [...jsonNotes]) : console.log("Brak notatek");
};
loadNotes();

function returnDate(date) {
  const day = `${date.getDate()}`.padStart(2, "0");
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

const toggleEditForm = () => {
  editForm.classList.toggle("hidden");
  editOverlay.classList.toggle("hidden");
};

const displayNotes = (notes) => {
  notesList.innerHTML = "";

  if (notes.some((acc) => acc.pin)) {
    notes.sort((a, b) => b.pin - a.pin);
  }

  notes.forEach((note) => {
    const newNote = document.createElement("div");
    newNote.classList.add("note");
    newNote.style.backgroundColor = note.color;
    newNote.innerHTML = `<div class='manage-icons'> 
      <div>
      <button class="edit-button"><i class="fa-solid fa-pen-to-square"></i></button> 
      <button class="delete-button"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>
    <div class='pin-icon'>${note.pin ? "🔴" : "⚪"}</div>
    <div>
      <h1>${note.title}</h1> 
      <div class="note--content">
        <div class="note--tags">Tagi: ${note.tags} </div>
        ${note.content}
    </div>
    </div>
    <div class="note--date">Data utworzenia: ${returnDate(
      new Date(note.dateOfCreation)
    )}
   <div>`;

    const notePin = newNote.querySelector(".pin-icon");
    newNote
      .querySelector(".delete-button")
      .addEventListener("click", () => deleteNote(note.id));
    newNote
      .querySelector(".edit-button")
      .addEventListener("click", () => toggleEditMenu(note.id));
    notePin.addEventListener("click", () => pinNote(note, notePin));
    notesList.appendChild(newNote);
  });
};
displayNotes(notes);

const pinNote = function (note, notePin) {
  if (notePin.textContent === "⚪") {
    const findNote = notes.find((n) => n.id === Number(note.id));
    findNote.pin = true;
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes(notes);
  }

  if (notePin.textContent === "🔴") {
    const findNote = notes.find((n) => n.id === Number(note.id));
    findNote.pin = false;
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes(notes);
  }
};

const deleteNote = function (id) {
  notes = notes.filter((note) => note.id !== Number(id));
  localStorage.setItem("notes", JSON.stringify(notes));
  displayNotes(notes);
};

const loadValuesToForm = (note) => {
  editForm.querySelector('input[name="title"]').value = note.title;
  editForm.querySelector("textarea").value = note.content;
  editForm.querySelector('input[name="tags"]').value = String(note.tags).replaceAll(",", " ");
  editForm.querySelector(`input[type="color"]`).value = note.color;
};

const toggleEditMenu = function (id) {
  toggleEditForm();
  const singleNote = notes.find((note) => note.id === Number(id));
  console.log(singleNote);
  loadValuesToForm(singleNote);

  document.querySelector(".edit-note").addEventListener("click", function () {
    editNote(singleNote);
  });
  displayNotes(notes);
};

const editNote = function (newNote) {
  newNote.title = editForm.querySelector('input[name="title"]').value;
  newNote.content = editForm.querySelector("textarea").value;
  newNote.tags = editForm.querySelector('input[name="tags"]').value;
  newNote.color = editForm.querySelector('input[type="color"]').value;
  localStorage.setItem("notes", JSON.stringify(notes));
};

addNote.addEventListener("click", (e) => {
  e.preventDefault();
  const title = document.querySelector('input[name="title"]').value;
  const content = document.querySelector("textarea").value;
  const color = document.querySelector('input[type="color"]').value;
  const tags = document.querySelector('input[name="tags"]').value.split(" ");
  const note = new Note(
    Date.now(),
    title,
    content,
    color,
    false,
    tags,
    Date.now()
  );
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
  toggleForm();
  displayNotes(notes);
});

noteSearchTag.addEventListener("input", function (e) {
  let filteredNotes;
  setTimeout(() => {
    if (e.target.value === "") displayNotes(notes);
    else {
      filteredNotes = notes.filter((note) =>
        note.tags.includes(e.target.value)
      );
      displayNotes(filteredNotes);
    }
  }, 500);
});

const toggleForm = () => {
  form.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
};

const showNotes = () => {
  addNoteBtn.classList.remove("hidden");
  notesList.classList.remove("hidden");
};

btnShowForm.addEventListener("click", toggleForm);
overlay.addEventListener("click", toggleForm);
editOverlay.addEventListener("click", toggleEditForm);

class Note {
  constructor(id, title, content, color, pin, tags, dateOfCreation) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.color = color;
    this.pin = pin;
    this.tags = tags;
    this.dateOfCreation = dateOfCreation;
  }
}
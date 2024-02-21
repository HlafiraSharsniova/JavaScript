function getId() {
    return Math.floor(Math.random() * 1000);
}

displayNotes();

function displayNotes() {
    const noteId = Object.values({ ...localStorage }).map((note) => {
        const { title, content, pinned, color, date, id } = JSON.parse(note);

        return `<li style="background: ${color}; padding: 4px;"><b>Tytuł:</b> ${title}, <b>Notatka:</b> ${content}, <b>Przypinanie:</b> ${pinned == true}, <b>Data:</b> ${date}</p></li><button data-id="${id}" class="edit-note-btn">Edytuj notatkę</button><button data-id="${id}" class="remove-note-btn">Usuń notatkę</button>`;
    });

    document.querySelector("#list").innerHTML = noteId;
}

function addNote() {
    const addNote = document.querySelector("#add-note");
    const title = addNote.querySelector("#title");
    const content = addNote.querySelector("#content");
    const color = addNote.querySelector("#color");
    const pinned = addNote.querySelector("#pinned");
    const id = getId();

    if (title === null) {
        alert("Nie można dodać notatki bez tytułu")
    }
    else {
        localStorage.setItem(
            id,
            JSON.stringify(
                {
                    title: title.value,
                    content: content.value,
                    color: color.value,
                    pinned: pinned.checked,
                    date: new Date().toLocaleString(),
                    id
                }
            )
        );

        displayNotes();

        id;
        title.value = "";
        content.value = "";
        pinned.checked = undefined;
        color.value = color.value;
    }
}

document.querySelector("#add-note-btn").addEventListener("click", () => {
    addNote();
});

function removeNote(e) {
    if (e.target.tagName === "BUTTON" && e.target.className === "remove-note-btn") {
        localStorage.removeItem(e.target.dataset.id);
    }

    displayNotes();
}

window.addEventListener("click", removeNote);

function editNote(x) {
    if (x.target.tagName === "BUTTON" && x.target.className === "edit-note-btn") {
        const { title, content, color, id } = JSON.parse(localStorage.getItem(x.target.dataset.id));

        const editNote = document.querySelector("#edit-note");
        const titleEdit = editNote.querySelector("#title");
        const contentEdit = editNote.querySelector("#content");
        const colorEdit = editNote.querySelector("#color");
        const pinnedEdit = editNote.querySelector("#pinned");
        const idEdit = editNote.querySelector("#note-id");

        titleEdit.value = title;
        contentEdit.value = content;
        colorEdit.value = color;
        pinnedEdit.checked = pinned;
        idEdit.value = id;
    }
}

window.addEventListener("click", editNote);

function updateNote() {
    const editNote = document.querySelector("#edit-note");
    const title = editNote.querySelector("#title");
    const content = editNote.querySelector("#content");
    const color = editNote.querySelector("#color");
    const pinned = editNote.querySelector("#pinned");
    const idEdit = editNote.querySelector("#note-id");

    const { date, id } = JSON.parse(localStorage.getItem(idEdit.value));

    localStorage.removeItem(id);

    localStorage.setItem(
        id,
        JSON.stringify({
            title: title.value,
            content: content.value,
            color: color.value,
            pinned: pinned.checked,
            date: date,
            id
        })
    );

    displayNotes();
    title.value = "";
    content.value = "";
    color.value = "";
    pinned.checked = undefined;
    idEdit.value = "";
}

document.querySelector("#edit-note-btn").addEventListener("click", () => {
    updateNote();
});


let colorInput = document.getElementById("color");
let colorValue = colorInput.value;

colorInput.addEventListener("input", () => {
    document.getElementById("add-note").style.background = colorInput.value;
});
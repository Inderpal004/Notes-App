const addBtn = document.querySelector('#addBtn');
const main = document.querySelector('#main')

addBtn.addEventListener('click', () => {
    addNote()
})

const saveNote = () => {
    const notes = document.querySelectorAll('.note textarea');
    const data = [];
    notes.forEach((note) => {
        data.push(note.value)
    })
    if (data.length === 0) {
        localStorage.removeItem('notes')
    } else {
        localStorage.setItem('notes', JSON.stringify(data))
    }
}

const addNote = (text = '') => {
    const note = document.createElement('div')
    note.classList.add('note')
    note.innerHTML = `<div class="tool">
    <i class="ri-save-3-fill save"></i>
    <i class="ri-delete-bin-5-fill trash"></i>
</div>
<textarea>${text}</textarea>`;

    note.querySelector('.trash').addEventListener('click', () => {
        note.remove()
        saveNote();
    })

    note.querySelector('.save').addEventListener('click', () => {
        saveNote()
    })
    note.querySelector('textarea').addEventListener('focusout',()=>{
        saveNote()
    })
    main.appendChild(note)
    saveNote()
}

(function () {
    const lsNotes = JSON.parse(localStorage.getItem('notes'));
    if (lsNotes === null) {
        addNote()
    }
    else {
        lsNotes.forEach((lsNote) => {
            addNote(lsNote)
        })
    }
})()

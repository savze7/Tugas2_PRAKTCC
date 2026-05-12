const API = "https://backend-820401822458.us-central1.run.app/api/v1/notes";

let editId = null;

async function getNotes() {
  const res = await fetch(API);
  const data = await res.json();

  const container = document.getElementById("notes");
  container.innerHTML = "";

  data.forEach(note => {
    const div = document.createElement("div");
    div.className = "note";

    div.innerHTML = `
      <h3>${note.judul}</h3>
      <p>${note.isi}</p>
      <div class="actions">
        <button class="edit" onclick="editNote(${note.id}, '${note.judul}', '${note.isi}')">Edit</button>
        <button class="delete" onclick="deleteNote(${note.id})">Hapus</button>
      </div>
    `;

    container.appendChild(div);
  });
}

async function addNote() {
  const judul = document.getElementById("judul").value;
  const isi = document.getElementById("isi").value;

  if (!judul || !isi) return alert("Isi dulu Boss!");

  if (editId) {
    await fetch(`${API}/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ judul, isi })
    });
    editId = null;
  } else {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ judul, isi })
    });
  }

  document.getElementById("judul").value = "";
  document.getElementById("isi").value = "";

  getNotes();
}

function editNote(id, judul, isi) {
  document.getElementById("judul").value = judul;
  document.getElementById("isi").value = isi;
  editId = id;
}

async function deleteNote(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });

  getNotes();
}

getNotes();
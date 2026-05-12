const noteModel = require("../../models/noteModels");

// GET semua notes
const getAllNotes = async (req, res) => {
  try {
    const notes = await noteModel.findAll();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET note by id
const getNoteById = async (req, res) => {
  try {
    const note = await noteModel.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note tidak ditemukan" });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE note
const createNote = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body); // 🔥 DEBUG

    const { judul, isi } = req.body;

    const newNote = await noteModel.create({
      judul,
      isi,
    });

    res.status(201).json(newNote);
  } catch (error) {
    console.error("ERROR:", error); // 🔥 DEBUG
    res.status(500).json({ message: error.message });
  }
};

// UPDATE note
const updateNote = async (req, res) => {
  try {
    const { judul, isi } = req.body;

    const note = await noteModel.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note tidak ditemukan" });
    }

    await noteModel.updateById(req.params.id, { judul, isi });

    res.json({ message: "Note berhasil diupdate" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE note
const deleteNote = async (req, res) => {
  try {
    const note = await noteModel.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note tidak ditemukan" });
    }

    await noteModel.deleteById(req.params.id);

    res.json({ message: "Note berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote
};
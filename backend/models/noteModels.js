const db = require("../database");

const findAll = async () => {
  const [rows] = await db.query("SELECT * FROM notes ORDER BY id DESC");
  return rows;
};

const findById = async (id) => {
  const [rows] = await db.query("SELECT * FROM notes WHERE id = ?", [id]);
  return rows[0];
};

const create = async ({ judul, isi }) => {
  const [result] = await db.query(
    "INSERT INTO notes (judul, isi) VALUES (?, ?)",
    [judul, isi]
  );

  return { id: result.insertId, judul, isi };
};

const updateById = async (id, { judul, isi }) => {
  await db.query("UPDATE notes SET judul = ?, isi = ? WHERE id = ?", [
    judul,
    isi,
    id,
  ]);
};

const deleteById = async (id) => {
  await db.query("DELETE FROM notes WHERE id = ?", [id]);
};

module.exports = {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
};
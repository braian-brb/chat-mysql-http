const { options } = require("./options/mariaDB.js");
const knex = require("knex")(options);

//Seleccionar todos los articulos
(async () => {
  try {
    const row = await knex("messages").select("*");
    console.log(row);
  } catch (err) {
    console.log(err);
  } finally {
    knex.destroy();
  }
})();

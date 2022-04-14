const { options } = require("./options/mariaDB.js");
const knex = require("knex")(options);

const messages = [
  { user: "Juan", message: "¡Hola! ¿Que tal?" },
  { user: "Pedro", message: "¡Muy bien! ¿Y vos?" },
  { user: "Ana", message: "¡Genial!" },
];

(async () => {
  try {
    await knex("messages").insert(messages);
    console.log("insert messages has been sucessfully");
  } catch (err) {
    console.log(err);
  } finally {
    knex.destroy();
  }
})();

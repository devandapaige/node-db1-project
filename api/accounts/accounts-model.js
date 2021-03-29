const knex = require(knex);
const config = {
  client: "sqlite3",
  connection: {
    filename: ".../data/budget.db3",
  },
  useNullAsDefault: true,
};

const db = knex(config);

const getAll = () => {
  return db("Accounts");
};

const getById = (id) => {
  return db("Accounts").where("id", id).first();
};

const create = async (account) => {
  return await db("Accounts")
    .insert(account)
    .then((id) => {
      return db("Accounts").where("id", id).first();
    });
};

const updateById = async (id, account) => {
  return await db("Accounts")
    .where("id", id)
    .update(account)
    .then((id) => {
      return db("Accounts").where("id", id).first();
    });
};

const deleteById = async (id) => {
  return await db("accounts")
    .where("id", id)
    .del()
    .then(() => {
      return db("accounts");
    });
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};

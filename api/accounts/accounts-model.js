const db = require("../data/db-config.js")

const getAll = () => {
  return db("accounts")
}

const getById = id => {
  return db("accounts").where("id", id).first();
}

const create = async account => {
  return await db("accounts")
  .insert(account)
  .then((id) => {
    return db("accounts").where("id", id).first();
  })
}

const updateById = async (id, account) => {
  return await db("accounts")
  .where("id", id)
  .update(account)
  .then((id) => {
    return db("accounts").where("id", id).first()
  })
}

const deleteById = async id => {
  return await db("accounts")
  .where("id", id)
  .del()
  .then(() => {
    return db("accounts")
  })
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}

const router = require("express").Router();
const {
  CheckAccountPayload,
  checkAccountNameUnique,
  checkAccountId,
  checkAccountPayload,
} = require("./accounts-middleware");
const model = require("./accounts-model");
/*module.exports (accounts-model) = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}*/

router.get("/", async (req, res, next) => {
  try {
    const account = await model.getAll;
    res.status(200).json(account);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", checkAccountId(), async (req, res, next) => {
  try {
    const account = await model.getById(req.params.id);
    res.status(200).json(account);
  } catch (err) {
    next(err);
  }
});

router.post("/", checkAccountPayload(), async (req, res, next) => {
  try {
    const post = await model.create(req.body);
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const update = await model.updateById(req.params.id, req.body);
    res.status(200).json(update);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", checkAccountId(), async (req, res, next) => {
  try {
    await model.deleteById(req.params.id);
    res.status(200).json({ message: "Delete successful" });
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
  res.status(500).json({
    message: "something went wrong inside the accounts router",
    errMessage: err.message,
  });
});

module.exports = router;

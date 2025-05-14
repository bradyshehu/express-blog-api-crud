const posts = require("../data/posts");

const index = (req, res) => {
  res.json({
    description: "Lista di tutti i post",
    data: posts,
  });
};

const show = (req, res) => {
  const id = parseInt(req.params.id);
  const currentPost = posts.posts.find((post) => post.id == id);
  res.json({
    description: "Lettura del post " + id,
    data: currentPost,
  });
};

const store = (req, res) => {
  res.send("Creazione di un nuovo post");
};

const update = (req, res) => {
  const id = parseInt(req.params.id);
  const currentPost = posts.posts.find((post) => post.id == id);
  res.send("Sostituzione del post " + id);
};

const modify = (req, res) => {
  const id = parseInt(req.params.id);
  const currentPost = posts.posts.find((post) => post.id == id);
  res.send("Modifica del post" + id);
};

const destroy = (req, res) => {
  const id = parseInt(req.params.id);
  const currentPost = posts.posts.find((post) => post.id == id);
  res.send("Cancellazione del post " + id);
};

module.exports = {
  index,
  show,
  store,
  update,
  modify,
  destroy,
};

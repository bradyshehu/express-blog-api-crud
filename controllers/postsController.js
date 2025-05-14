const posts = require("../data/posts");

const index = (req, res) => {
  res.json({
    description: "Lista di tutti i post",
    data: posts,
  });
};

const show = (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.posts.find((post) => post.id == id);

  //   NOT FOUND
  if (!post) {
    res.status(404);
    res.json({
      error: "404 Not Found",
      message: "Post Not Found",
    });
    return;
  }
  // FOUND
  res.json({
    description: "Lettura del post " + id,
    data: post,
  });
};

const store = (req, res) => {
  res.send("Creazione di un nuovo post");
};

const update = (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.posts.find((post) => post.id == id);

  if (!post) {
    res.status(404);
    res.json({
      error: "404 Not Found",
      message: "Post Not Found",
    });
    return;
  }

  res.send("Sostituzione del post " + id);
};

const modify = (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.posts.find((post) => post.id == id);

  if (!post) {
    res.status(404);
    res.json({
      error: "404 Not Found",
      message: "Post Not Found",
    });
    return;
  }

  res.send("Modifica del post " + id);
};

const destroy = (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.posts.find((post) => post.id == id);

  if (!post) {
    res.status(404);
    res.json({
      error: "404 Not Found",
      message: "Post Not Found",
    });
    return;
  }
  const postIndex = posts.posts.indexOf(post);
  posts.posts.splice(postIndex, 1);

  console.log(posts);
  res.sendStatus(204);
};

module.exports = {
  index,
  show,
  store,
  update,
  modify,
  destroy,
};

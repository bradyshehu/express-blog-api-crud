const posts = require("../data/posts");
const postsArray = posts.posts;
const index = (req, res) => {
  res.json({
    description: "Lista di tutti i post",
    data: posts,
  });
};

const show = (req, res) => {
  const id = parseInt(req.params.id);
  const post = postsArray.find((post) => post.id == id);

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
  console.log(req.body);

  // AGGIUNGI CONTROLLI

  const { title, content, image, tags } = req.body;

  let maxId = 0;
  for (const post of postsArray) {
    if (post.id > maxId) {
      maxId = post.id;
    }
  }
  const newPostId = maxId + 1;

  const newPost = { id: newPostId, title, content, image, tags };
  postsArray.push(newPost);

  res.status(201).json(newPost);
};

const update = (req, res) => {
  const id = parseInt(req.params.id);
  const post = postsArray.find((post) => post.id == id);
  const { title, content, image, tags } = req.body;

  if (!post) {
    res.status(404);
    res.json({
      error: "404 Not Found",
      message: "Post Not Found",
    });
    return;
  }
  // AGGIUNGI CONTROLLO SU DATI INSERITI

  // LOGICA SOSTITUZIONE DI UN POST
  const updatedPost = { id: post.id, title, content, image, tags };
  const postIndex = postsArray.indexOf(post);
  postsArray.splice(postIndex, 1, updatedPost);
  res.json(updatedPost);
};

const modify = (req, res) => {
  const id = parseInt(req.params.id);
  const post = postsArray.find((post) => post.id == id);

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
  const post = postsArray.find((post) => post.id == id);

  if (!post) {
    res.status(404);
    res.json({
      error: "404 Not Found",
      message: "Post Not Found",
    });
    return;
  }
  const postIndex = postsArray.indexOf(post);
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

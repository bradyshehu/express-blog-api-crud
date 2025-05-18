const posts = require("../data/posts");
const postsArray = posts.posts;

//  ---- INDEX ----

const index = (req, res) => {
  res.json({
    description: "Lista di tutti i post",
    data: posts,
  });
};

//  ---- SHOW ----

const show = (req, res) => {
  const id = parseInt(req.params.id);
  const post = postsArray.find((post) => post.id === id);

  // NOT FOUND ERROR HANDLER
  if (!post) {
    const error = new Error("Post not found");
    error.statusCode = 404;
    error.message = "Post not found";
    throw error;
  }

  // LETTURA DEL POST SPECIFICATO
  res.json({
    description: "Lettura del post " + id,
    data: post,
  });
};

//  ---- STORE ----

const store = (req, res) => {
  console.log(req.body);

  // AGGIUNGI CONTROLLO SU DATI INSERITI

  // LOGICA AGGIUNTA DEL POST

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

//  ---- UPDATE ----

const update = (req, res) => {
  const id = parseInt(req.params.id);
  const oldPost = postsArray.find((post) => post.id == id);
  const { title, content, image, tags } = req.body;

  // CONTROLLO ESISTENZA DEL POST

  if (!oldPost) {
    const error = new Error("Post not found");
    error.statusCode = 404;
    error.message = "Post not found";
    throw error;
  }

  // AGGIUNGI CONTROLLO SU DATI INSERITI

  // LOGICA SOSTITUZIONE DI UN POST

  const updatedPost = { id: oldPost.id, title, content, image, tags };

  const oldPostIndex = postsArray.indexOf(oldPost);
  postsArray.splice(oldPostIndex, 1, updatedPost);
  res.json(updatedPost);
};

//  ---- MODIFY ----

const modify = (req, res) => {
  const id = parseInt(req.params.id);
  const oldPost = postsArray.find((post) => post.id == id);

  // CONTROLLO ESISTENZA DEL POST

  if (!oldPost) {
    const error = new Error("Post not found");
    error.statusCode = 404;
    error.message = "Post not found";
    throw error;
  }

  // AGGIUNGI CONTROLLO SU DATI INSERITI

  // LOGICA MODIFICA DELLE CHIAVI DEL POST INDICATO

  const { title, content, image, tags } = req.body;

  if (title) {
    oldPost.title = title;
  }

  if (content) {
    oldPost.content = content;
  }
  if (image) {
    oldPost.image = image;
  }
  if (tags) {
    oldPost.tags = tags;
  }

  res.json(oldPost);
};

//  ---- DESTROY ----

const destroy = (req, res) => {
  const id = parseInt(req.params.id);
  const post = postsArray.find((post) => post.id == id);

  // CONTROLLO ESISTENZA DEL POST

  if (!post) {
    const error = new Error("Post not found");
    error.statusCode = 404;
    error.message = "Post not found";
    throw error;
  }

  // LOGICA CANCELLAZIONE DEL POST

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

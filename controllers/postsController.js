const posts = require("../data/posts");
const postsArray = posts.posts;

// INDEX

const index = (req, res) => {
  res.json({
    description: "Lista di tutti i post",
    data: posts,
  });
};

// SHOW

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

// STORE

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

// UPDATE

const update = (req, res) => {
  const id = parseInt(req.params.id);
  const oldPost = postsArray.find((post) => post.id == id);
  const { title, content, image, tags } = req.body;

  if (!oldPost) {
    res.status(404);
    res.json({
      error: "404 Not Found",
      message: "Post Not Found",
    });
    return;
  }
  // AGGIUNGI CONTROLLO SU DATI INSERITI

  // LOGICA SOSTITUZIONE DI UN POST
  const updatedPost = { id: oldPost.id, title, content, image, tags };
  const oldPostIndex = postsArray.indexOf(oldPost);
  postsArray.splice(oldPostIndex, 1, updatedPost);
  res.json(updatedPost);
};

// MODIFY

const modify = (req, res) => {
  const id = parseInt(req.params.id);
  const oldPost = postsArray.find((post) => post.id == id);

  if (!oldPost) {
    res.status(404);
    res.json({
      error: "404 Not Found",
      message: "Post Not Found",
    });
    return;
  }

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

// DESTROY

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

const host = "localhost:";
const port = 4000;
const chemin = "http://" + host + port;

const url = {
  user: chemin + "/api/user",
  signup: chemin + "/api/user/signup",
  login: chemin + "/api/user/login",
  profil: chemin + "/api/profil",
  profilUpload: chemin + "/api/profil/upload",
  post: chemin + "/api/post",
  postComment: chemin + "/api/post/comment/",
  postUpload: chemin + "/api/post/upload",
  like: chemin + "/api/post/like/",
  comment: chemin + "/api/comment",
  imageProfil: chemin + "/images/profil/",
  imagePost: chemin + "/images/posts/",
};

export default url;

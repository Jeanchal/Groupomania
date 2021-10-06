import React, { useEffect, useState } from "react";
import GetPost from "./GetPost";
import axios from "axios";
import url from "../../general/url";
import CreatePosts from "./CreatePosts";

const Posts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(url.post)
      .then((res) => setData(res.data.posts))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="acceuil-container">
      <div className="post-container">
        <CreatePosts setData={setData} />
      </div>
      <div id="getPost-container">
        {data
          .sort((a, b) => b.date - a.date)
          .map((post) => (
            <GetPost post={post} key={post.post_id} />
          ))}
      </div>
    </div>
  );
};

export default Posts;

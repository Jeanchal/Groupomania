import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";

const GetPosts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/post")
      .then((res) => {
        setData(res.data.posts);
        // console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div id="getPost-container">
      {data.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

export default GetPosts;

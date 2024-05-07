import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import attach from "../assets/images/paperclip.svg";
import like from "../assets/images/heart.svg";
import remove from "../assets/images/trash-2.svg";
import edit from "../assets/images/edit-2.svg";
import follow from "../assets/images/user-plus.svg";

const sendButton = require("../assets/images/void.png");

const api = axios.create({ baseURL: "http://localhost:3001" });

function Home({ userLogged }) {
  const inputRef = useRef(null);
  let navigate = useNavigate();

  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [newPost, setNewPost] = useState({
    category: "Thought",
    content: "",
    userId: userLogged?.id,
    username: userLogged?.username,
  });

  const [posts, setPosts] = useState([]);
  const [editedPost, setEditedPost] = useState("");

  useEffect(() => {
    console.log(userLogged);
    if (userLogged === null) {
      return navigate("/login", { replace: true });
    }

    inputRef.current.focus();
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    api
      .get(`/api/posts`)
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendNewPost = () => {
    api
      .post("/api/newPost", newPost)
      .then((res) => {
        console.log(newPost);
        document.getElementById("content").value = "";
        fetchPosts();
        // Additional alert or actions can go here
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editPost = (editedPost, id) => {
    if (editedPost === "") return alert("Can't leave it blank");

    api
      .post("/api/updateNote", {
        content: editedPost,
        id: id,
      })
      .then((res) => {
        fetchPosts();
      })
      .catch((err) => {
        console.log(err);
        alert("Error updating post");
      });
  };

  const likePost = (likedPostId) => {
    api
      .post("/api/likePost", { userId: userLogged?.id, postId: likedPostId })
      .then((res) => {
        fetchPosts();
      });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const formatSubmittedTime = (timeString) => {
    const date = new Date(timeString);
    // const formattedDate = date.toLocaleDateString(); // Adjust the format as needed
    const formattedTime = date.toLocaleTimeString(); // Adjust the format as needed
    return `${formattedTime}`;
  };

  const handleCategoryChange = (e) => {
    setNewPost({ ...newPost, category: e.target.value });
    document.getElementById("content").value = "";
  };

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      sendNewPost();
    }
  }

  return (
    <>
      <Navbar userLogged={userLogged.username} />
      <div className="flex flex-col my-5 justify-center align-center">
        <div className="max-h-[700px] overflow-y-auto flex flex-col items-center mt-20">
          {posts.length > 0 ? (
            posts
              .slice()
              .reverse()
              .map((post, id) => (
                <div className="flex flex-col mx-4 min-w-[350px] xs:w-[450px] sm:w-[600px] md:w-[800px] lg:w-[1000px]  transition-all duration-300">
                  <div key={id} className="flex flex-row justify-between mb-1">
                    <div className="flex flex-row gap-2">
                      <h4>@{post.username}</h4>
                      <button
                        className={` ${
                          post.user_id !== userLogged?.id ? "" : "hidden"
                        } hover:cursor-pointer`}
                      >
                        <img src={follow} width={15} />
                      </button>
                    </div>
                    <h4>{post.category}</h4>
                  </div>
                  <div className="flex flex-row items-center justify-between gap-10">
                    <h3 className="max-w-[800px]">{post.content}</h3>
                    <h4>{formatSubmittedTime(post.submitted_time)}</h4>
                  </div>
                  <div className="flex flex-row gap-4">
                    <div className="flex flex-row items-center gap-2 ">
                      <span
                        onClick={() => likePost(post.id)}
                        className={`z-50 opacity-100 p-2 hover:cursor-pointer ml-[-10px] mr-[-8px] transition-all duration-300`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-5 w-6 hover:cursor-pointer ${
                            post.likes > 0 ? "text-[#FF0054]" : "none"
                          }`}
                          fill={`${post.likes > 0 ? "#FF0054" : "none"}`}
                          viewBox="0 0 16 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 21l-1.35-1.214C5.85 15.88 2 12.35 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.42.81 4.5 2.09C13.08 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.85-3.85 7.38-8.65 11.29L12 21z"
                          />
                        </svg>
                      </span>
                      <h5>{post.likes}</h5>
                    </div>
                    <span
                      onClick={(editedPost) => editPost(editedPost, post.id)}
                      className={`${
                        post.user_id !== userLogged?.id ? "hidden" : ""
                      }  hover:cursor-pointer p-2 transition-all duration-300`}
                    >
                      <img src={edit} width={18} />
                    </span>
                    <span
                      className={`${
                        post.user_id !== userLogged?.id ? "hidden" : ""
                      }  hover:cursor-pointer p-2 transition-all duration-300`}
                    >
                      <img src={remove} width={18} />
                    </span>
                  </div>
                  <hr className="w-full border-t-1 border-[#ffffff2c] my-4" />
                </div>
              ))
          ) : (
            <div>No posts available</div>
          )}
        </div>

        <div className="fixed bottom-5 w-full flex justify-center">
          <div className="flex flex-row mx-20 mt-52 justify-center items-center gap-2">
            <select
              className="bg-[#FF0054] border-0 px-4 py-2 rounded-md"
              onChange={handleCategoryChange}
              value={newPost.category}
            >
              <option>Thought</option>
              <option>Memes</option>
              <option>Images</option>
              <option>Finance</option>
              <option>Entertainment</option>
              <option>News</option>
              <option>Sports</option>
            </select>
            <input
              id="content"
              ref={inputRef}
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                setNewPost({ ...newPost, content: e.target.value });
              }}
              placeholder="Share your thoughts..."
              className="hover:cursor-text z-10 border-[#8884] md:w-[350px] lg:w-[500px] border-0 px-4 py-2 rounded-md"
            />

            <button
              onClick={() => fileInputRef.current.click()}
              className="bg-[#8884] rounded-md px-8 py-2 bold"
            >
              <div className="flex flex-row gap-4">
                <img
                  src={attach}
                  width={20}
                  alt="attach"
                  className="bold text-sm uppercase"
                />
              </div>
            </button>

            <button
              onClick={sendNewPost}
              className="bg-[#FF0054] rounded-md px-8 py-2 bold"
            >
              <div className="flex flex-row gap-4">
                <span className="buttonText bold text-sm uppercase">Send</span>
                <img src={sendButton} width={15} alt="send" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

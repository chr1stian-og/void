import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import attach from "../assets/images/paperclip.svg";
import like from "../assets/images/heart.svg";
import remove from "../assets/images/trash-2.svg";
import edit from "../assets/images/edit-2.svg";
import follow from "../assets/images/user-plus.svg";

const sendButton = require("../assets/images/void.png");

const api = axios.create({ baseURL: "http://localhost:3001" });

function Home() {
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [user, setUser] = useState({
    id: 2,
    username: "void",
    email: "",
    password: "",
  });
  const [newPost, setNewPost] = useState({
    category: "Thought",
    content: "",
    userId: user.id,
  });

  const [posts, setPosts] = useState([]);
  const [editedPost, setEditedPost] = useState("");

  useEffect(() => {
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const formatSubmittedTime = (timeString) => {
    const date = new Date(timeString);
    const formattedDate = date.toLocaleDateString(); // Adjust the format as needed
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
      <Navbar />
      <div className="flex flex-col my-5 justify-center align-center">
        <div className="fixed top-5 left-0 right-0 flex justify-center">
          <h1 className="text-red font-bold">
            VOID <span className="text-[#FF0054]">SOCIAL</span>
            <span className="mx-[2px]"></span>.
          </h1>
        </div>

        <div className="max-h-[700px] overflow-y-auto flex flex-col items-center mt-20">
          {posts.length > 0 ? (
            posts
              .slice()
              .reverse()
              .map((post, id) => (
                <div className="flex flex-col mx-4 xs:w-[400px] sm:w-[600px] md:w-[800px] lg:w-[1000px]  transition-all duration-150">
                  <div key={id} className="flex flex-row justify-between mb-3">
                    <div className="flex flex-row gap-2">
                      <h4>@{user.username}</h4>
                      <button className="hover:cursor-pointer">
                        <img src={follow} width={15} />
                      </button>
                    </div>
                    <h4>{post.category}</h4>
                  </div>
                  <div className="flex flex-row mb-2 items-center justify-between gap-10">
                    <h3 className="max-w-[800px]">{post.content}</h3>
                    <h4>{formatSubmittedTime(post.submitted_time)}</h4>
                  </div>
                  <div className="flex flex-row gap-4">
                    <div className="flex flex-row items-center gap-2">
                      <span
                        className={`opacity-100 hover:cursor-pointer transition-all duration-300`}
                      >
                        <img src={like} width={18} />
                      </span>
                      <h5>{post.likes}</h5>
                    </div>
                    <span
                      onClick={(editedPost) => editPost(editedPost, post.id)}
                      className={`${
                        post.user_id !== user.id ? "hidden" : ""
                      }  hover:cursor-pointer transition-all duration-300`}
                    >
                      <img src={edit} width={18} />
                    </span>
                    <span
                      className={`${
                        post.user_id !== user.id ? "hidden" : ""
                      }  hover:cursor-pointer transition-all duration-300`}
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

        <div className="fixed bottom-0 w-full flex justify-center">
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
              className="border-[#8884] md:w-[350px] lg:w-[500px] border-0 px-4 py-2 rounded-md"
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

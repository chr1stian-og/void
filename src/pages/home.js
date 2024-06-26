import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import attach from "../assets/images/paperclip.svg";
import remove from "../assets/images/trash-2.svg";
import follow from "../assets/images/user-plus.svg";
import UserAccount from "../components/UserAccount";

//Global Variables
const image = require("../assets/images/pexels-monstera-9432635-scaled.jpg");
const sendButton = require("../assets/images/void2.png");
const api = axios.create({ baseURL: "http://localhost:3001" });

function Home({}) {
  //References
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);

  //Hooks
  let navigate = useNavigate();

  //States
  const [userLogged, setUserLogged] = useState({
    id: 0,
    username: "chr1stian.og",
  });

  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState();
  const [newPost, setNewPost] = useState({
    category: "Thought",
    content: "",
    userId: userLogged?.id,
    username: userLogged?.username,
    image: null,
  });

  useEffect(() => {
    if (userLogged === null) {
      return navigate("/login", { replace: true });
    }
    fetchPosts();
  }, []);

  const fetchLikes = async () => {
    await api
      .post(`/api/getLikedPosts`, { userId: userLogged?.id })
      .then((res) => {
        setLikedPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchPosts = async () => {
    await api
      .get(`/api/posts`)
      .then((res) => {
        setPosts(res.data);
        fetchLikes();
        inputRef.current.focus();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendNewPost = () => {
    if (newPost.content.length === 0 && newPost.image === null) {
      return alert("Can't leave it blank");
    }

    const formData = new FormData();
    formData.append("category", newPost.category);
    formData.append("content", newPost.content);
    formData.append("userId", newPost.userId);
    formData.append("username", newPost.username);
    formData.append("image", newPost.image);

    api
      .post("/api/newPost", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setNewPost({ ...newPost, content: "", image: null });
        document.getElementById("content").value = "";
        document.getElementById("image").value = "";
        fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = (postId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Post?"
    );

    if (confirmed) {
      api
        .post("/api/deletePost", { postId: postId })
        .then((res) => {
          fetchPosts();
        })
        .catch((err) => {
          alert("Couldn't delete the post");
          console.log(err);
        });
    }
  };

  const likePost = (likedPostId) => {
    api
      .post("/api/likePost", { userId: userLogged?.id, postId: likedPostId })
      .then((res) => {
        fetchPosts();
      });
  };

  //utils
  const formatSubmittedTime = (timeString) => {
    const date = new Date(timeString);
    const formattedTime = date.toLocaleTimeString();
    return `${formattedTime}`;
  };

  const removeImage = () => {
    setNewPost({ ...newPost, image: null });
  };

  //Handlers
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

  const handleImageChange = (e) => {
    setNewPost({ ...newPost, image: e.target.files[0] });
  };

  return (
    <>
      <Navbar userLogged={userLogged?.username} />
      <UserAccount userLogged={userLogged} />

      <div className="flex flex-col my-5 justify-center align-center">
        <div className="max-h-[700px] overflow-y-auto flex flex-col items-center mt-20">
          {posts.length > 0 ? (
            posts
              .slice()
              .reverse()
              .map((post, id) => {
                const bufferToBase64 = (buffer) => {
                  if (!buffer || !buffer.length) return null;
                  const binary = new Uint8Array(buffer).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ""
                  );
                  return `data:image/png;base64,${btoa(binary)}`;
                };

                return (
                  <div
                    key={id}
                    className="flex z-50 flex-col mx-4 min-w-[300px] xs:w-[450px] sm:w-[600px] md:w-[800px] lg:w-[1000px]  transition-all duration-150"
                  >
                    <div className="flex flex-row justify-between mb-1">
                      <div className="flex flex-row gap-2">
                        <h4>@{post.username}</h4>
                        <button
                          onClick={() => {
                            alert("Now follwing " + post.username);
                          }}
                          className={` ${
                            post.user_id !== userLogged?.id ? "" : "hidden"
                          } hover:cursor-pointer`}
                        >
                          <img src={follow} width={15} />
                        </button>
                      </div>
                      <h4>{post.category}</h4>
                    </div>
                    {post.image?.data && (
                      <div className="flex flex-row gap-4">
                        <img
                          src={image}
                          className="max-w-96"
                          alt="Post Image"
                        />
                      </div>
                    )}

                    <div className="flex flex-row items-center justify-between gap-10">
                      <h3 className="max-w-[800px]">{post.content}</h3>
                      <h4>{formatSubmittedTime(post.submitted_time)}</h4>
                    </div>

                    <div className="flex flex-row gap-4">
                      <div className="flex flex-row items-center gap-2 ">
                        <span
                          onClick={() => likePost(post.id)}
                          className={`z-50 opacity-100 p-2 hover:cursor-pointer ml-[-14px] mr-[-8px] transition-all duration-150`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-6 hover:cursor-pointer ${
                              likedPosts &&
                              likedPosts?.find(
                                (item) => item.post_id === post.id
                              )
                                ? "text-[#FF0054]"
                                : "none"
                            }`}
                            fill={`${
                              likedPosts &&
                              likedPosts?.find(
                                (item) => item.post_id === post.id
                              )
                                ? "#FF0054"
                                : "none"
                            }`}
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
                        onClick={() => deletePost(post.id)}
                        className={`${
                          post.user_id !== userLogged?.id ? "hidden" : ""
                        }  hover:cursor-pointer p-2 transition-all duration-150`}
                      >
                        <img src={remove} width={18} />
                      </span>
                    </div>
                    <hr className="w-full border-t-1 border-[#ffffff2c] my-4" />
                  </div>
                );
              })
          ) : (
            <div>No posts available</div>
          )}
        </div>

        <div className="fixed  z-40 bottom-5 w-full flex justify-center">
          <div className="flex flex-row mx-20 mt-52 justify-center items-center gap-2">
            <select
              className="bg-[#FF0054] hover:bg-[#ff00559c] duration-150 transition-all hover:cursor-pointer  border-0 px-4 py-2 rounded-md"
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

            <div className="items-center flex flex-row gap-2 transition-all duration-150">
              <input
                id="image"
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <button
                onClick={() => fileInputRef.current.click()}
                className="bg-[#8884] hover:bg-[#88888829] duration-150 transition-all rounded-md px-8 py-2 bold"
              >
                <div className="flex flex-row gap-4">
                  <img
                    src={attach}
                    width={20}
                    alt="attach"
                    className="bold text-sm uppercase"
                  />
                  {newPost.image && <span className="buttonText">1</span>}{" "}
                </div>
              </button>
              {newPost.image && (
                <button
                  className="bg-[#8884] hover:bg-[#88888829] duration-150 transition-all rounded-md px-8 py-2 bold"
                  onClick={removeImage}
                >
                  <div className="flex flex-row gap-4">
                    <img
                      src={remove}
                      width={20}
                      className="bold text-sm uppercase"
                    />
                  </div>
                </button>
              )}
            </div>

            <button
              onClick={sendNewPost}
              className="bg-[#FF0054]  hover:bg-[#ff00559c] duration-150 transition-all rounded-md px-8 py-2 bold"
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

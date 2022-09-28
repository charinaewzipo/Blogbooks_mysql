import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";

import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
const Single = () => {
  const [post, setPost] = useState({});
  const location = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${location}`);
        setPost(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [location]);

  const handleDelete = async () => {
    await axios.delete(`/posts/${location}`);
    navigate("/");
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  return (
    <>
      <Navbar />
      <div className="single">
        <div className="content">
          <img src={`../uploads/${post?.img}`} alt="" />
          <div className="user">
            <img src={post?.userIMG} alt="" />
            <div className="info">
              <span>{currentUser.username}</span>
              <p>Posted {moment(post.date).fromNow()}</p>
            </div>
            {currentUser.username === post.username && (
              <div className="edit">
                <Link to={`/write?edit=2`} state={post}>
                  <img src={Edit} alt="" />
                </Link>
                <img onClick={handleDelete} src={Delete} alt="" />
              </div>
            )}
          </div>
          <h1>{post.title}</h1>
          <p>{getText(post.desc)}</p>
        </div>
        <Menu cat={post.cat} />
      </div>
      <Footer />
    </>
  );
};

export default Single;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./components.css";
import {
  BiCommentAdd,
  BiLike,
  BiDislike,
  BiSolidUserCircle,
} from "react-icons/bi";
import {AiFillDelete,AiFillEdit} from 'react-icons/ai'
import { RiUserFollowFill } from "react-icons/ri";
import { toast } from "react-toastify";
export default function Card({ cardDetails, check,Person }) {
  const Navigate = useNavigate();
  var id = JSON.parse(localStorage.getItem("User"))._id;
  const follow = async (id, name) => {
    const result = await fetch("http://localhost:8000/api/v1/follow", {
      method: "POST",
      body: JSON.stringify({ id, name }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();

    if (data.success) {
      toast.success(data.message);
      Navigate("/");
    } else {
      toast.warning(data.message);
      Navigate("/");
    }
    //console.log(id,name)
  };
  const Unfollow = async (id, name) => {
    const result = await fetch("http://localhost:8000/api/v1/unfollow", {
      method: "POST",
      body: JSON.stringify({ id, name }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();

    if (data.success) {
      toast.success(data.message);
      Navigate("/");
    } else {
      toast.warning(data.message);
      Navigate("/");
    }
    //console.log(id,name)
  };
  const handleDelete=async(id)=>{
    const result = await fetch(`http://localhost:8000/api/v1/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();

    if (data.success) {
      toast.success(data.message);
      Navigate("/");
    } else {
      toast.warning(data.message);
      Navigate("/");
    }
  }
 
  return (
    <>
      <div className="card" style={{ width: "350px", height: "350px" }}>
        <div className="d-flex mx-2 flex-row mt-3">
          <h1 className="mx-2">
            <BiSolidUserCircle />
          </h1>
          <h3 className="mt-3">{cardDetails.userName}</h3>
          {Person === true && (id != cardDetails.user )?  check  ? (
            <button
              className="btn btn-success fw-bold text-white ms-auto"
              onClick={() => Unfollow(id, cardDetails.userName)}
            >
              UnFollow
            </button>
          ) : (
            <button
              className="btn btn-success fw-bold text-white ms-auto"
              onClick={() => follow(id, cardDetails.userName)}
            >
              Follow
            </button>
          ): (<>
              <AiFillEdit className="ms-auto border rouded mt-3 fw-bold fs-3" onClick={()=>Navigate(`/Edit/${cardDetails._id}/${cardDetails.title}/${cardDetails.body}`)}/>
              <AiFillDelete className="mx-2 mt-3 border-3 rouded fw-bold fs-3" onClick={()=>handleDelete(cardDetails._id)}/>

          </>)}
        </div>
        <hr />
        <div className="card-body mt-2">
          <h5 className="card-title text-center">{cardDetails.title}</h5>
          <p className="card-text">{cardDetails.body}</p>
          <hr />
          <div className="d-flex flex-row mx-5">
            <button className="btn btn-success text-white fs-5 mx-2 fw-bold">
              <BiLike />
            </button>
            <button className="btn btn-success text-white fs-5 mx-2 fw-bold">
              <BiDislike />
            </button>
            <button className="btn btn-success text-white fs-5 mx-2 fw-bold">
              <BiCommentAdd />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

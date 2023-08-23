import React, { useState } from 'react'
import "./screens.css";
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import {MdAccessibilityNew} from 'react-icons/md'
export default function Create() {
    const navigate=useNavigate();
    const [title,setTitle]=useState("");
    const [body,setBody]=useState("");
    
    var id = JSON.parse(localStorage.getItem("User"))._id;
    var userName = JSON.parse(localStorage.getItem("User")).name

    const handleSubmit=async()=>{
        var res = await fetch("http://localhost:8000/api/v1/createTweet", {
            method: "post",
            body: JSON.stringify({title,body,id,userName}),
            headers: {
              "Content-Type": "application/json",
            },
          });
      
          res = await res.json();
          if(res.success){
              toast.success(res.message);
              navigate('/');
          }else{
              toast.warning(res.message)
          }
    }
  return (
    <>
         <section className="login">
          <div className="container  mt-5">
            <div
              className="row d-flex justify-content-center align-items-center "
              style={{ marginTop: "200px" }}
            >
             
              <div className="  col-6 ">
                <div
                  className="card shadow-2-strong"
                  style={{ borderRadius: "1rem" }}
                >
                  <div className="card-body p-5 text-center">
                    <h3 className="mt-3"><span className="fw-bold mx-2"></span><MdAccessibilityNew/>Post a new Tweet</h3>
                    <hr className="mx-auto  w-25"></hr>
                    <div className="form-outline mt-4 mb-4">
                      <input
                        type="text"
                        id="typeEmailX-2"
                        className="form-control form-control-lg"
                        placeholder="Title"
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                      />
                    </div>
                    <div className="form-outline mt-4 mb-4">
                      <input
                        type="text"
                        id="typeEmailX-2"
                        className="form-control form-control-lg"
                        placeholder="Description"
                        value={body}
                        onChange={(e)=>setBody(e.target.value)}
                      />
                    </div>
                    
                    {/* Checkbox */}
                    <button
                      className="btn bg-success text-white btn-lg btn-block"
                      type="submit"
                     onClick={handleSubmit}
                    >
                      Post
                    </button>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
       
        <div className="copyright_main ">
          <div className="container mt-4">
            <p className="copy_text text-center fw-bold text-white">
              © Mini Twitter.
            </p>
          </div>
        </div>
    </>
  )
}

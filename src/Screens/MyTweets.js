import React, { useEffect, useState } from "react";
import Card from "../components/Card";

export default function MyTweets() {
  const [Tweets, setTweets] = useState([]);
  const user = JSON.parse(localStorage.getItem("User"))

  const fetchData = async () => {
    var response = await fetch("http://localhost:8000/api/v1/allTweets", {
      method: "POST",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
      },
    });
    var data = await response.json();
    if (data.success) {
      setTweets(data.result);
    }
  };

  useEffect(() => {
    fetchData();

    

    //eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="container mt-5">
       
        <div className="row mt-3">
          {Tweets.length > 0 ? (
            Tweets.filter((tweet)=>{ return tweet.user === user._id}).map((x)=>{
                return (
                    <>
                        <Card cardDetails={x} check={true} Person={false}/>
                    </>
                )
            })
          ) : (
            <>
              <h3 className="text-center mt-5 text-white">
               EMPTY
              </h3>
            </>
          )}
        </div>
      </div>
    </>
  );
}

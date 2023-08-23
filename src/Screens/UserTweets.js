import React, { useEffect, useState } from "react";
import Card from "../components/Card";

export default function UserTweets() {
  const [Tweets, setTweets] = useState([]);
  const id = JSON.parse(localStorage.getItem("User"))._id;
  const fetchData = async () => {
    var response = await fetch("http://localhost:8000/api/v1/mypost", {
      method: "POST",
      body: JSON.stringify({id}),
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
  }, [Tweets]);
  return (
    <>
      <div className="container mt-5">
      <div className="row mt-3">
          {Tweets.length > 0 ? (
            <>
              {Tweets.map((tweet, idx) => {
                return (
                  <>
                    <div className="col-md-3 mx-3">
                      <Card cardDetails={tweet} />
                    </div>
                  </>
                );
              })}
            </>
          ) : (
            <>
              <h3 className="text-center mt-5 text-white">
                Opp's Something went Wrong
              </h3>
            </>
          )}
        </div>
      </div>
    </>
  );
}

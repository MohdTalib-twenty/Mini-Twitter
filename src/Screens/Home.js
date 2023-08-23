import React, { useEffect, useState } from "react";
import Card from "../components/Card";

export default function Home() {
  const [Tweets, setTweets] = useState([]);
  const [user,setUser]=useState();
  const [following,setFollowing]=useState([]);
  const [number,setNumber]=useState(0);
  

 
  const fetchUser = async (req, res) => {
    var id = JSON.parse((localStorage.getItem("User")))._id;
 
    var response = await fetch("http://localhost:8000/api/v1/find", {
      method: "POST",
      body: JSON.stringify({id}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    var data = await response.json();
    if (data.success) {
      var x= data.user
      console.log(x);
      setNumber(x.numFollowing)
      setFollowing(x.following)
    }
  };

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
    fetchUser();
    

    //eslint-disable-next-line
  }, []);
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
                      {number > 0 ? (
                         following.find((p)=>p === tweet.user) ? <Card cardDetails={tweet} check={true}  Person={true}/> : <Card cardDetails={tweet} check={false} Person={true} />
                      ) : (
                        <>
                          <Card cardDetails={tweet} check={false} Person={true}/>
                        </>
                      )}
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

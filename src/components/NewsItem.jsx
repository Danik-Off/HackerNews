import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Caching } from "../scripts/Caching";

const NewsItem = ({ id }) => {
    
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  const fetchNewsItem = async () => {
    try {
      const response = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
      );
      if (!response.ok) {
        throw new Error("Ошибка при выполнении запроса");
      }
      const data = await response.json();
      setData(data);
      Caching("news"+id,data);
     
    } catch (error) {
      console.error("Произошла ошибка:", error);
    }
  };

  useEffect(() => {
    
    const cach =  Caching("news"+id);
    cach? setData(cach):fetchNewsItem();
   
  }, []);
  
  return (
    <li onClick={() => navigate("/news/" + id)}>
      {data ? (
        <>
          <div>
            <h2>{data.title}</h2>
            <div className="details">
              <span className="rating">like {data.score}</span> | by{" "}
              <span className="author">{data.by}</span> |{" "}
              <span className="date">
                {new Date(data.time * 1000).toLocaleDateString()}
              </span>
            </div>
          </div>
        </>
      ) : (
        <p>Загрузка...</p>
      )}
    </li>
  );
};

export default NewsItem;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Caching } from "../scripts/Caching";
import CommentsTree  from "../components/CommentsTree";

import "./NewsDetail.scss"

const NewsDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
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
      Caching("news" + id, data);
    } catch (error) {
      console.error("Произошла ошибка:", error);
    }
  };

  useEffect(() => {
    const cach = Caching("news" + id);
    cach ? setData(cach) : fetchNewsItem();
    console.log(cach,data);
    
  }, [id]);

  return (
    <>
      <button onClick={() => navigate("/")}>Назад</button>
      <hr />
      {data ? (
        <div className="news-detail">
          <h2>{data.title}</h2>
        
          <div className="details">
            <span className="like">like {data.score}</span> | by{" "}
            <span className="author">{data.by}</span>&nbsp; |&nbsp;
            <span className="date">
              {new Date(data.time * 1000).toLocaleDateString()}
            </span>
          </div>
          <p dangerouslySetInnerHTML={{ __html: data.text }}></p>
          {data.url ? (
          <p>Оригинал новости:<a href={data.url}>{data.url}</a></p>
          ):null}
          <hr/>
          <h3>Комментарии</h3>
           <ul>

           </ul>
        </div>
      ) : (
        <p>Загрузка...</p>
      )}
    </>
  );
};

export default NewsDetail;

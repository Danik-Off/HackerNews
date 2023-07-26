import React, { useState, useEffect } from "react";
import "./CommentsTree.scss";
import { Caching } from "../scripts/Caching";

const CommentsTree = ({ kidsIds }) => {
  const [count, setCount] = useState(0);

  const fetchNewsItem = async (id) => {
    try {
      const response = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
      );
      if (!response.ok) {
        throw new Error("Ошибка при выполнении запроса");
      }
      const data = await response.json();
      Caching("comment" + id, data);
      if (data.kids) {
        setCount((prevCount) => prevCount + data.kids.length);
        for (let child of data.kids) {
          fetchNewsItem(child);
        }
      }
    } catch (error) {
      console.error("Произошла ошибка:", error);
    }
  };

  useEffect(() => {
    if (kidsIds) {
      setCount(kidsIds.length);
      for (let child of kidsIds) {
        fetchNewsItem(child);
      }
    }
  }, [kidsIds]);

  return (
    <>
      <h3>Комментарии</h3>
      {count}
      <ul className="comments">
        {kidsIds ? (
          kidsIds.map((commentId) => <Comment key={commentId} id={commentId} />)
        ) : (
          <div>Комментариев нет</div>
        )}
      </ul>
    </>
  );
};

const Comment = ({ id }) => {
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
      Caching("comment" + id, data);
    } catch (error) {
      console.error("Произошла ошибка:", error);
    }
  };

  useEffect(() => {
    const cach = Caching("comment" + id);
    cach ? setData(cach) : fetchNewsItem();
  }, [id]);

  return (
    <li className="comment">
      {data ? (
        <>
          <p dangerouslySetInnerHTML={{ __html: data.text }}></p>
          <div className="comment-author">{data.by}</div>
          <div className="comment-time">
            {new Date(data.time * 1000).toLocaleDateString()}
          </div>
          {data.kids && data.kids.length > 0 && (
            <ul className="comment-children">
              <CommentsTree kidsIds={data.kids} />
            </ul>
          )}
        </>
      ) : (
        <div className="updateWin">Загрузка</div>
      )}
    </li>
  );
};

export default CommentsTree;

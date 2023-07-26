import React, { useState, useEffect } from "react";
import NewsItem from "../components/NewsItem";

import "./Home.scss";

const Home = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
      );
      if (!response.ok) {
        throw new Error("Ошибка при запросе");
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Ошибка при запросе:", error);
    }
  };
  
  useEffect(() => {
    fetchData();

    const intervalId = setInterval(fetchData, 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  const newArray = [...data.slice(0, 101)];
  const listNews = newArray.map((news) => (
    <NewsItem key={news} id={news}></NewsItem>
  ));

  return (
    <>
      <button onClick={fetchData}> Обновить</button>
      <hr></hr>
      {
        data?( <div>
            <ul className="listNews">{listNews}</ul>
          </div>):(<div className="updateWin">Загрузка</div>)
      }
     
    </>
  );
};

export default Home;

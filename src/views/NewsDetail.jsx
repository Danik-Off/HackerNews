import React,{useState,useEffect} from "react";
import { useParams,useNavigate } from "react-router-dom";

const NewsDetail = () => {

  const navigate = useNavigate();
  
  const params = useParams();
  const id= params.id;


  const [data, setData] = useState(null);

  useEffect(() => {
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
      } catch (error) {
        console.error("Произошла ошибка:", error);
      }
    };

    fetchNewsItem();
  }, []);

  return (
    <>
    <button onClick={() => navigate("/")}>Назад</button>
    <hr></hr>
    {data ? (
        <>
          <div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
            <div className="details">
              <span className="like">like {data.score}</span> | by 
              <span className="author">{data.by}</span> |  
              <span className="date">
                {new Date(data.time * 1000).toLocaleDateString()}
              </span>
            </div>
          </div>
        </>
      ) : (
        <p>Загрузка...</p>
      )}
  
    </>
  );
};

export default NewsDetail;

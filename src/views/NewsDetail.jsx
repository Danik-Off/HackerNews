import React from "react";
import { useParams,useNavigate } from "react-router-dom";

const NewsDetail = () => {

  const navigate = useNavigate();
  
  const params = useParams();
  const prodId = params.id;

  return (
    <>
    <button onClick={() => navigate("/")}>Назад</button>
    <hr></hr>
      <h2>Новость {prodId}</h2>
    </>
  );
};

export default NewsDetail;

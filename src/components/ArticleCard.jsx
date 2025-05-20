import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArticleCard = ({ article }) => {
  const navigate = useNavigate();
  return (
    <div className="article-card">
      <img src={article.image} alt={article.title} className="article-card-image" />
      <div className="article-card-content">
        <h3>{article.title}</h3>
        <p>{article.description}</p>
        <button onClick={() => navigate(`/article/${article.id}`)}>See Details</button>
      </div>
    </div>
  );
};

export default ArticleCard; 
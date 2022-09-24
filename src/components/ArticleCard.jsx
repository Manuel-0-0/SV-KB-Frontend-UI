import React from 'react'
import { useSelector } from 'react-redux';
import { selectArticleById } from '../redux/article/articleApiSlice';

const ArticleCard = ({articleId}) => {
    const article = useSelector(state => selectArticleById(state, articleId))
  return (
    <div className="shadow-lg max-w-sm rounded-t-md overflow-hidden">
      <div className="">
        <div className=" block px-6 py-4">
          <div className="">
            {article.title}
          </div>
        </div>

        <div className="px-6">
          <p className="text-sm text-left">
            {article.content.substring(0, 250)}...
          </p>
        </div>
        <div className="py-4 px-6  text-left">
          {/* <Link to={`/article/${car._id}`} className="text-blue-500">
            Learn more...
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;

import noPicture from '../../assets/no-picture.png';
import { apiUrl } from '../../globalConstants';
import React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  id: string;
  title: string;
  content?: string;
  image?: string | null | undefined;
  date: string;
  onDelete?: () => void;
}

const NewsItem: React.FC<Props> = ({id, title, content, image, date, onDelete}) => {
  let newsImage = noPicture;

  if (image) {
    newsImage = apiUrl + '/' + image;
  }

  return (
    <>
        <div className="card mt-2">
          <img src={newsImage} className="card-img-top" alt={title} style={{width: '100%', height: '300px', objectFit: 'cover'}}/>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{content}</p>
            <p className="card-text">{date}</p>
            <NavLink to={`/news/${id}`} className="btn btn-primary">Read more</NavLink>
            <button className='btn btn-danger ms-3' onClick={onDelete}>Delete</button>
          </div>
        </div>
    </>
  );
};

export default NewsItem;
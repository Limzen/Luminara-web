import React from 'react';

/**
 * DirectoryCard
 * Props:
 * - image: string (image URL)
 * - name: string
 * - rating: number
 * - time: string
 * - location: string
 * - description: string
 * - onExploreDetail: function (optional)
 * - cardClass, imageClass, contentClass, titleRowClass, titleClass, ratingClass, infoRowClass, infoIconClass, descClass, exploreBtnClass: string (optional)
 */
const DirectoryCard = ({
  image,
  name,
  rating,
  time,
  location,
  description,
  onExploreDetail,
  cardClass = '',
  imageClass = '',
  contentClass = '',
  titleRowClass = '',
  titleClass = '',
  ratingClass = '',
  infoRowClass = '',
  infoIconClass = '',
  descClass = '',
  exploreBtnClass = '',
}) => {
  return (
    <div className={cardClass}>
      <img
        src={image}
        alt={name}
        className={imageClass}
      />
      <div className={contentClass}>
        <div>
          <div className={titleRowClass}>
            <span className={titleClass}>{name}</span>
            <span className={ratingClass}>
              <svg className="mr-1" width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>
              {rating}
            </span>
          </div>
          <div className={infoRowClass}>
            <span className="flex items-center gap-1">
              <svg className={infoIconClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /></svg>
              {time}
            </span>
            <span className="flex items-center gap-1">
              <svg className={infoIconClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 12.414a4 4 0 10-1.414 1.414l4.243 4.243a1 1 0 001.414-1.414z" /></svg>
              {location}
            </span>
          </div>
          <div className={descClass}>
            {description}
          </div>
        </div>
        <button
          className={exploreBtnClass}
          onClick={onExploreDetail}
        >
          Explore Detail
        </button>
      </div>
    </div>
  );
};

export default DirectoryCard; 
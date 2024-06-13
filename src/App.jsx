import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  return (
    <div id="title">
      <div className='place-content-center'>
        <h1><b>SENTIMENT ANALYSIS</b></h1>
      </div>
      <ReviewList />
    </div>
  );
}

function GUI({ review }) {
  const name = review.reviewer_name;
  const site_name = review.source.name;
  const rating = review.rating_review_score;
  const date = review.date;
  return (
    <div className='flex flex-col '>
      <div className='flex justify-between items-center pd-3'>
        <div className='flex flex-row items-center'>
          <b className='m-1'>{name}</b>
          <p className='m-1'>wrote a review at</p>
          <b className='m-1'>{site_name}</b>
        </div>
        <div className='flex flex-row justify-end items-center pr-2'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
          </svg>
        </div>
      </div>
      <div className='flex flex-row p-1'>
        <Stars rating={rating}></Stars>
        <div className='text-slate-500'>{date}</div>
      </div>
    </div>
  )
}

function Stars({ rating }) {
  const ar = new Array(10).fill(0);
  for (let i = 0; i < rating; i++) {
    ar[i] = 1;
  }
  return (
    <div className="stars flex flex-row">
      {ar.map((item, index) => (
        <div key={index}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={item === 1 ? '#ffe02e' : '#000000'} className="size-6">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
          </svg>
        </div>
      ))}
    </div>
  );
}

function ReviewList() {
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    axios
      .get(
        'https://gist.githubusercontent.com/Inshamhaque/4f4d718aa79a55330d7bbff1c55fb8bb/raw/8606d8927c2f4c5de928aacd0ddcf88f3b53dbee/reviews_data.json'
      )
      .then((response) => {
        setReviewList(response.data);
      })
      .catch((error) => {
        console.log('error fetching data: ', error);
      });
  }, []);

  return (
    <div>
      {reviewList.map((review) => (
        <div key={review.review_id}>
          <div className='flex flex-row '>
            <div className='m-2'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M2.25 2.25a.75.75 0 0 0 0 1.5H3v10.5a3 3 0 0 0 3 3h1.21l-1.172 3.513a.75.75 0 0 0 1.424.474l.329-.987h8.418l.33.987a.75.75 0 0 0 1.422-.474l-1.17-3.513H18a3 3 0 0 0 3-3V3.75h.75a.75.75 0 0 0 0-1.5H2.25Zm6.54 15h6.42l.5 1.5H8.29l.5-1.5Zm8.085-8.995a.75.75 0 1 0-.75-1.299 12.81 12.81 0 0 0-3.558 3.05L11.03 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l2.47-2.47 1.617 1.618a.75.75 0 0 0 1.146-.102 11.312 11.312 0 0 1 3.612-3.321Z" clipRule="evenodd" />
              </svg>
            </div>           
            <div>
              <GUI review={review} />
              <ReviewHighlighter review={review} />
            </div>
          </div>
          <br />
        </div>
      ))}
    </div>
  );
}

function ReviewHighlighter({ review }) {
  const analytics = review.analytics || [];
  let segment = [];
  let lastIndex = 0;
  let content = review.content;

  analytics.forEach((analytic, idx) => {
    const highlights = analytic.highlight_indices;
    highlights.forEach((indices) => {
      let [start, end, sentiment] = indices;
      if(start<0){
        start = 1;
      }
      if(end>review.content.length){
        end = (review.content.length) -1;;
      }
      if(start>end){
        return(
          <div>{review.content}</div>
        )
      }
      const category = analytic.category || 'Unknown';
      let color;
      switch (sentiment) {
        case 'Positive':
          color = '#D9F2DD';
          break;
        case 'Negative':
          color = '#F2DBD9';
          break;
        case 'Neutral':
          color = '#eaf09b6b';
          break;
        case 'Mixed':
          color = '#e8bd6d3d';
          break;
        default:
          color = 'transparent';
      }
      segment.push(content.slice(lastIndex, start));
      segment.push(
        <Tooltip key={`${idx} `} category={category} segment={content.slice(start, end)} color={color} />
      );
      lastIndex = end;
    });
  });

  segment.push(content.slice(lastIndex));

  return <div>{segment}</div>;
}

function Tooltip({ category, segment, color }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <span
      className="tooltip"
      style={{ backgroundColor: color, position: 'relative' }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {segment}
      {showTooltip && (
        <span className="tooltiptext" style={{
          visibility: 'visible',
          backgroundColor: 'black',
          color: '#fff',
          textAlign: 'center',
          borderRadius: '6px',
          padding: '5px',
          position: 'absolute',
          zIndex: 1,
          bottom: '125%',
          left: '50%',
          marginLeft: '-60px',
          opacity: 1,
          transition: 'opacity 0.3s'
        }}>
          {category}
        </span>
      )}
    </span>
  );
}

export default App;

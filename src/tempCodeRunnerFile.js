import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import axios from 'axios';

// function App(){
//   return(
//     <div id="title">
//       <h2>Review Sentiment Analysis</h2>
//       <ReviewList />
//     </div>
//   )
// }
// function ReviewList(){
//   const [reviewList,setreviewList] = useState([]);
//   useEffect(()=>{   axios.get('https://gist.githubusercontent.com/Inshamhaque/4f4d718aa79a55330d7bbff1c55fb8bb/raw/8606d8927c2f4c5de928aacd0ddcf88f3b53dbee/reviews_data.json')
//     .then((response)=>{
//       const data = response.data
//       setreviewList(data);
//     })
//     .catch((error)=>{
//       console.log("error fetching data:  ",error);
//     })
//   },[])
//   return(
//     <div>
//       {reviewList.map((reviews)=>{
//         return(
//           <>
//             <div key={reviews.id}>{reviews.review_id} : {reviews.content}</div>
//             <br />
//           </>
          
//         )
//       })}
//     </div>
//   )
// }
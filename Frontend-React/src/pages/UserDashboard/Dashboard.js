// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import logo from '../../styles/images/user.png';
// import { toast } from 'react-hot-toast';

// import "../../UserDashboardcss/UserDashboard.css";

// function Dashboard() {
//     const [books, setBooks] = useState([]);
//     const [bookStatuses, setBookStatuses] = useState({});
//     const [userName, setUserName] = useState("");
//     const [averageRatings, setAverageRatings] = useState({});

//     const userId = sessionStorage.getItem('userId');

//     useEffect(() => {
//         axios.get('http://localhost:8080/books')
//             .then(response => {
//                 setBooks(response.data);
//                 axios.get('http://localhost:8080/requests')
//                     .then(response => {
//                         const statusDict = response.data.reduce((acc, request) => {
//                             acc[request.book.id] = request.status;
//                             return acc;
//                         }, {});
//                         setBookStatuses(statusDict);
//                     });
//             })
//             .catch(error => console.log(error));
//     }, []);

//     useEffect(() => {
//         axios.get(`http://localhost:8080/users/${userId}`)
//             .then(response => setUserName(response.data.name));
//     }, [userId]);

//     useEffect(() => {
//         axios.get('http://localhost:8080/ratings')
//             .then(response => {
//                 const ratingMap = {};
//                 response.data.forEach(item => {
//                     const bookId = item.book.id;
//                     const rating = item.rating;
//                     if (ratingMap[bookId]) {
//                         ratingMap[bookId].totalRating += rating;
//                         ratingMap[bookId].numRatings += 1;
//                     } else {
//                         ratingMap[bookId] = { totalRating: rating, numRatings: 1 };
//                     }
//                 });
//                 const newAverageRatings = {};
//                 for (const [bookId, ratingInfo] of Object.entries(ratingMap)) {
//                     newAverageRatings[bookId] = (ratingInfo.totalRating / ratingInfo.numRatings).toFixed(1);
//                 }
//                 setAverageRatings(newAverageRatings);
//             });
//     }, []);

//     const handleBorrow = (id) => {
//         axios.post('http://localhost:8080/borrow', { user: { id: userId }, book: { id } })
//             .then(() => {
//                 axios.post('http://localhost:8080/requests', { user: { id: userId }, book: { id } })
//                     .then(() => {
//                         toast.success("Book requested");
//                         setTimeout(() => window.location.reload(), 500);
//                     })
//                     .catch(() => toast.error("Unable to request"));
//             })
//             .catch(() => toast.error("Failed, max 2 requests allowed"));
//     };

//     return (
//         <div style={{ background: '#f4f4f4', minHeight: '100vh', padding: '2rem 2rem 2rem 310px' }}>
//             <div style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 marginBottom: '2rem'
//             }}>
//                 <h3 style={{ color: '#2d6d05' }}>Hello, {userName}</h3>
//                 <img src={logo} alt="user" style={{ width: '80px', borderRadius: '120%' }} />
//             </div>

//             <div style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
//                 gap: '1.5rem'
//             }}>
//                 {books.map(book => (
//                     <div
//                         key={book.id}
//                         style={{
//                             background: '#fff',
//                             borderRadius: '10px',
//                             padding: '1rem',
//                             boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//                             transition: 'transform 0.3s, box-shadow 0.3s',
//                             height: '320px',
//                             overflow: 'hidden',
//                             display: 'flex',
//                             flexDirection: 'column',
//                             alignItems: 'center',
//                             justifyContent: 'space-between',
//                             cursor: 'pointer',
//                             transformOrigin: 'center',
//                             position: 'relative',
//                             zIndex: 0
//                         }}
//                         onMouseEnter={e => {
//                             e.currentTarget.style.transform = 'scale(1.03)';
//                             e.currentTarget.style.boxShadow = '0 6px 15px rgba(0,0,0,0.15)';
//                             e.currentTarget.style.zIndex = '2';
//                         }}
//                         onMouseLeave={e => {
//                             e.currentTarget.style.transform = 'scale(1)';
//                             e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
//                             e.currentTarget.style.zIndex = '0';
//                         }}
//                     >
//                         <img
//                             src={book.imageUrl || 'https://via.placeholder.com/100x140?text=No+Image'}
//                             alt={book.bookTitle}
//                             style={{
//                                 width: '100px',
//                                 height: '140px',
//                                 objectFit: 'cover',
//                                 borderRadius: '6px',
//                                 marginBottom: '0.5rem'
//                             }}
//                         />
//                         <h3 style={{
//                             fontSize: '1rem',
//                             margin: '0.3rem 0',
//                             textAlign: 'center',
//                             color: '#222'
//                         }}>{book.bookTitle}</h3>

//                         <p style={{
//                             fontSize: '0.8rem',
//                             color: '#6b5b95',
//                             textAlign: 'center',
//                             height: '35px',
//                             overflow: 'hidden',
//                             marginBottom: '0.4rem'
//                         }}>{book.description}</p>

//                         <div style={{ textAlign: 'center', fontSize: '0.8rem' }}>
//                             <p style={{ color: '#0074D9', margin: '2px 0' }}>
//                                 <strong>Qty:</strong> {book.quantity}
//                             </p>
//                             <p style={{ color: '#2ECC40', margin: '2px 0' }}>
//                                 <strong>Available:</strong> {book.availability}
//                             </p>
//                             <p style={{ color: '#FF851B', margin: '2px 0' }}>
//                                 <strong>Rating:</strong> {averageRatings[book.id] || "0.0"} / 5
//                             </p>
//                         </div>

//                         {bookStatuses[book.id] === 'REQUESTED' ? (
//                             <span style={{
//                                 marginTop: '0.4rem',
//                                 background: '#ccc',
//                                 padding: '6px 12px',
//                                 borderRadius: '6px',
//                                 color: '#333',
//                                 fontWeight: 'bold',
//                                 fontSize: '0.8rem'
//                             }}>Requested</span>
//                         ) : (
//                             <button
//                                 onClick={() => handleBorrow(book.id)}
//                                 style={{
//                                     marginTop: '0.5rem',
//                                     padding: '6px 12px',
//                                     border: 'none',
//                                     background: '#2d6d05',
//                                     color: '#fff',
//                                     borderRadius: '6px',
//                                     fontSize: '0.8rem',
//                                     cursor: 'pointer'
//                                 }}
//                             >
//                                 Request
//                             </button>
//                         )}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default Dashboard;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../../styles/images/user.png';
import { toast } from 'react-hot-toast';

import "../../UserDashboardcss/UserDashboard.css";

function Dashboard() {
    const [books, setBooks] = useState([]);
    const [bookStatuses, setBookStatuses] = useState({});
    const [userName, setUserName] = useState("");

    const userId = sessionStorage.getItem('userId');

    useEffect(() => {
        axios.get('http://localhost:8080/books')
            .then(response => {
                setBooks(response.data);
                axios.get('http://localhost:8080/requests')
                    .then(response => {
                        const statusDict = response.data.reduce((acc, request) => {
                            acc[request.book.id] = request.status;
                            return acc;
                        }, {});
                        setBookStatuses(statusDict);
                    });
            })
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8080/users/${userId}`)
            .then(response => setUserName(response.data.name));
    }, [userId]);

    const handleBorrow = (id) => {
        axios.post('http://localhost:8080/borrow', { user: { id: userId }, book: { id } })
            .then(() => {
                axios.post('http://localhost:8080/requests', { user: { id: userId }, book: { id } })
                    .then(() => {
                        toast.success("Book requested");
                        setTimeout(() => window.location.reload(), 500);
                    })
                    .catch(() => toast.error("Unable to request"));
            })
            .catch(() => toast.error("Failed, max 2 requests allowed"));
    };

    return (
        <div style={{ background: '#f4f4f4', minHeight: '100vh', padding: '2rem 2rem 2rem 310px' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem'
            }}>
                <h3 style={{ color: '#2d6d05' }}>Hello, {userName}</h3>
                <img src={logo} alt="user" style={{ width: '80px', borderRadius: '120%' }} />
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '1.5rem'
            }}>
                {books.map(book => (
                    <div
                        key={book.id}
                        style={{
                            background: '#fff',
                            borderRadius: '10px',
                            padding: '1rem',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            transition: 'transform 0.3s, box-shadow 0.3s',
                            height: '320px',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            transformOrigin: 'center',
                            position: 'relative',
                            zIndex: 0
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'scale(1.03)';
                            e.currentTarget.style.boxShadow = '0 6px 15px rgba(0,0,0,0.15)';
                            e.currentTarget.style.zIndex = '2';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                            e.currentTarget.style.zIndex = '0';
                        }}
                    >
                        <img
                            src={book.imageUrl || 'https://via.placeholder.com/100x140?text=No+Image'}
                            alt={book.bookTitle}
                            style={{
                                width: '100px',
                                height: '140px',
                                objectFit: 'cover',
                                borderRadius: '6px',
                                marginBottom: '0.5rem'
                            }}
                        />
                        <h3 style={{
                            fontSize: '1rem',
                            margin: '0.3rem 0',
                            textAlign: 'center',
                            color: '#222'
                        }}>{book.bookTitle}</h3>

                        <p style={{
                            fontSize: '0.8rem',
                            color: '#6b5b95',
                            textAlign: 'center',
                            height: '35px',
                            overflow: 'hidden',
                            marginBottom: '0.4rem'
                        }}>{book.description}</p>

                        <div style={{ textAlign: 'center', fontSize: '0.8rem' }}>
                            <p style={{ color: '#0074D9', margin: '2px 0' }}>
                                <strong>Qty:</strong> {book.quantity}
                            </p>
                            <p style={{ color: '#2ECC40', margin: '2px 0' }}>
                                <strong>Available:</strong> {book.availability}
                            </p>
                        </div>

                        {bookStatuses[book.id] === 'REQUESTED' ? (
                            <span style={{
                                marginTop: '0.4rem',
                                background: '#ccc',
                                padding: '6px 12px',
                                borderRadius: '6px',
                                color: '#333',
                                fontWeight: 'bold',
                                fontSize: '0.8rem'
                            }}>Requested</span>
                        ) : (
                            <button
                                onClick={() => handleBorrow(book.id)}
                                style={{
                                    marginTop: '0.5rem',
                                    padding: '6px 12px',
                                    border: 'none',
                                    background: '#2d6d05',
                                    color: '#fff',
                                    borderRadius: '6px',
                                    fontSize: '0.8rem',
                                    cursor: 'pointer'
                                }}
                            >
                                Request
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;

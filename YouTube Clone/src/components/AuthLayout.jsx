// import { useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import authService from '../appwrite/auth.js'
// import { SetContext } from '../contexts/setContext.jsx';

// const AuthLayout = ({ children }) => {
//     const navigate = useNavigate();
//     const { userData } = useContext(SetContext);

//     useEffect(() => {
//         async function checkVerification() {
//             if (!userData) {
//                 navigate("/login");
//                 return;
//             }

//             if (!userData?.emailVerification) {
//                 navigate('/verifyPage'); // Redirect unverified users
//             }
//         }
//         checkVerification();
//     }, [navigate]);

//     return children;

// }

// export default AuthLayout
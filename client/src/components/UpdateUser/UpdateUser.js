// import React, {useState} from 'react';
// import {useDispatch, useSelector} from "react-redux";
// import {update} from "../../redux/userSlice";
//
// const UpdateUser = () => {
//     const [username, setUsername] = useState("");
//     const [email, setEmail] = useState("")
//     const user = useSelector((state) => state.user)
//     const dispatch = useDispatch();
//     console.log(user.email)
//     const handleUpdate = (e) => {
//         e.preventDefault();
//         dispatch(update({username, email}))
//     }
//     return (
//         <div>
//             <form>
//                 <h1>{user.username} , {user.email}</h1>
//                 <input placeholder="Username" type="text" id="username" onChange={(e) => setUsername(e.target.value)} />
//                 <input placeholder="Email"  type="email" id="email" onChange={(e) => setEmail(e.target.value)} />
//                 {/*<input placeholder="Password"  type="password" id="password"  />*/}
//                 <button onClick={handleUpdate}>Submit</button>
//             </form>
//
//         </div>
//     );
// };
//
// export default UpdateUser;
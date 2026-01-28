import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addPassword } from '../features/password/passwordSlice';

const AddPassword = () => {
    const [info, setInfo] = useState({
        website: "",
        username: "",
        password: ""
    });

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(addPassword(info))
        setInfo({
            website: "",
            username: "",
            password: ""
        })
    }

    const handleChange = (e) => {
        setInfo((prev) => {
            return {...prev, [e.target.name]: e.target.value}
        })
    }
    

    return (
        <div>
            <h2>Add a Password</h2>
            <form onSubmit={submitHandler}>
                <label htmlFor="website">Website:</label>
                &nbsp;&nbsp;
                <input type="text" id="website" name="website" onChange={handleChange} value={info.website} required={true}/>
                <br /><br />
                <label htmlFor="username">Username:</label>
                &nbsp;&nbsp;
                <input type="text" id="username" name="username" onChange={handleChange} value={info.username} required={true}/>
                <br /><br />
                <label htmlFor="password">Password:</label>
                &nbsp;&nbsp;
                <input type="password" id="password" name="password" onChange={handleChange} value={info.password} required={true}/>
                 <br /><br />
                <button className="btn">Submit</button>
            </form>
        </div>
        )
}

export default AddPassword
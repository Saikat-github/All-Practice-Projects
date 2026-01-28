import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletePassword } from '../features/password/passwordSlice';
import { nanoid } from '@reduxjs/toolkit';

const AllInfo = () => {
  const passwords = useSelector((state) => state.passwords)
  const [copied, setCopied] = useState(false)

  const dispatch = useDispatch();


  const copytext = (text) => {
    window.navigator.clipboard.writeText(text);
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000);
  }


  const maskInfo = (info) => {
    let str = "";
    for (let i = 0; i < info.length; i++) {
      str += "*"
    }
    return str
  }


  // Conditional Rendering - Return statement
  return (
    <div>
      <h2>Your Passwords {copied ? "(copied)" : ""}</h2>
      <table>
        <thead>
          <tr>
            <th>Website</th>
            <th>Username</th>
            <th>Password</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {passwords.length == 0 ? <tr><h4>No Data Found</h4></tr> : (passwords.map((e) => (
            <tr key={nanoid()}>
              <td>{e.website} <svg onClick={() => copytext(e.website)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z" /></svg></td>
              <td>{e.username} <svg onClick={() => copytext(e.username)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z" /></svg></td>
              <td>{maskInfo(e.password)} <svg onClick={() => copytext(e.password)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z" /></svg></td>
              <td><button onClick={() => dispatch(deletePassword(e.website))} className='delBtn'>Delete</button></td>
            </tr>
          )))}
        </tbody>
      </table>
    </div>
  )




}

export default AllInfo
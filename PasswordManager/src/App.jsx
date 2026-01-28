import { useState } from 'react'
import './App.css'
import { AddPassword, AllInfo, Navbar } from './components'
import {Provider} from 'react-redux'
import {store} from './app/store'

function App() {

  return (
    <Provider store={store}>
      <Navbar />
      <div className="container">
        <h1>Password Manager</h1>
        <p>We're thrilled to have you here. Your digital life contains a myriad of passwords,
          and we kmow how
          challenging it can be to manage them all. That's why we're here to make it easy for you.
        </p>
        <AllInfo />
        <AddPassword />
      </div>
    </Provider>
  )
}

export default App

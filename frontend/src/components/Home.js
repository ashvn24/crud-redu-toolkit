import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';

function Home() {

  const navigate = useNavigate()
  const token = useSelector((state) => state.persistedReducer.token);

  useEffect(() => {
    if (token){
      navigate('/home')
    }else{
      navigate('/')
    }
  }, [])
  
  return (
    <div>
      <h1>Welcome</h1>
    </div>
  )
}

export default Home

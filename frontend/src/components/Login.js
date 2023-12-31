import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Checkbox, Label, TextInput } from 'flowbite-react';
// import { baseFetch  } from "../FetchURL/fetch"; 
import { useDispatch } from 'react-redux';
// import { setUser } from "../Store/Datastore";
import { Link, useNavigate } from 'react-router-dom';
import { getUser } from "../Store/Datastore";
import { useSelector } from 'react-redux';


function Login() {
  const token = useSelector((state) => state.persistedReducer.token);

  useEffect(() => {
    if (token){
      navigate("/home");
    }
    else{
      navigate('/')
    }
   
  }, [])
  
    
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  
  
  const ref = useRef()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    
    ref.current.focus()

  }, [])
  
  const handleSubmit = (e)=>{
    e.preventDefault()
    try {
       dispatch(getUser({ email, password }));
      navigate('/home');
    } catch (error) {
      console.log(error);
    }
    

  }

  
  
  return (
    <div className='flex items-center justify-center h-screen'>
    <Card className="w-full max-w-sm">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Email Input */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            id="email1"
            type="email"
            ref={ref}
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
  
        {/* Password Input */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput
            id="password1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
        </div>
  
        {/* Remember me checkbox */}
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
        </div>
  
        {/* Submit Button */}
        <Button type="submit">Submit</Button>
      </form>
      <Link to="/register"><p className="text-blue-600 underline">Dont have an account register here</p></Link>
    </Card>
  </div>
  
  )
}

export default Login

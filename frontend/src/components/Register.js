import React, { useState } from "react";
import { Button, Card, Label, TextInput } from "flowbite-react";
import { baseFetch } from "../FetchURL/fetch";
import { Link, useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit =async(e)=>{
    e.preventDefault()
    try {
      const response = await baseFetch('register',{
        method : 'POST',
        body : JSON.stringify({
          name,
          email,
          password,
        }),
      }); 
      
      if(response){
        console.log(response);
        navigate('/')
      }
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-sm">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Your Name" />
            </div>
            <TextInput
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              id="password1"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit">Submit</Button>
        </form>
        <Link to="/"><p className="text-blue-600 underline">Have an account? Login here</p></Link>

      </Card>
    </div>
  );
}

export default Register;

import React, { useState } from 'react';
import { signIn, signUp } from '../services/auth';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { username, password } = formData;

    // Add your login logic here, such as sending a request to a server for authentication

    console.log('username:', username);
    console.log('Password:', password);
    const response = await signUp(formData)
    if (response.data && response.data.token) {
      console.log('success');
      localStorage.setItem("token", response.data.token)
      history.push("/")
      // Additional logic if the order is successful
    } else {
      console.error('Failed to place order.');
      // Additional error handling logic
    }
    // You can add your login logic here, such as sending a request to a server for authentication
  };

  return (
    <form className='col-lg-6' style={{ margin: '0 auto', width: '50%', paddingTop: '40px' }} onSubmit={handleSubmit}>
      <h3>Register</h3>
      <div className="mb-3">
        <label>username</label>
        <input
          type="username"
          className="form-control"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter username"
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Login;

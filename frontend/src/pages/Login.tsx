import React, { useState } from 'react';
import { signIn } from '../services/auth';
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
    const response = await signIn(formData)
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
      <h3>Sign In</h3>
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
      <div className="mb-3">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <p className="forgot-password text-right">
        Forgot <a href="#">password?</a>
      </p>
    </form>
  );
};

export default Login;

import React, { Components } from 'react';
import { Link } from 'react-router-dom';

function LoginLink() {
  return <Link to="/login" className="btn sec-btn">Login</Link>;
}

export default LoginLink;

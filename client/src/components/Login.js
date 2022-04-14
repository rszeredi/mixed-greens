import React from 'react';
import { LOGIN_URL } from '../util/spotify';
import './Login.css';

function Login() {
	return (
		<div className="Login">
			<div className="Login-logo">
				<img
					src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
					alt=""
				/>
			</div>
			<div className="d-flex justify-content-center">
				<a className="Login-btn btn btn-success btn-lg rounded-pill" href={LOGIN_URL}>
					LOGIN
				</a>
			</div>
		</div>
	);
}

export default Login;

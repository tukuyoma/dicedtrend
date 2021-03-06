import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from '../assets/Button';
import { LoginSection, RegularAuth } from './RegisterStyle';
import { Main } from '../assets/Layout';
import preloader from '../assets/preloader.gif';
import { useSelector } from 'react-redux';
import { login } from '../../redux/actions/authActions';
import StyledLink from '../assets/StyledLink';
import useForm from './useForm';
import loginValidation from './loginValidation';

export default function Login() {
	const initialState = {
		email: '',
		password: '',
	};
	const auth = useSelector((state) => state.auth);
	const { values, errors, buttonLoading, onChange, onSubmit } = useForm(
		login,
		loginValidation,
		initialState
	);
	if (auth.isAuthenticated && auth.user) return <Redirect to="/" />;
	return (
		<Fragment>
			<Main>
				<LoginSection>
					<h4 className="auth-title">Login with email</h4>
					<RegularAuth>
						<form onSubmit={onSubmit}>
							<input
								type="text"
								className="input"
								placeholder="Email"
								name="email"
								value={values.email}
								onChange={onChange}
								autoComplete="off"
							/>
							{errors.email && (
								<p className="form-error">
									<i className="fas fa-exclamation-circle"></i>
									{errors.email}
								</p>
							)}
							<input
								type="password"
								className="input"
								placeholder="Password"
								name="password"
								onChange={onChange}
								value={values.password}
								autoComplete="off"
							/>
							{errors.password && (
								<p className="form-error">
									<i className="fas fa-exclamation-circle"></i>
									{errors.password}
								</p>
							)}

							<StyledLink to="/forgot-password">
								<p className="forgot-password">Forgot password</p>
							</StyledLink>
							{buttonLoading ? (
								<Button primary disabled={buttonLoading}>
									loading
									<img src={preloader} alt="preloader" />
								</Button>
							) : (
								<Button>Login</Button>
							)}
						</form>
					</RegularAuth>
					<div className="tagline">
						<StyledLink to="/register">
							<p>
								Dont have an account?{' '}
								<span style={{ color: '#e74c3c' }}>Register</span>
							</p>
						</StyledLink>
					</div>
				</LoginSection>
			</Main>
		</Fragment>
	);
}

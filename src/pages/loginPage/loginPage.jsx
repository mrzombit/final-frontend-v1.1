/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import "./loginPage.css";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import ConditionalLink from "../../components/common/conditionalLink";
import { setAuthUsername, getToken } from "../../features/usersSlice";

function LoginPage() {
  
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const auth = useSelector(state => state.users.auth)

  const { register, handleSubmit } = useForm();

  const doSubmit = (input) => {
    dispatch(setAuthUsername(input.username))
    dispatch(getToken({ username: input.username, password: input.password }))
    navigate('/Workspace')
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-6">
          <img
            src={require("../../assets/login-img.png")}
            className="card-img-2"
            style={{ transform: "scale(0.7) translate(-10%, 0%)" }}
          />
        </div>
        <div className="col-sm-4 lp" style={{ transform: " translate(0%, 20%)" }}>
          <form onSubmit={handleSubmit(doSubmit)}>
            <p className="head-font ">Welcome back </p>
            <p className="low-font">Sign in to your account</p>

            <div className="form-group text-field my-4">
              <input type="username"
                className="form-control"
                id="exampleInputUsername1"
                aria-describedby="usernameHelp"
                {...register('username', { required: true })}
                required />
              <label>Username</label>
            </div>

            <div className="form-group text-field my-3">
              <input type="password"
                className="form-control"
                id="exampleInputPassword1"
                {...register('password', { required: true })}
                required />
              <label>Password</label>
            </div>

            <div className="d-flex justify-content-between">
              <Link className="link-text">
                <p>Forget Password ?</p>
              </Link>
              <ConditionalLink condition={auth.isLoggedIn} to="/Workspace" style={{ textDecoration: "none" }} >
                <button type="submit" className="btn login-butt">
                  Sign in
                </button>
              </ConditionalLink>
            </div>
            <hr></hr>
            <div className=" d-flex justify-content-center">
              <button type="button" className="btn gg-butt my-2">
                <FcGoogle className="mx-3 gg-icon" /> Sign in with Google
              </button>
            </div>
            <div className="d-flex justify-content-center my-2">
              <p>Don't have an account ? &nbsp;</p>
              <Link to="/Register" style={{ textDecoration: "none" }}>
                <p>Sign up</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div >
  );
}

export default LoginPage;

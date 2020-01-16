import React from 'react';

function Login(props) {
  return (
    <div className="login-page flex-center-center pb-max pt-4 bg-light">
    <div className="mx-auto">
      <div className="card shadow-1 overflow-unset col-md-4 px-4 w-100">
        <div className="card-title mt-2">
          <div className="h1 text-center">Welcome to IEMS</div>
          <div className="h4 text-gray text-center">Please Login to proceed</div>
        </div>
        <div className="card-body">
          <form action="/login">
            <div className="group">
              <input type="text" placeholder='Username' className="input" />
            </div>

            <div className="group">
              <input type="password" placeholder='Password' className="input" />
            </div>

            <div class="group">
              <div class="custom-checkbox">
                <input type="checkbox" value="remember me" id="rememberMe" />
                <label for="rememberMe" class="text-gray">Remember Me</label>
              </div>
            </div>

            <div className="group">
              <input type="submit" value='Login' className="btn primary btn-lg block" />
            </div>
          </form>
        </div>
      </div>
      <div class="text-center weight-600 text-gray">
      <a href="/forgot" class="text-gray">Forgot Password</a> · <a href="/about"
      class="text-gray">About Us</a> · <a href="/contact" class="text-gray">Contact Us</a>
      </div>
      </div>
    </div>
  );
}

export default Login;

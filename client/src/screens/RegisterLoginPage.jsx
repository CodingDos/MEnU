import React from 'react'



function RegisterLoginPage() {
  return (
    <div className='homeBody' >
        
       <div className="row justify-content-center align-items-center vh-100">
       <div class="d-flex justify-content-around">
        <form action="/register" method="POST" class="col-3 p-3">
            <h2 class="text">Register</h2>
            <div class="form-group">
                <label for="first_name">First Name:</label>
                <input type="text" name="first_name" class="form-control"/>
            </div>
            <div class="form-group">
                <label for="last_name">Last Name:</label>
                <input type="text" name="last_name" class="form-control"/>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="text" name="email" class="form-control"/>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" name="password" class="form-control"/>
            </div>
            <div class="form-group">
                <label for="confirm">Confirm Password:</label>
                <input type="password" name="confirm" class="form-control"/>
            </div>
            <input type="submit" value="Register" class="btn btn-light mt-3"/>
        </form>
        
        <form action= "/home" method="POST" class="col-3 p-3">
            <h2 class="text">Login</h2>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="text" name="email" class="form-control"/>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" name="password" class="form-control"/>
            </div>
            <input type="submit" value="Login" class="btn btn-light mt-3"/>
        </form>
    </div>
    </div>
  
    </div>
  )
}

export default RegisterLoginPage

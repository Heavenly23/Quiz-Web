import React, { useState } from 'react';
import GoogleLogin from "react-google-login";
import './bootstrap.min.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import './App.css';
import { useHistory } from "react-router-dom";


function SignUp() {

  const [errors, setErrors] = useState("");
  const history = useHistory();


  const handleGoogleResponse = (res) => {

    console.log(res.profileObj);
    console.log("==============");

    console.log(res);
    console.log("==============");
    const userData = {
      name: res.profileObj.name,
      email: res.profileObj.email,
      familyName: res.profileObj.familyName,
      pictureUrl: res.profileObj.imageUrl

    }

    const tokenId = `Bearer ${res.tokenId}`;

    // localStorage.setItem('tokenId', tokenId);
    // axios.defaults.headers.common['Authorization'] = tokenId;

    axios.post('/signup', userData)
      .then(res => {

        localStorage.setItem('tokenId', tokenId);

        history.push('/');

      })
      .catch((err) => {

        setErrors(err.response.data);
        console.log(`Errors: {errors}`);

      });


  };

  return (
    <div className="SignUp">

      <div className="card align-items-center cad-n">

        <img class="card-img-top" src={require('./img/no-img.png')} alt="Card image cap" />

        <form>

          <p>Sign up with your social media account </p>
          <GoogleLogin

            clientId="181796502496-d4n1skjr6tq9trd0mp0dp3gdlaasm3hp.apps.googleusercontent.com"
            buttonText="Sign up with Google"
            scope='profile email'
            width='240'
            height='50'
            longtitle='true'
            theme='dark'

            onSuccess={handleGoogleResponse}
            onFailure={handleGoogleResponse}
            cookiePolicy={"single_host_origin"}
          />


        </form>

      </div>
      <div className="align-items-center cad-n">
        <br />
    Already have an account ? <br />
    Sign in <Link to="/Login"> here</Link>
        <br />
        <br />
        {errors.general && (
          <p>
            {errors.general}
          </p>
        )}

      </div>
    </div>
  );
}

export default SignUp;
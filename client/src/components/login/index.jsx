import { useState, useEffect } from "react";
import { usePostTokenLoginMutation } from "@/state/api";
import { Spinner } from "react-bootstrap";

// import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

const Login = ({ setUser, setSecret }) => {
  const [token, setToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New state to control the spinner
  const [triggerToken, resultToken] = usePostTokenLoginMutation();


  const handleToken = () => {
    setIsLoading(true); // Starts loading when login is initiated
    triggerToken({ token });
  };

  useEffect(() => {
    if (resultToken.data) {
      const { username, secret, avatar, response } = resultToken.data;
      setUser(username);
      setSecret(secret);
      setIsLoading(false); // Stops loading when data is fetched
    } else if (resultToken.error) {
      setErrorMessage("Token failed. Please check your credentials.");
      setIsLoading(false); // Stops loading when error occurs
    }
  }, [resultToken.data, resultToken.error]);

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="title">CHAT WITH SAUL</h2>

        <div>
          <input
            className="login-input"
            type="text"
            placeholder="Enter Token..."
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="login-actions">
          <a className="btn btn-info" target="_blank" href="https://btschwartz.com/api/v1/auth/login">
            Get Token
          </a>
          <button className="btn btn-primary" style={{marginLeft: "10px"}} type="button" onClick={handleToken}>
            {isLoading ? (
              <Spinner animation="border" role="status" size="sm">
                
              </Spinner>
            ) : (
              'Login'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

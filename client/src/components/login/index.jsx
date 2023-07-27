import { useState, useEffect } from "react";
import { usePostLoginMutation, usePostSignUpMutation, usePostTokenLoginMutation } from "@/state/api";

const Login = ({ setUser, setSecret }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [triggerLogin, resultLogin] = usePostLoginMutation();
  const [triggerSignUp, resultSignUp] = usePostSignUpMutation();
  const [triggerToken, resultToken] = usePostTokenLoginMutation();

  const handleLogin = () => {
    triggerLogin({ username, password });
  };

  const handleRegister = () => {
    triggerSignUp({ username, password });
  };

  const handleToken = () => {
    triggerToken({ token });
  };

  useEffect(() => {
    if (resultToken.data) {
      const { username, secret, avatar, response } = resultToken.data;
      setUser(username);
      setSecret(secret);
    } else if (resultToken.error) {
      setErrorMessage("Token failed. Please check your credentials.");
    }
  }, [resultToken.data, resultToken.error]);


  useEffect(() => {
    if (resultLogin.data?.response) {
      setUser(username);
      setSecret(password);
    } else if (resultLogin.error) {
      setErrorMessage("Login failed. Please check your credentials.");
    }
  }, [resultLogin.data, resultLogin.error]);

  useEffect(() => {
    if (resultSignUp.error) {
      setErrorMessage("Already registered. Please login.");
    }
  }, [resultSignUp.error]);

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="title">CHAT WITH GPT</h2>
        <p
          className="register-change"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Already a user?" : "Are you a new user?"}
        </p>

        <div>
          <input
            className="login-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="login-input"
            type="text"
            placeholder="Token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="login-actions">
          {isRegister ? (
            <button type="button" onClick={handleRegister}>
              Register
            </button>
          ) : (
            <button type="button" onClick={handleLogin}>
              Login
            </button>
          )}
        </div>

        <div className="login-actions">

            <button type="button" onClick={handleToken}>
              Token
            </button>
 
        </div>
      </div>
    </div>
  );
};

export default Login;

/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:4000/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem("adminToken", data.token);
                navigate("/admin/dashboard");
            } else {
                alert("Invalid Credentials");
            }
        } catch (error) {
            console.error("Login Error:", error);
        }
    };

    return (
        <div className="login-container">
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;
*/


/*main
import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./AdminLogin.css";

Modal.setAppElement("#root");

const AdminLogin = ({ isOpen, onClose }) => {
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    let apiUrl = `/api/admin/${currState === "Login" ? "login" : "register"}`;

    try {
      const response = await axios.post(apiUrl, data);
      if (response.data.success) {
        localStorage.setItem("adminToken", response.data.token);
        onClose();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onForgotPassword = async () => {
    if (!resetEmail) {
      alert("Please enter your email to reset the password.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("/api/admin/reset-password", { email: resetEmail });
      alert("Password reset email sent! Check your inbox.");
      setResetEmail("");
      setForgotPassword(false);
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modal-container">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>{forgotPassword ? "Reset Password" : currState}</h2>

        {!forgotPassword ? (
          <>
            <div className="login-inputs">
              {currState === "Sign Up" && (
                <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder="Your name" required />
              )}
              <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Your email" required />
              <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder="Password" required />
            </div>

            {currState === "Login" && (
              <p className="forgot-password" onClick={() => setForgotPassword(true)}>Forgot Password?</p>
            )}

            <button type="submit" onClick={onLogin} disabled={loading}>
              {loading ? "Processing..." : currState === "Sign Up" ? "Create Account" : "Login"}
            </button>

            <p>By continuing, I agree to the Terms of Use & Privacy Policy.</p>
            {currState === "Login" ? (
              <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
            ) : (
              <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
            )}
          </>
        ) : (
          <>
            <div className="login-inputs">

                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Enter your email"
                />

            </div>

            <button type="button" onClick={onForgotPassword} disabled={loading}>
              {loading ? "Sending..." : "Reset Password"}
            </button>

            <p onClick={() => setForgotPassword(false)} className="back-to-login">
              Back to Login
            </p>
          </>
        )}
      </div>
    </Modal>
  );
};

export default AdminLogin;
*/



/*
import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./AdminLogin.css";

Modal.setAppElement("#root");

const AdminLogin = ({ isOpen, onClose }) => {
  const [currState, setCurrState] = useState("Login"); // Toggle between "Login" and "Sign Up"
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    
    if (!data.email || !data.password) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    let apiUrl = `/api/admin/${currState === "Login" ? "login" : "register"}`;

    try {
      const response = await axios.post(apiUrl, data);
      if (response.data.success) {
        localStorage.setItem("adminToken", response.data.token);
        onClose();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onForgotPassword = async () => {
    if (!resetEmail) {
      alert("Please enter your email to reset the password.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("/api/admin/reset-password", { email: resetEmail });
      alert("Password reset email sent! Check your inbox.");
      setResetEmail("");
      setForgotPassword(false);
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modal-container">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>{forgotPassword ? "Reset Password" : currState}</h2>

        {!forgotPassword ? (
          <>
            <div className="login-inputs">
              {currState === "Sign Up" && (
                <input
                  name="name"
                  onChange={onChangeHandler}
                  value={data.name}
                  type="text"
                  placeholder="Your name"
                  required
                />
              )}
              <input
                name="email"
                onChange={onChangeHandler}
                value={data.email}
                type="email"
                placeholder="Your email"
                required
              />
              <input
                name="password"
                onChange={onChangeHandler}
                value={data.password}
                type="password"
                placeholder="Password"
                required
              />
            </div>

            {currState === "Login" && (
              <p className="forgot-password" onClick={() => setForgotPassword(true)}>Forgot Password?</p>
            )}

            <button
              type="submit"
              onClick={onLogin}
              disabled={loading || !data.email || !data.password}
            >
              {loading ? "Processing..." : currState === "Sign Up" ? "Create Account" : "Login"}
            </button>

            {currState === "Login" ? (
              <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
            ) : (
              <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
            )}
          </>
        ) : (
          <>
            <div className="login-inputs">
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <button type="button" onClick={onForgotPassword} disabled={loading}>
              {loading ? "Sending..." : "Reset Password"}
            </button>

            <p onClick={() => setForgotPassword(false)} className="back-to-login">
              Back to Login
            </p>
          </>
        )}
      </div>
    </Modal>
  );
};

export default AdminLogin;

*/
import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./AdminLogin.css";

Modal.setAppElement("#root");

const AdminLogin = ({ isOpen, onClose }) => {
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input changes
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Clear form on modal close
  const clearForm = () => {
    setData({ name: "", email: "", password: "" });
    setErrorMessage("");
  };

  // Handle Login / Register
  const onLogin = async (event) => {
    // Prevent default form submission
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    // Choose API endpoint based on Login or Sign Up
    const apiUrl = `http://localhost:4000/api/admin/${
      currState === "Login" ? "login" : "register"
    }`;

    try {
      const response = await axios.post(apiUrl, data);
      if (response.data.success) {
        // Store login status in localStorage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("adminToken", response.data.token);

        alert("Login successful!");

        // Trigger a re-render by dispatching a storage event
        window.dispatchEvent(new Event("storage"));

        // Close modal & clear form
        onClose();
        clearForm();

        // Optional: Refresh the page to reflect new login status
        window.location.reload();
      } else {
        // If the server responded with success: false
        setErrorMessage(
          response.data.message || "Invalid credentials! Please try again."
        );
      }
    } catch (error) {
      // Network or server error
      setErrorMessage("Invalid credentials! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        onClose();
        clearForm();
      }}
      className="modal-container"
    >
      <div className="modal-content">
        <button
          className="close-btn"
          onClick={() => {
            onClose();
            clearForm();
          }}
        >
          &times;
        </button>

        <h2>{currState}</h2>

        {/* Use a form to enable native browser validation */}
        <form onSubmit={onLogin}>
          {currState === "Sign Up" && (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              autoComplete="off"
              required
            />
          )}

          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            autoComplete="off"
            required
          />

          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            required
          />

          {/* Display server-side error messages */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          {/* Submit Button: triggers native validation first */}
          <button type="submit" disabled={loading}>
            {currState === "Sign Up" ? "Create Account" : "Login"}
          </button>

          {/* Toggle between Login & Sign Up */}
          {currState === "Login" ? (
            <p>
              Create a new account?{" "}
              <span onClick={() => setCurrState("Sign Up")}>Click here</span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => setCurrState("Login")}>Login here</span>
            </p>
          )}
        </form>
      </div>
    </Modal>
  );
};

export default AdminLogin;

import React, { useState } from "react";
import styles from "./home.module.scss";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { userAPI } from "../../services/api";
import { Link } from "react-router-dom";
const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleLogin=()=>{
    setLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const email = result.user.email!;
        const displayName = result.user.displayName || email;
        const idToken = await result.user.getIdToken();
        localStorage.setItem("token", idToken);
        try {
          const userResponse = await userAPI.read(email);
          const userData = userResponse.data;
          localStorage.setItem("userRole", userData.role);
          localStorage.setItem("userId", userData._id);
          localStorage.setItem("userEmail", userData.email);
          localStorage.setItem("userRole", userData.role);
        } catch (err: any) {
          if (err.response?.status === 404 || err.message.includes('Cannot read')) {
            console.log('User not found, creating new user...');
            await userAPI.create({
              name: displayName,
              email,
              role: 'user',
              token: idToken,
            });
          } else {
            throw err;
          }
        }
      })
      .catch((err) => {
        console.error("Login error:", err.message);
        setError(err.response?.data?.message || err.message || "Failed to login");
      })
      .finally(() => setLoading(false));
  }
  const handleLogout=()=>{
    setLoading(true);
    setError(null);
    signOut(auth)
      .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userId");
        localStorage.removeItem("userEmail");
      })
      .catch((err) => {
        console.error("Logout error:", err.message);
        setError(err.response?.data?.message || err.message || "Failed to logout");
      })
      .finally(() => setLoading(false));
  }
  return (
    <div className={styles.homePage}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Welcome to Stock Market Tracker</h1>
          <p className={styles.heroSubtitle}>Track and analyze stock market trends in real-time</p>
          <p className={styles.heroDescription}>Get real-time updates on stock prices, market news, and investment insights.</p>
        </div>
        <div className={styles.authSection}>
          {error && <p className={styles.errorMessage}>{error}</p>}
          {!localStorage.getItem("token")?<button
            className={styles.loginButton}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Loading..." : "Login with Google"}
          </button>:<button
            className={styles.loginButton}
            onClick={handleLogout}
            disabled={loading}
          >
            {loading ? "Loading..." : "Log out"}
          </button>}
          {
            localStorage.getItem("userRole")==='admin' && localStorage.getItem("token") &&
            <Link to="/admin" className={styles.adminLink}>Admin Dashboard</Link>
          }
          {
            localStorage.getItem("userRole")==='user' && localStorage.getItem("token") &&
            <Link to="/posts" className={styles.postLink}>User Posts</Link>
          }
        </div>
      </div>
    </div>
  );
};

export default Home;   
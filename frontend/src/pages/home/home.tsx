import React, { useState } from "react";
import styles from "./home.module.scss";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { userAPI } from "../../services/api";
import AdminDashboard from "../../components/AdminDashboard";
import UserView from "../../components/UserView";

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email!;
      const displayName = result.user.displayName || email;
      const idToken = await result.user.getIdToken();

      // Check if user exists in DB
      try {
        const userResponse = await userAPI.read(email);
        const userData = userResponse.data;
        setLoggedInUser(userData);
        setIsAdmin(userData.role === 'admin');
      } catch (err: any) {
        // User not found, create new user
        if (err.response?.status === 404 || err.message.includes('Cannot read')) {
          console.log('User not found, creating new user...');
          const newUser = await userAPI.create({
            name: displayName,
            email,
            role: 'user', // Default to user
            token: idToken,
          });
          setLoggedInUser(newUser.data);
          setIsAdmin(false);
        } else {
          throw err;
        }
      }
    } catch (err: any) {
      console.error("Login error:", err.message);
      setError(err.response?.data?.message || err.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setLoggedInUser(null);
      setIsAdmin(false);
    } catch (err: any) {
      console.error("Logout error:", err.message);
    }
  };

  // Show admin dashboard
  if (loggedInUser && isAdmin) {
    return (
      <AdminDashboard
        userId={loggedInUser._id}
        userEmail={loggedInUser.email}
        onLogout={handleLogout}
      />
    );
  }

  // Show user view
  if (loggedInUser && !isAdmin) {
    return (
      <UserView
        userEmail={loggedInUser.email}
        onLogout={handleLogout}
      />
    );
  }

  // Show hero page
  return (
    <div className={styles.homePage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.title}>Master the Stock Market</h1>
            <p className={styles.subtitle}>
              Real-time insights, advanced analytics, and intelligent trading tools
            </p>
            <p className={styles.description}>
              Start your journey to financial success with cutting-edge market analysis
            </p>
          </div>

          <div className={styles.buttonGroup}>
            <button
              className={`${styles.btn} ${styles.btnGoogle}`}
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <svg className={styles.googleIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" />
              </svg>
              {loading ? "Logging in..." : "Login with Google"}
            </button>
            <button className={`${styles.btn} ${styles.btnPrimary}`}>
              Start Trading Now
            </button>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.features}>
            <div className={styles.feature}>
              <span className={styles.icon}>📊</span>
              <span className={styles.featureText}>Real-time Data</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.icon}>🎯</span>
              <span className={styles.featureText}>Smart Analysis</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.icon}>🚀</span>
              <span className={styles.featureText}>Fast Trading</span>
            </div>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.chartPlaceholder}>
            <div className={styles.chartBar} style={{ height: "40%" }}></div>
            <div className={styles.chartBar} style={{ height: "65%" }}></div>
            <div className={styles.chartBar} style={{ height: "45%" }}></div>
            <div className={styles.chartBar} style={{ height: "70%" }}></div>
            <div className={styles.chartBar} style={{ height: "50%" }}></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;   
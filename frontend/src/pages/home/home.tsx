import React, { useState } from "react";
import styles from "./home.module.scss";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("Logged in as:", result.user.email);
      // TODO: Handle successful login (redirect, store user, etc.)
      alert(`Welcome, ${result.user.displayName || result.user.email}!`);
    } catch (err: any) {
      console.error("Google login error:", err.message);
      setError(err.message || "Failed to login with Google");
    } finally {
      setLoading(false);
    }
  };

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
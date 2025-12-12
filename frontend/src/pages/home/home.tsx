import React from "react";
import styles from "./home.module.scss";

const Home: React.FC = () => {
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
            <button className={`${styles.btn} ${styles.btnGoogle}`}>
              <svg className={styles.googleIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" />
              </svg>
              Login with Google
            </button>
            <button className={`${styles.btn} ${styles.btnPrimary}`}>
              Start Trading Now
            </button>
          </div>

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
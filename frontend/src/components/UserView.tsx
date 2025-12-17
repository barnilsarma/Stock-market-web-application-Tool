import React, { useEffect, useState } from 'react';
import { companyAPI, niftyAPI } from '../services/api';

interface UserViewProps {
  userEmail: string;
  onLogout: () => void;
}

const UserView: React.FC<UserViewProps> = ({ userEmail, onLogout }) => {
  const [companies, setCompanies] = useState<any[]>([]);
  const [nifties, setNifties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [companyRes, niftyRes] = await Promise.all([
          companyAPI.read(),
          niftyAPI.read(),
        ]);
        setCompanies(companyRes.data.data || []);
        setNifties(niftyRes.data.data || []);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Market Data</h1>
        <div>
          <p>Logged in as: {userEmail}</p>
          <button onClick={onLogout} style={{ padding: '0.5rem 1rem', marginTop: '0.5rem' }}>
            Logout
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>Companies</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            {companies.map((c: any) => (
              <div
                key={c._id}
                style={{
                  border: '1px solid #00d4ff',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  backgroundColor: '#1a1f2e',
                  color: '#fff',
                }}
              >
                <h3 style={{ marginTop: 0 }}>{c.name}</h3>
                <p><strong>CMP:</strong> {c.cmp}</p>
                <p><strong>Point Change:</strong> {c.pointChange}</p>
                <p><strong>Last Point:</strong> {c.lastPoint}</p>
              </div>
            ))}
          </div>

          <h2>Nifties</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {nifties.map((n: any) => (
              <div
                key={n._id}
                style={{
                  border: '1px solid #00ff88',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  backgroundColor: '#1a1f2e',
                  color: '#fff',
                }}
              >
                <h3 style={{ marginTop: 0 }}>{n.name}</h3>
                <p><strong>CMP:</strong> {n.cmp}</p>
                <p><strong>Point Change:</strong> {n.pointChange}</p>
                <p><strong>Last Point:</strong> {n.lastPoint}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserView;

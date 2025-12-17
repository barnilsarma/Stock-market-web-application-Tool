import React, { useState } from 'react';
import { companyAPI, niftyAPI } from '../services/api';

interface AdminDashboardProps {
  userId: string;
  userEmail: string;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ userId, userEmail, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'company' | 'nifty'>('company');
  const [companyForm, setCompanyForm] = useState({ name: '', cmp: '', pointChange: '', lastPoint: '' });
  const [niftyForm, setNiftyForm] = useState({ name: '', cmp: '', pointChange: '', lastPoint: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [companies, setCompanies] = useState<any[]>([]);
  const [nifties, setNifties] = useState<any[]>([]);

  const handleCompanySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await companyAPI.create({
        ...companyForm,
        cmp: parseFloat(companyForm.cmp),
        pointChange: parseFloat(companyForm.pointChange),
        lastPoint: parseFloat(companyForm.lastPoint),
        userId,
      });
      setMessage({ type: 'success', text: 'Company created successfully!' });
      setCompanyForm({ name: '', cmp: '', pointChange: '', lastPoint: '' });
      fetchCompanies();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to create company' });
    } finally {
      setLoading(false);
    }
  };

  const handleNiftySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await niftyAPI.create({
        ...niftyForm,
        cmp: parseFloat(niftyForm.cmp),
        pointChange: parseFloat(niftyForm.pointChange),
        lastPoint: parseFloat(niftyForm.lastPoint),
        userId,
      });
      setMessage({ type: 'success', text: 'Nifty created successfully!' });
      setNiftyForm({ name: '', cmp: '', pointChange: '', lastPoint: '' });
      fetchNifties();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to create nifty' });
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanies = async () => {
    try {
      const res = await companyAPI.read();
      setCompanies(res.data.data || []);
    } catch (err) {
      console.error('Failed to fetch companies:', err);
    }
  };

  const fetchNifties = async () => {
    try {
      const res = await niftyAPI.read();
      setNifties(res.data.data || []);
    } catch (err) {
      console.error('Failed to fetch nifties:', err);
    }
  };

  const handleDeleteCompany = async (id: string) => {
    if (!window.confirm('Delete this company?')) return;
    try {
      await companyAPI.delete(id);
      setMessage({ type: 'success', text: 'Company deleted!' });
      fetchCompanies();
    } catch (err: any) {
      setMessage({ type: 'error', text: 'Failed to delete company' });
    }
  };

  const handleDeleteNifty = async (id: string) => {
    if (!window.confirm('Delete this nifty?')) return;
    try {
      await niftyAPI.delete(id);
      setMessage({ type: 'success', text: 'Nifty deleted!' });
      fetchNifties();
    } catch (err: any) {
      setMessage({ type: 'error', text: 'Failed to delete nifty' });
    }
  };

  React.useEffect(() => {
    fetchCompanies();
    fetchNifties();
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Admin Dashboard</h1>
        <div>
          <p>Logged in as: {userEmail}</p>
          <button onClick={onLogout} style={{ padding: '0.5rem 1rem', marginTop: '0.5rem' }}>
            Logout
          </button>
        </div>
      </div>

      {message && (
        <div
          style={{
            padding: '1rem',
            marginBottom: '1rem',
            backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
            color: message.type === 'success' ? '#155724' : '#721c24',
            borderRadius: '4px',
          }}
        >
          {message.text}
        </div>
      )}

      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
        <button
          onClick={() => setActiveTab('company')}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: activeTab === 'company' ? '#00d4ff' : '#ccc',
            color: activeTab === 'company' ? '#000' : '#333',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px',
          }}
        >
          Manage Companies
        </button>
        <button
          onClick={() => setActiveTab('nifty')}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: activeTab === 'nifty' ? '#00d4ff' : '#ccc',
            color: activeTab === 'nifty' ? '#000' : '#333',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px',
          }}
        >
          Manage Nifties
        </button>
      </div>

      {activeTab === 'company' && (
        <div>
          <h2>Create Company</h2>
          <form onSubmit={handleCompanySubmit} style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="text"
              placeholder="Company Name"
              value={companyForm.name}
              onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="CMP"
              value={companyForm.cmp}
              onChange={(e) => setCompanyForm({ ...companyForm, cmp: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Point Change"
              value={companyForm.pointChange}
              onChange={(e) => setCompanyForm({ ...companyForm, pointChange: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Last Point"
              value={companyForm.lastPoint}
              onChange={(e) => setCompanyForm({ ...companyForm, lastPoint: e.target.value })}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Company'}
            </button>
          </form>

          <h2>Companies</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {companies.map((c: any) => (
              <div key={c._id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '4px' }}>
                <h3>{c.name}</h3>
                <p>CMP: {c.cmp} | Point Change: {c.pointChange} | Last Point: {c.lastPoint}</p>
                <button onClick={() => handleDeleteCompany(c._id)} style={{ marginTop: '0.5rem' }}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'nifty' && (
        <div>
          <h2>Create Nifty</h2>
          <form onSubmit={handleNiftySubmit} style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="text"
              placeholder="Nifty Name"
              value={niftyForm.name}
              onChange={(e) => setNiftyForm({ ...niftyForm, name: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="CMP"
              value={niftyForm.cmp}
              onChange={(e) => setNiftyForm({ ...niftyForm, cmp: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Point Change"
              value={niftyForm.pointChange}
              onChange={(e) => setNiftyForm({ ...niftyForm, pointChange: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Last Point"
              value={niftyForm.lastPoint}
              onChange={(e) => setNiftyForm({ ...niftyForm, lastPoint: e.target.value })}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Nifty'}
            </button>
          </form>

          <h2>Nifties</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {nifties.map((n: any) => (
              <div key={n._id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '4px' }}>
                <h3>{n.name}</h3>
                <p>CMP: {n.cmp} | Point Change: {n.pointChange} | Last Point: {n.lastPoint}</p>
                <button onClick={() => handleDeleteNifty(n._id)} style={{ marginTop: '0.5rem' }}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

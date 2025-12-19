import styles from './AdminDashboard.module.scss';
import { useState, useEffect } from 'react';
import { companyAPI, niftyAPI } from '../../services/api';
const AdminDashboard = () => {
    const [activity, setActivity] = useState('NIFTY');
    const [companyPosts, setCompanyPosts] = useState([]);
    const [niftyPosts, setNiftyPosts] = useState([]);
    const [companysubloading, setCompanySubLoading] = useState(false);
    const [niftysubloading, setNiftySubLoading] = useState(false);
    const [niftyformState, setNiftyFormState] = useState(0);
    const [companyformState, setCompanyFormState] = useState(0);
    const [newCompanyPost, setNewCompanyPost] = useState({
        name: '',
        cmp: 0,
        pointChange: 0,
        lastPoint: 0
    });
    const [newNiftyPost, setNewNiftyPost] = useState({
        name: '',
        cmp: 0,
        pointChange: 0,
        lastPoint: 0
    });
    useEffect(() => {
        const fetchCompanyPosts = async () => {
            try {
                const response = await companyAPI.read(localStorage.getItem("userId") || undefined);
                setCompanyPosts(response.data.data);
            } catch (error) {
                console.error('Error fetching company posts:', error);
            }
        };
        const fetchNiftyPosts = async () => {
            try {
                const response = await niftyAPI.read(localStorage.getItem("userId") || undefined);
                setNiftyPosts(response.data.data);
            } catch (error) {
                console.error('Error fetching nifty posts:', error);
            }
        };
        void fetchCompanyPosts();
        void fetchNiftyPosts();
    }, [activity]);

    const addCompanyPost = () => {
        setCompanyFormState(1);
    };
    const submitCompanyPost = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setCompanySubLoading(true);
        try {
            await companyAPI.create({
                name: newCompanyPost.name,
                cmp: newCompanyPost.cmp,
                pointChange: newCompanyPost.pointChange,
                lastPoint: newCompanyPost.lastPoint,
                userId: localStorage.getItem("userId") || ""
            });
            // Refresh the posts after submission
            const response = await companyAPI.read(localStorage.getItem("userId") || undefined);
            setCompanyPosts(response.data.data);
            // Reset form
            setNewCompanyPost({
                name: '',
                cmp: 0,
                pointChange: 0,
                lastPoint: 0
            });
        } catch (error) {
            console.error('Error submitting company post:', error);
        } finally {
            setCompanySubLoading(false);
        }
    };

    const addNiftyPost = () => {
        setNiftyFormState(1);
    }
    const handleCompanyUpdate =async (e: React.MouseEvent<HTMLButtonElement>) => {
        // Logic to handle company post update
    }
    const handleCompanyDelete = async (id: string) => {
        // Logic to handle company post deletion
        try {
            await companyAPI.delete(id);
            // Refresh the posts after deletion
            const response = await companyAPI.read(localStorage.getItem("userId") || undefined);
            setCompanyPosts(response.data.data);
        } catch (error) {
            console.error('Error deleting company post:', error);
        }
    };
    const handleNiftyUpdate =async (e: React.MouseEvent<HTMLButtonElement>) => {
        // Logic to handle NIFTY post update
    };
    const handleNiftyDelete = async (id: string) => {
        // Logic to handle NIFTY post deletion
        try {
            await niftyAPI.delete(id);
            // Refresh the posts after deletion
            const response = await niftyAPI.read(localStorage.getItem("userId") || undefined);
            setNiftyPosts(response.data.data);
        } catch (error) {
            console.error('Error deleting NIFTY post:', error);
        }
    };
    const submitNiftyPost = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setNiftySubLoading(true);
        try {
            await niftyAPI.create({
                name: newNiftyPost.name,
                cmp: newNiftyPost.cmp,
                pointChange: newNiftyPost.pointChange,
                lastPoint: newNiftyPost.lastPoint,
                userId: localStorage.getItem("userId") || ""
            });
            // Refresh the posts after submission
            const response = await niftyAPI.read(localStorage.getItem("userId") || undefined);
            setNiftyPosts(response.data.data);
            // Reset form
            setNewNiftyPost({
                name: '',
                cmp: 0,
                pointChange: 0,
                lastPoint: 0
            });
        } catch (error) {
            console.error('Error submitting nifty post:', error);
        } finally {
            setNiftySubLoading(false);
        }
    };
    return (localStorage.getItem("userRole") === 'admin' && localStorage.getItem("token") ?
        <>
            <div className={styles.companyFormCont} style={{scale:`${companyformState}`,opacity:`${companyformState}`,zIndex:`${companyformState===0?-1:1000}`}}>
                <form className={styles.companyForm}>
                    <input type="text" placeholder="Company Name" value={newCompanyPost.name} onChange={(e)=>setNewCompanyPost({...newCompanyPost, name: e.target.value})} />
                    <input type="number" placeholder="CMP" value={newCompanyPost.cmp} onChange={(e)=>setNewCompanyPost({...newCompanyPost, cmp: parseFloat(e.target.value)})} />
                    <input type="number" placeholder="Point Change" value={newCompanyPost.pointChange} onChange={(e)=>setNewCompanyPost({...newCompanyPost, pointChange: parseFloat(e.target.value)})} />
                    <input type="number" placeholder="Last Point" value={newCompanyPost.lastPoint} onChange={(e)=>setNewCompanyPost({...newCompanyPost, lastPoint: parseFloat(e.target.value)})} />
                    <button onClick={submitCompanyPost} disabled={companysubloading}>{companysubloading ? 'Adding...' : 'Add Company Post'}</button>
                    <button onClick={(e)=>{e.preventDefault();setCompanyFormState(0)}}>Cancel</button>
                </form>
            </div>
            <div className={styles.niftyFormCont} style={{scale:`${niftyformState}`,opacity:`${niftyformState}`,zIndex:`${niftyformState===0?-1:1000}`}}>
                <form className={styles.niftyForm}>
                    <input type="text" placeholder="NIFTY Name" value={newNiftyPost.name} onChange={(e)=>setNewNiftyPost({...newNiftyPost, name: e.target.value})} />
                    <input type="number" placeholder="CMP" value={newNiftyPost.cmp} onChange={(e)=>setNewNiftyPost({...newNiftyPost, cmp: parseFloat(e.target.value)})} />
                    <input type="number" placeholder="Point Change" value={newNiftyPost.pointChange} onChange={(e)=>setNewNiftyPost({...newNiftyPost, pointChange: parseFloat(e.target.value)})} />
                    <input type="number" placeholder="Last Point" value={newNiftyPost.lastPoint} onChange={(e)=>setNewNiftyPost({...newNiftyPost, lastPoint: parseFloat(e.target.value)})} />
                    <button onClick={submitNiftyPost} disabled={niftysubloading}>{niftysubloading ? 'Adding...' : 'Add NIFTY Post'}</button>
                    <button onClick={(e)=>{e.preventDefault();setNiftyFormState(0)}}>Cancel</button>
                </form>
            </div>
            <div className={styles.adminDashboardPage}>
                <div className={styles.adminDashboardHeader}>
                    <h1 className={styles.adminDashboardTitle}>Admin Dashboard</h1>
                    <p className={styles.adminDashboardWelcome}>Welcome to the admin dashboard.</p>
                </div>
                <div className={styles.adminDashboardContent}>
                    <div className={styles.buttonCont}>
                        <button className={styles.adminButton} style={{ backgroundColor: `${activity === 'NIFTY' ? "#000022" : "#bbbbbb"}`, color: `${activity === 'NIFTY' ? "#ffffff" : "#000000"}` }} onClick={() => setActivity('NIFTY')}>Manage NIFTY Posts</button>
                        <button className={styles.adminButton} style={{ backgroundColor: `${activity === 'COMPANY' ? "#000022" : "#bbbbbb"}`, color: `${activity === 'COMPANY' ? "#ffffff" : "#000000"}` }} onClick={() => setActivity('COMPANY')}>Manage Company Posts</button>
                    </div>
                    <div>
                        <h1>
                            Your Recent {activity} Posts
                        </h1>
                        <div>
                            {activity === 'NIFTY' && <button onClick={addNiftyPost}>Add NIFTY Post</button>}
                            {activity === 'COMPANY' && <button onClick={addCompanyPost}>Add Company Post</button>}
                        </div>
                        <div>
                            {activity === 'COMPANY' && companyPosts.length === 0 && <p>No Company posts found.</p>}
                            {activity === 'COMPANY' && companyPosts.length > 0 && companyPosts.map((post: any) => (
                                <div key={post._id} className={styles.postCard}>
                                    <h2 className={styles.postTitle}>{post.name}</h2>
                                    <p className={styles.postContent}>CMP: {post.cmp}, Point Change: {post.pointChange}, Last Point: {post.lastPoint}</p>
                                    <div className={styles.postActions}>
                                        <button onClick={() => handleCompanyDelete(post._id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            {activity === 'NIFTY' && niftyPosts.length === 0 && <p>No NIFTY posts found.</p>}
                            {activity === 'NIFTY' && niftyPosts.length > 0 && niftyPosts.map((post: any) => (
                                <div key={post._id} className={styles.postCard}>
                                    <h2 className={styles.postTitle}>{post.name}</h2>
                                    <p className={styles.postContent}>CMP: {post.cmp}, Point Change: {post.pointChange}, Last Point: {post.lastPoint}</p>
                                    <div className={styles.postActions}>
                                        <button onClick={() => handleNiftyDelete(post._id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </> :
        <div className={styles.unauthorized}>
            You are not authorized to view this page.
        </div>);
}

export default AdminDashboard;  
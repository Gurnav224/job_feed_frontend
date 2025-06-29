import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



const API_URL = `${import.meta.env.VITE_API_URL}/api/v1`;
const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchJobDetails = async () => {
        try {
            const response = await fetch(`${API_URL}/jobs/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch job details');
            }
            const data = await response.json();
            setJob(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobDetails();
    }, [id]);

    if (loading) {
        return <div className="spinner-border m-5" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>;
    }

    if (error) {
        return <div className='container'>
            <p className='text-danger display-6 my-3'>Error: {error}</p>
        </div>;
    }

    if (!job) {
        return <div className='container'>
            <p className='text-danger display-6 my-3'>No job details available</p>
        </div>;
    }

    return (
        <div className="container">
            <h1 className="my-4">{job.title}</h1>
            <div className="card p-4">
                <p className='card-text'><strong>Company:</strong> {job.company}</p>
                <p className='card-text'><strong>Location:</strong> {job.location}</p>
                <p className='card-text'><strong>Salary:</strong> {job.salary}</p>
                <p className='card-text'><strong>Job Type:</strong> {job.type}</p>
                <p className='card-text'><strong>Description:</strong> {job.description}</p>
                <p><strong>Qualifications</strong></p>
                <ul>
                    {job.qualifications.map((qual, index) => (
                        <li key={index}>{qual}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default JobDetails
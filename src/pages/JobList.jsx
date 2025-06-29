import { useState, useEffect } from 'react';
import { Link, useSearchParams} from 'react-router-dom';
import { toast } from 'react-toastify';

const API_URL = `${import.meta.env.VITE_API_URL}/api/v1`;
const JobList = () => {
    const [ jobs, setJobs ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();


    const query = searchParams.get('title') || '';


    const fetchJobs = async () => {
        try {
            const response = await fetch(`${API_URL}/jobs`);
            if (!response.ok) {
                throw new Error('Failed to fetch jobs');
            }

            const data = await response.json();
            setJobs(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

      useEffect(() => {
        fetchJobs();
    }, []);



    const handleSearch = (e) => {
        if( e.target.value.trim() !== '') {
            setSearchParams({ title: e.target.value });
        }
        else{
            setSearchParams({});
        }
    };


  const fetchFilteredJobs = async () => {   
        try {
            const response = await fetch(`${API_URL}/jobs?title=${query}`);
            if (!response.ok) {
                throw new Error('Failed to fetch jobs');
            }

            const data = await response.json();
            setJobs(data);
        } catch (error) {
            setError(error.message);
            toast(error.message,{position:'bottom-left'})
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (query) {
            fetchFilteredJobs();
        }
        else{
            fetchJobs()
        }
    }, [query]);


    const deleteJob = async (id) => {   
        try {
            const response = await fetch(`${API_URL}/jobs/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete job');
            }
            setJobs(jobs.filter(job => job._id !== id));    
            toast("job delete successsfully",{position:'bottom-left'})

        } catch (error) {   
            setError(error.message);
            toast(error.message,{position:'bottom-left'})
        }
    };




    if (loading) {
        return <div className="spinner-border m-5" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>;
    }

      if (jobs.length === 0) {
        return <div className='container'> <p className='text-danger display-6 my-3'>No jobs available</p></div>;
    }

    if (error) {
        return <div className='container'>
            <p className='text-danger display-6 my-3'>Error: {error}</p>
        </div>;
    }
  

    return (
        <main className='container'>
            <h1 className="my-4">Job Listings</h1>

            <div >
                <div className='mb-4'>
                    <input onChange={handleSearch} type="text" placeholder='Search jobs...' className='form-control' />
                </div>
                <div >
                    <div className="row g-2 g-sm-3 g-md-4">
                        {jobs.map(job => (
                            <div
                                key={job._id}
                                className="col-12 col-sm-6 col-md-4 mb-2"
                            >
                                <div className="card h-100 p-2 " >
                                    <div className="card-body">
                                        <p><strong>{job.title}</strong></p>
                                        <p className="card-text"><strong>Company:</strong> {job.company}</p>
                                        <p className="card-text"><strong>Location:</strong> {job.location}</p>
                                        <p className="card-text"><strong>Job Type:</strong> {job.type}</p>
                                        <div className="d-grid gap-2 d-md-flex justify-content-md-between">
                                            <Link
                                                to={`/jobs/${job._id}`}
                                                className="btn btn-primary w-100 w-md-50 me-md-2 mb-2 mb-md-0"
                                            >
                                                See Details
                                            </Link>
                                            <button 
                                                onClick={() => deleteJob(job._id)}
                                                className="btn btn-danger w-100 w-md-50"
                                            >
                                                Delete
                                            </button>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </main>
    )
}

export default JobList
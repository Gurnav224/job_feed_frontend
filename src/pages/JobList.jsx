import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const API_URL = `${import.meta.env.VITE_API_URL}/api/v1`;

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('title') || '';

  const fetchJobs = async () => {
    setLoading(true);
    setError('');
    try {
      const url = query
        ? `${API_URL}/jobs?title=${encodeURIComponent(query)}`
        : `${API_URL}/jobs`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch jobs');
      }

      setJobs(data);
      if (Array.isArray(data) && data.length === 0) {
        toast.info('No jobs match your search!', { position: 'bottom-left' });
      }
    } catch (err) {
      setError(err.message);
      setJobs([])
      toast.error(err.message, { position: 'bottom-left' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [query]);

  const handleSearch = (e) => {
    const val = e.target.value.trim();
    setSearchParams(val ? { title: val } : {});
  };

  const deleteJob = async (id) => {
    try {
      const res = await fetch(`${API_URL}/jobs/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete job');
      setJobs((prev) => prev.filter((job) => job._id !== id));
      toast.success('Job deleted successfully', { position: 'bottom-left' });
    } catch (err) {
      toast.error(err.message, { position: 'bottom-left' });
    }
  };


  
  return (
    <main className='container'>
      <h1 className="my-4">Job Listings</h1>
      <div className='mb-4'>
        <input
          onChange={handleSearch}
          type="text"
          placeholder='Search jobs...'
          defaultValue={query}
          className='form-control'
        />
      </div>
      <div>
         {loading &&  <div className="spinner-border m-5" role="status"><span className="visually-hidden">Loading...</span></div>}
        {error && jobs.length === 0 && <p className="text-danger display-6 my-3">{error}</p>}
      </div>
      <div className="row g-3">
       
        {jobs.map((job) => (
          <div key={job._id} className="col-sm-6 col-md-4 mb-2">
            <div className="card h-100 p-2">
              <div className="card-body d-flex flex-column">
                <p><strong>{job.title}</strong></p>
                <p><strong>Company:</strong> {job.company}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Type:</strong> {job.type}</p>
                <div className="mt-auto d-flex gap-2">
                  <Link to={`/jobs/${job._id}`} className="btn btn-primary flex-fill">Details</Link>
                  <button onClick={() => deleteJob(job._id)} className="btn btn-danger flex-fill">Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default JobList;

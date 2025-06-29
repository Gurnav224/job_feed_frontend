import { useState } from 'react';
import { toast } from 'react-toastify';

const API_URL = `${import.meta.env.VITE_API_URL}/api/v1`;


 const AddJob = () => {
    const [newJob , setNewJob] = useState({
        title: "web developer",
        company: "tech company",
        location: "New York",
        salary: "$100,000 - $120,000",
        type: "Full-time (Remote)",
        description: "We are looking for a skilled web developer...",
        qualifications: ["Bachelor's degree in Computer Science", "3+ years of experience in web development"]
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewJob((prevJob) => ({
            ...prevJob,
            [name]: name === "qualifications" ? value.split(',').map(qual => qual.trim()) : value
        }));
    };  

    const handleSubmit = async (e) => {
        e.preventDefault();
 
        try {
            const response = await fetch(`${API_URL}/jobs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newJob)
            });

            if (!response.ok) {
                throw new Error('Failed to post job');
            }

            const data = await response.json();
            console.log('Job posted successfully:', data);
            setNewJob({
                title: "",
                company: "",
                location: "",
                salary: "",
                type: "",
                description: "",
                qualifications: [""]
            });

            toast("new job created successfully",{position:'bottom-left'})
        } catch (error) {
            console.error("Error posting job:", error);
            toast("failed to create new job",{position:"bottom-left"})
        }
    };



  return (
    
    <main className="container">
        <h1 className="my-3">Post a Job</h1>
           <form action="" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title" className="form-label">Job Title</label>
                <input type="text" className="form-control" id="title" placeholder="Enter job title" name="title" value={newJob.title} onChange={handleInputChange} required/>
            </div>
            <div className="my-3">
                <label htmlFor="company" className="form-label">Company</label>
                <input type="text" className="form-control" id="company" placeholder="Enter company name" name="company" value={newJob.company} onChange={handleInputChange} required/>
            </div>
            <div className="my-3">
                <label htmlFor="location" className="form-label">Location</label>
                <input type="text" className="form-control" id="location" placeholder="Enter job location" name="location" value={newJob.location} onChange={handleInputChange} required/>
            </div>
            <div className="my-3">
                <label htmlFor="salary" className="form-label">Salary</label>
                <input type="text" className="form-control" id="salary" placeholder="Enter salary range" name="salary" value={newJob.salary} onChange={handleInputChange} required/>
            </div>
            <div className="my-3">
                <label htmlFor="type" className="form-label">Job Type</label>
                <select className="form-select" id="type" name="type" value={newJob.type} onChange={handleInputChange}required>
                    <option value="" disabled selected>Select job type</option>
                    <option value="Full-time (On-site)">Full-time (On-site)</option>
                    <option value="Part-time (On-site)">Part-time (On-site)</option>
                    <option value="Full-time (Remote)">Full-time (Remote)</option>
                    <option value="Part-time (Remote)">Part-time (Remote)</option>
                </select>
            </div>
            <div className="my-3">
                <label htmlFor="description" className="form-label">Job Description</label>
                <textarea className="form-control" id="description" rows="4" placeholder="Enter job description" name="description" value={newJob.description} onChange={handleInputChange} required></textarea>
            </div>
            <div className="my-3">
                <label htmlFor="qualifications" className="form-label">Qualifications</label>
                <textarea className="form-control" id="qualifications" rows="4" placeholder="Enter job qualifications" name="qualifications" value={newJob.qualifications} onChange={handleInputChange} required></textarea>
            </div>
           <button type="submit" className="btn btn-primary">Post Job</button>
       </form>
    </main>
  )
}


export default AddJob         
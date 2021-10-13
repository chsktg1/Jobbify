import './index.css'

const SimilarJobs = props => {
  const {e} = props
  return (
    <div className="bg-container">
      <img
        style={{width: '90px'}}
        src={e.company_logo_url}
        alt="similar job company logo"
      />
      <h1>Description</h1>
      <p>{e.job_description}</p>
      <p>{e.rating}</p>
      <h1>{e.title}</h1>
      <p>{e.location}</p>
      <p>{e.employment_type}</p>
    </div>
  )
}

export default SimilarJobs

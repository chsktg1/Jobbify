import {Link} from 'react-router-dom'

import './index.css'

import {ImStarEmpty} from 'react-icons/im'

const JobCard = props => {
  const {e} = props
  const {
    id,
    title,
    rating,
    location,
    companyLogoUrl,
    employmentType,
    jobDescription,
    packagePerAnnum,
  } = e
  return (
    <Link to={`/jobs/${id}`}>
      <div className="jobCard">
        <div className="topContainer">
          <img
            className="companyLogo"
            src={companyLogoUrl}
            alt="company logo"
          />
          <div>
            <h1>{title}</h1>
            <p>{rating}</p>
            <p>
              <ImStarEmpty />
            </p>
          </div>
        </div>
        <div style={{display: 'flex'}}>
          <p style={{marginRight: '4px'}}>{location}</p>
          <p>{employmentType}</p>
        </div>
        <p>{packagePerAnnum}</p>
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </div>
    </Link>
  )
}

export default JobCard

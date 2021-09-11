/* eslint-disable no-nested-ternary */
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {BiStar} from 'react-icons/bi'

import {Component} from 'react'

import SkillMaker from '../SkillMaker'

import Header from '../Header'

import JobCard from '../JobCard'

import './index.css'

class SpecificJob extends Component {
  state = {isLoading: true, showError: false}

  componentDidMount() {
    this.fetchData()
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  fetchData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const data = await fetch(url, options)
    if (data.ok) {
      const jsonData = await data.json()
      console.log(jsonData)
      const jobInDetail = jsonData.job_details
      const similarJobs = jsonData.similar_jobs
      console.log('beforeFormatting', jobInDetail)
      console.log(similarJobs)
      jobInDetail.companyLogoUrl = jobInDetail.company_logo_url
      jobInDetail.companyWebsiteUrl = jobInDetail.company_website_url
      jobInDetail.employmentType = jobInDetail.employment_type
      jobInDetail.jobDescription = jobInDetail.job_description
      jobInDetail.packagePerAnnum = jobInDetail.package_per_annum
      jobInDetail.lifeAtCompanyDescription =
        jobInDetail.life_at_company.description
      jobInDetail.lifeAtCompanyImageUrl = jobInDetail.life_at_company.image_url
      jobInDetail.skills = jobInDetail.skills.map(e => ({
        name: e.name,
        imageUrl: e.image_url,
      }))
      this.setState({isLoading: false, jobInDetail, similarJobs})
    } else {
      this.setState({showError: true})
    }
  }

  renderError = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button>Retry</button>
    </>
  )

  renderingJobInDetail = () => {
    const {jobInDetail, similarJobs, showError} = this.state
    const {
      location,
      employmentType,
      rating,
      companyLogoUrl,
      companyWebsiteUrl,
      lifeAtCompanyDescription,
      lifeAtCompanyImageUrl,
      jobDescription,
      packagePerAnnum,

      skills,
      title,
    } = jobInDetail
    console.log(skills)
    return (
      <div className="justForBackgroundColor">
        <div className="chskMainContainer">
          <div className="justAContainer">
            <img
              src={companyLogoUrl}
              className="companyLogo"
              alt="job details company logo"
            />

            <div className="columnFlexer">
              <h1>{title}</h1>

              <div className="ratingContainer">
                <BiStar style={{marginTop: '3px', marginRight: '3px'}} />
                <p style={{marginTop: '0'}}>{rating}</p>
              </div>
            </div>
          </div>

          <div className="locEmpPackContainer">
            <div className="locEmpContainer">
              <p>{location}</p>
              <p>{employmentType}</p>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr style={{backgroundColor: 'white'}} />
          <div className="desVisit">
            <h1 style={{fontWeight: 'bold'}}>Description</h1>
            <a href={{companyWebsiteUrl}}>Visit</a>
          </div>
          <p>{jobDescription}</p>
          <h1 style={{fontWeight: 'bold'}}>Life at Company</h1>
          <div className="lifeAtCompany">
            <p>{lifeAtCompanyDescription}</p>
            <img src={lifeAtCompanyImageUrl} alt="life at company" />
          </div>
          <p>Skills</p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
            }}
          >
            {skills.map(e => (
              <SkillMaker e={e} key={e.name} />
            ))}
          </div>
        </div>
        <h1>Similar Jobs</h1>
        {similarJobs.map(e => (
          <JobCard e={e} key={e.id} />
        ))}
      </div>
    )
  }

  render() {
    const {isLoading, showError} = this.state
    return (
      <>
        <Header />
        {isLoading
          ? this.renderLoader()
          : showError
          ? this.renderError()
          : this.renderingJobInDetail()}
      </>
    )
  }
}

export default SpecificJob

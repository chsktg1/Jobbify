/* eslint-disable no-nested-ternary */
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'

import EmpList from '../EmpList'

import Header from '../Header'

import Salary from '../Salary'

import JobCard from '../JobCard'

import './index.css'

class Jobs extends Component {
  state = {
    isLoading: false,
    profileDetails: {},
    searchPhrase: '',
    allJobsJsonFormatted: [],
    jobType: [],
    minPack: 1000000,
    showJobsError: false,
  }

  componentDidMount() {
    this.fetchData()
  }

  fetcher = async () => {
    const {searchPhrase, jobType, minPack} = this.state
    let empType = jobType.filter(e => e !== 'false' || e !== false)
    empType = empType.join(',')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${empType}&minimum_package=${minPack}&search=${searchPhrase}`
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const filteredData = await fetch(apiUrl, options)

    const filterDataJson = await filteredData.json()
    const formattedFilterDataJson = filterDataJson.jobs.map(e => ({
      id: e.id,
      title: e.title,
      rating: e.rating,
      location: e.location,
      companyLogoUrl: e.company_logo_url,
      employmentType: e.employment_type,
      jobDescription: e.job_description,
      packagePerAnnum: e.package_per_annum,
    }))

    this.setState({allJobsJsonFormatted: formattedFilterDataJson})
  }

  salaryChanger = sal => {
    this.setState({minPack: sal}, () => this.fetcher())
  }

  updateSearchPhrase = event => {
    this.setState({searchPhrase: event.target.value})
  }

  clicker = id => {
    let newEmpTypes = []
    const {jobType} = this.state
    if (jobType.includes(id)) {
      newEmpTypes = jobType.filter(e => e !== id)
    } else {
      newEmpTypes = jobType
      newEmpTypes.push(id)
    }

    this.setState({jobType: newEmpTypes}, () => this.fetcher())
  }

  fetchData = async (search = '', minPack = 1000000) => {
    this.setState({isLoading: true})
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=FULLTIME,PARTTIME&minimum_package=${minPack}&search=${search}`
    const token = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const profileData = await fetch(profileApiUrl, options)
    const profileJsonData = await profileData.json()
    const data = await fetch(apiUrl, options)
    const jsonData = await data.json()
    const allJobsUrl = 'https://apis.ccbp.in/jobs'
    const allJobsPromise = await fetch(allJobsUrl, options)
    if (allJobsPromise.ok === true) {
      const allJobsJson = await allJobsPromise.json()
      console.log('allJobsPromise', allJobsPromise)

      const allJobsJsonFormatted = allJobsJson.jobs.map(e => ({
        id: e.id,
        title: e.title,
        rating: e.rating,
        location: e.location,
        companyLogoUrl: e.company_logo_url,
        employmentType: e.employment_type,
        jobDescription: e.job_description,
        packagePerAnnum: e.package_per_annum,
      }))

      const profileDetails = profileJsonData.profile_details
      profileDetails.profileImageUrl =
        profileJsonData.profile_details.profile_image_url
      profileDetails.shortBio = profileJsonData.profile_details.short_bio

      this.setState({isLoading: false, profileDetails, allJobsJsonFormatted})
    } else {
      this.setState({showJobsError: true})
    }
  }

  renderNoJobsFound = () => (
    <>
      <img src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png" />
      <h1 style={{color: 'white'}}>No Jobs Found</h1>
      <p style={{color: 'white'}}>
        We could not find any jobs. Try other filters.
      </p>
    </>
  )

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderAllJobs = () => {
    const {allJobsJsonFormatted} = this.state

    return (
      <ul className="allJobsHolder">
        {allJobsJsonFormatted === undefined ||
        allJobsJsonFormatted === [] ||
        allJobsJsonFormatted.length === 0
          ? this.renderNoJobsFound()
          : allJobsJsonFormatted.map(e => <JobCard e={e} key={e.id} />)}
      </ul>
    )
  }

  renderFailView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button onClick={this.fetchData()}>Retry</button>
    </>
  )

  render() {
    const {
      employmentTypesList,
      salaryRangesList,
      searchPhrase,
      showJobsError,
    } = this.props

    const {isLoading, profileDetails} = this.state
    const {name, shortBio, profileImageUrl} = profileDetails
    return (
      <>
        <Header />

        <div className="sumanthContainer">
          <div className="search-container onlyForSmallScreen">
            <input
              value={searchPhrase}
              onChange={this.updateSearchPhrase}
              id="searchBar"
              type="search"
            />
            <button type="button" testid="searchButton">
              <BsSearch onClick={this.fetcher} className="search-icon" />
            </button>
          </div>
          <div>
            <div className="bigProfileContainer">
              {isLoading ? (
                this.renderLoader()
              ) : (
                <div className="profile-container">
                  {showJobsError ? (
                    <>
                      <button onClick={this.fetchData()}>Retry</button>
                    </>
                  ) : (
                    <>
                      <img src={profileImageUrl} alt="profile" />
                      <h1>{name}</h1>
                      <p>{shortBio}</p>
                    </>
                  )}
                </div>
              )}
            </div>

            <form className="Employment">
              <h1>Type of Employment</h1>
              <ul>
                {employmentTypesList.map(e => (
                  <EmpList
                    e={e}
                    key={e.employmentTypeId}
                    clicker={this.clicker}
                  />
                ))}
              </ul>
              <h1>Salary Range</h1>
              <ul>
                {salaryRangesList.map(e => (
                  <Salary
                    e={e}
                    key={e.salaryRangeId}
                    salaryChanger={this.salaryChanger}
                    name="salary"
                  />
                ))}
              </ul>
            </form>
          </div>
          <div>
            <div>
              <div className="search-container onlyForLargeScreen">
                <input
                  value={searchPhrase}
                  onChange={this.updateSearchPhrase}
                  id="searchBar"
                  type="search"
                />
                <button type="button" testid="searchButton">
                  <BsSearch onClick={this.fetcher} className="search-icon" />
                </button>
              </div>
            </div>
            <div
              className="noNameLeft"
              //   style={{
              //     marginTop: '2vw',
              //     overflow: 'auto',
              //     marginLeft: '3vw',

              //     height: '80%',this.renderAllJobs()
              //     width: '70vw',showJobsError
              //   }}
            >
              {isLoading
                ? this.renderLoader()
                : showJobsError
                ? this.renderFailView()
                : this.renderAllJobs()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs

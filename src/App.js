import {Switch, Route, Redirect} from 'react-router-dom'

import './App.css'

import Login2 from './components/Login2'

import NotFound from './components/NotFound'

import Home from './components/Home'
import Jobs from './components/Jobs'
import SpecificJob from './components/SpecificJob'
import ProtectedPath from './components/ProtectedPath'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const App = () => (
  <div>
    <Switch>
      <Route exact path="/login" component={Login2} />
      <ProtectedPath exact path="/" component={Home} />
      <ProtectedPath
        exact
        path="/jobs"
        render={props => (
          <Jobs
            {...props}
            salaryRangesList={salaryRangesList}
            employmentTypesList={employmentTypesList}
          />
        )}
      />
      <ProtectedPath exact path="/jobs/:id" component={SpecificJob} />
      <Route path="/not-found" component={NotFound} />

      <Redirect to="not-found" />
    </Switch>
  </div>
)

export default App

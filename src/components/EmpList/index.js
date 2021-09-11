import './index.css'

const EmpList = props => {
  const {e, clicker} = props
  const {label, employmentTypeId} = e

  const changeFilter = () => {
    clicker(employmentTypeId)
  }

  return (
    <li style={{display: 'flex', width: '150px'}}>
      <input
        onChange={changeFilter}
        type="checkbox"
        id={employmentTypeId}
        value={employmentTypeId}
      />
      <label htmlFor={employmentTypeId}>{label}</label>
    </li>
  )
}

export default EmpList

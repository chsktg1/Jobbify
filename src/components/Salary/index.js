const Salary = props => {
  const {e, salaryChanger} = props
  const {salaryRangeId, label} = e

  const salaryUpdater = () => {
    console.log(salaryRangeId)

    salaryChanger(salaryRangeId)
  }

  return (
    <li style={{display: 'flex', width: '150px'}}>
      <input
        type="radio"
        name="salary"
        id={salaryRangeId}
        style={{marginTop: '4px'}}
        onClick={salaryUpdater}
      />
      <label htmlFor={salaryRangeId}>{label}</label>
    </li>
  )
}

export default Salary

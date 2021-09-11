const SkillMaker = props => {
  const {e} = props
  const {name, imageUrl} = e
  return (
    <div
      style={{
        width: '30%',
        display: 'flex',
        alignItems: 'center',
        margin: '15px',
      }}
    >
      <img src={imageUrl} alt={name} />
      <p style={{marginLeft: '10px'}}>{name}</p>
    </div>
  )
}

export default SkillMaker

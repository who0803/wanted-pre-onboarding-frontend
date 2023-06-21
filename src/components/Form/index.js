function Form({type, value, onEmailChange, onPasswordChange, onSubmit, isDisabled}) {
  return (
    <form onSubmit={onSubmit}>
      <input data-testid="email-input" value={value[0]} onChange={onEmailChange}/>
      <input data-testid="password-input" value={value[1]} onChange={onPasswordChange}/>
      <button data-testid={`${type}-button`} disabled={!isDisabled()}>{type}</button>
    </form>
  )
}

export {Form};
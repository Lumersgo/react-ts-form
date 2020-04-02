import React from 'react';
interface form {
  id: number,
  error?: Boolean,
  name: string,
  email: string,
  radio: string,
  checkbox: string[]
}
interface Props {
  key: number,
  form: form,
  del: Function,
  handleChange: Function
}
class Form extends React.Component<Props, {}> {
  render() {
    const { del, form, handleChange } = this.props;
    return (
      <>
        <div className={form.error ? 'form error' : 'form'} id={`${form.id}`}>
          <span className="errorMsg">Please enter the full information</span>
          <button className="delete" onClick={() => {del()}} >Delete</button>
          <div className="form-item">
            <span className= 'prev'>Name:</span><input type="text"  onChange={(e) => handleChange(e.target, 'name')}/>
          </div>
          <div className="form-item">
            <span className= 'prev'>Email:</span><input type="text"  onChange={(e) => handleChange(e.target, 'email')} />
          </div>
          <div className="form-item">
            <span className= 'prev'>Radio:</span>
            <span className= 'name'>One</span>
            <input className="radio" name={`${form.id}`} type="radio" value="One" onChange={(e) => handleChange(e.target, 'radio')} />
            <span className= 'name'>Two</span>
            <input className="radio" name={`${form.id}`} type="radio" value="Two" onChange={(e) => handleChange(e.target, 'radio')} />
          </div>
          <div className="form-item">
            <span className= 'checkbox'>Radio:</span>
            <span className= 'name'>A</span>
            <input className="checkbox" name="A" type="checkbox" value="A" onChange={(e) => handleChange(e.target, 'checkbox')} />
            <span className= 'name'>B</span>
            <input className="checkbox" name="Fruit" type="checkbox" value="B" onChange={(e) => handleChange(e.target, 'checkbox')} />
          </div>
        </div>
      </>
    )
  }
}

export default Form;

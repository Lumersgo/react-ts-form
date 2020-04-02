import React, {Component} from 'react';
import Form from './form';
import { hot } from 'react-hot-loader/root';
import scrollAnimation from '../utils/scroll';
interface form {
  id: number,
  error?: Boolean,
  name: string,
  email: string,
  radio: string,
  checkbox: string[]
}
interface InitialState  {
  forms: form[]
};
interface target {
  value: string,
  checked: Boolean
}
class App extends Component<object, InitialState> {
  readonly state: InitialState = {
    forms: [{
      id: (new Date()).valueOf(),
      name: '',
      email: '',
      radio: '',
      checkbox: []
    }]
  };
  private addForm = ():void => {
    const { forms } = this.state;
    forms.push({
      id: (new Date()).valueOf(),
      name: '',
      email: '',
      radio: '',
      checkbox: []
    });
    this.setState({
      forms
    },() => {
      const forms:any = document.getElementById("forms");
      forms.scrollTop = forms.scrollHeight - forms.offsetHeight;
    });
  };
  private deleteForm = (i: number):Function => {
    const {forms} = this.state;
    return ():void => {
      forms.splice(i,1);
      this.setState({
        forms
      });
    }
  };

  private handleChange = (i: number):Function => {
    const {forms} = this.state;
    return (target: target, type:string):void => {
      const { value } = target;

      switch (type) {
        case 'checkbox': {
          const {checked} = target;
          if (checked) {
            forms[i].checkbox.push(value);
          } else {
            forms[i].checkbox.splice(forms[i].checkbox.indexOf(value), 1);
          }
          break;
        }
        default:
          forms[i][type] = value;
      }
      this.setState({
        forms
      })
    }
  };
  private validate = ():void => {
      let errorId:any;
      const {forms} = this.state;
      const mailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      for(let i = 0, len = forms.length; i < len; i++) {
        let form = forms[i];
        if (!form.name || !mailReg.test(form.email) || !form.radio|| form.checkbox.length === 0) {
          forms[i].error = true;
          if (!errorId) {
            errorId = form.id;
          }
        } else {
          forms[i].error = false;
        }
      }
      this.setState({
        forms
      }, ():void => {
        if (!errorId) return;
        const focusDom:any = document.getElementById(`${errorId}`);
        const forms:any = document.getElementById("forms");
        scrollAnimation(forms,focusDom.offsetTop)
      })
  };
  render() {
    const {forms} = this.state;
    return (
      <>
        <div className="app">
          <div className="btn">
            <button onClick={this.addForm}>Add</button>
            <button style={{marginLeft: '50px'}} onClick={this.validate}>Submit</button>
          </div>
          <div className="forms" id="forms">
            <div className="a"></div>
            {
              forms.map((form, i) => <Form
                key={form.id}
                form={form}
                del={this.deleteForm(i)}
                handleChange={this.handleChange(i)}
              />)
            }
          </div>
        </div>
      </>
    )
  }
}

export default hot(App);

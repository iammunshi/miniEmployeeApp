import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';
import swal from 'sweetalert';

class App extends Component {

  constructor() {
    super();
    this.state = {
      text: "Hello World", 
      world: true, 
      username: "admin@domain.com", 
      password: "admin", 
      isLoggedIn: false,
      employees:[
        {
          id : 1, firstName : 'Talha', lastName: 'Ashfaq', userEmail: 'talhaashfaq.munshi@gmail.com',
          userSalary: 25000, joiningDate: Date()
        }
      ],
      firstName: "",
      lastName: "",
      userEmail: "",
      userSalary: "",
      joiningDate: "",
      isAddButton: false,
      addUpdate: 'Add',
      objectId: 0
      };
    this.changeText = this.changeText.bind(this);
    this.emailFunc = this.emailFunc.bind(this);
    this.passFunc = this.passFunc.bind(this);
    this.firstNameFunc = this.firstNameFunc.bind(this);
    this.lastNameFunc = this.lastNameFunc.bind(this);
    this.userEmailFunc = this.userEmailFunc.bind(this);
    this.userSalaryFunc = this.userSalaryFunc.bind(this);
    this.joiningDateFunc = this.joiningDateFunc.bind(this);
    
    this.loginFunc = this.loginFunc.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.renderLogout = this.renderLogout.bind(this);
    this.logout = this.logout.bind(this);
    this.renderList = this.renderList.bind(this);
    this.addButton = this.addButton.bind(this);
    this.renderAddForm = this.renderAddForm.bind(this);

  }
  changeText(){
    if(this.state.world) {
      this.setState({
        text: "Hello Pakistan",
        world: false
      })
    } else {
      this.setState({
        text: "Hello World",
        world: true
      })
    }
  }
  emailFunc(e) {
    this.setState({
      enteredEmail: e.target.value
    })
  }
  passFunc(e){
    this.setState({
      enteredPassword: e.target.value
    });
  }
  firstNameFunc(e){
    this.setState({
      firstName: e.target.value
    });
  }
  lastNameFunc(e){
    this.setState({
      lastName: e.target.value
    });
  }
  userEmailFunc(e){
    this.setState({
      userEmail: e.target.value
    });
  }
  userSalaryFunc(e){
    this.setState({
      userSalary: e.target.value
    });
  }
  joiningDateFunc(e){
    this.setState({
      joiningDate: e.target.value
    });
  }
  loginFunc(e){
    const {enteredEmail, enteredPassword, username, password, isLoggedIn} = this.state;
    // console.log(enteredEmail);
    // console.log(enteredPassword);
    if(enteredEmail === username && enteredPassword === password){
      console.log("Success")
      this.setState({
        isLoggedIn: true
      });
    }
    else{
      swal("Wrong Credentials");
    }
    e.preventDefault()
  }
  logout(){
    const {isLoggedIn} = this.state;
    this.setState({
      isLoggedIn: false,
      enteredEmail: "",
      enteredPassword: ""
    })
  }
  addButton(){
    const {isAddButton} = this.state;
    this.setState({
      isAddButton: true,
      addUpdate: 'Add',
      firstName: '',
      lastName: '',
      userEmail: '',
      userSalary: '',
    })
    console.log("Add Button Form")
  }
  generateRandomNumber(minVal, maxVal){
    let randomNumber = Math.random() * (maxVal-minVal) + minVal;
    return Math.floor(randomNumber);
  }
  submitForm(){
    const{firstName, lastName, userEmail, userSalary, joiningDate, employees, addUpdate, objectId} = this.state;
    if(addUpdate == "Add"){
      var obj = {
        id: this.generateRandomNumber(1, 100),
        firstName: firstName,
        lastName: lastName,
        userEmail: userEmail,
        userSalary: userSalary,
        joiningDate: Date()
      }
      var newEmployees = [];
      newEmployees.push(obj)
      this.setState({
        isAddButton: false,
        employees: [...employees, ...newEmployees]
      })
    }
    else{
      var newEmployees = employees;
      var obj = {
        id: objectId,
        firstName: firstName,
        lastName: lastName,
        userEmail: userEmail,
        userSalary: userSalary,
        joiningDate: Date()
      }
      if(objectId > 0){
        //Update
        const index = newEmployees.findIndex(p=>p.id == objectId);
        newEmployees.splice(index,1,obj);
      }
      this.setState({
        isAddButton: false,
        addUpdate: 'Add',
        employees: [...newEmployees]
      })
    }
  }
  edit(id){
    const {employees} = this.state;
    const newList = employees;
    let obj = newList.find(p => p.id == id);
    this.setState({
      objectId : obj.id,
      isAddButton: true,
      addUpdate: 'Update',
      firstName: obj.firstName,
      lastName: obj.lastName,
      userEmail: obj.userEmail,
      userSalary: obj.userSalary
    })

  }
  delete(id){
    const {employees} = this.state;
    const newList = employees;
    const index = newList.findIndex(p => p.id == id);
    newList.splice(index, 1);
    this.setState({
      employees : newList,
    })
  }
  renderLogin(){
    const {isLoggedIn} = this.state;
    // if(!isLoggedIn){
      return(
        <Form onSubmit={this.loginFunc}>
          <FormGroup>
            <Label >Email</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="" value={this.state.enteredEmail} onChange={ this.emailFunc } />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input type="password" name="password" id="examplePassword" placeholder="password" value={this.state.enteredPassword} onChange={ this.passFunc } />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
        );
    // }
  }
  renderLogout(){
    const {isLoggedIn} = this.state;
    // if(!!isLoggedIn){
      return(
        <Button onClick={this.logout}>Logout</Button>
        );
    // }
  }

  renderList(){
    const {isLoggedIn, employees, isAddButton} = this.state;
    // if(isLoggedIn && isAddButton){
    return(
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Job Start Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
                {employees.length == 0 &&
                <tr>
                  <td colSpan="8">
                  No Records
                  </td>
                </tr>}
            {
              employees.map((item, index)=>{
              return (
                
                  <tr key={Math.random() * item.id}>
                    <td>{index + 1}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.userEmail}</td>
                    <td>{item.userSalary}</td>
                    <td>{item.joiningDate}</td>
                    <td><button className="btn btn-sm btn-info" onClick={this.edit.bind(this, item.id)}>Edit</button></td>
                    <td><button className="btn btn-sm btn-danger" onClick={this.delete.bind(this,item.id)}>Delete</button></td>
                  </tr>
              )
            })
            }
            </tbody>
      </Table>
    )
  // }
  }
  renderAddButton(){
    const {isLoggedIn, isAddButton} = this.state;
    // if(!!isLoggedIn && isAddButton){
      return(
        <Button onClick={this.addButton}>AddEmployee</Button>
        );
    // }
  }
  renderAddForm(){
    const {isAddButton, isLoggedIn, addUpdate, firstName, lastName, userEmail, userSalary} = this.state;
    return(
      <Form onSubmit={this.addEmployee}>
          <FormGroup>
            <Label >First Name</Label>
            <Input name="firstName" id="firstName" placeholder="" value={this.state.firstName} onChange={ this.firstNameFunc } value={firstName}/>
          </FormGroup>
          <FormGroup>
            <Label >Last Name</Label>
            <Input name="lastName" id="lastName" placeholder="" value={this.state.lastName} onChange={ this.lastNameFunc } value={lastName} />
          </FormGroup>
          <FormGroup>
            <Label >Email</Label>
            <Input name="userEmail" id="userEmail" placeholder="" value={this.state.userEmail} onChange={ this.userEmailFunc } value={userEmail} />
          </FormGroup>
          <FormGroup>
            <Label >Salary</Label>
            <Input name="userSalary" id="userSalary" placeholder="" value={this.state.userSalary} onChange={ this.userSalaryFunc } value={userSalary} />
          </FormGroup>
          <Button onClick={this.submitForm}>{addUpdate}</Button>
        </Form>
    )
  }
  render() {
    const {isLoggedIn,isAddButton, text} = this.state;
    return (
      <div className="App">
        <h1 onClick={this.changeText}>{text}</h1>
        <div>{!isLoggedIn && this.renderLogin()}</div>
        <div>{isLoggedIn && this.renderLogout()}</div>
        <div>{isLoggedIn && !isAddButton &&  this.renderAddButton()}</div>
        <div>{isLoggedIn && !isAddButton && this.renderList()}</div>
        <div>{isLoggedIn && isAddButton && this.renderAddForm()}</div>
      </div>
    );
  }
}

export default App;

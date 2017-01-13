import React, { Component } from 'react';

//BEFORE:
//<td><a href="#">edit/</a> <a href="#">delete/</a> <a href="#">grades</a></td>

class AddStudent extends Component {

  render() {
    return (
      <div>
      <div className="addStudent">
      <h1 className="App-header"> Add Student </h1>
       <form action="#" method="get">
        <div className="form_input">
         <label className="space" for="fname">Student First Name: </label>
         <input type="text" id="fname" required />
        </div>
        <div className="form_input">
         <label className="space" for="lname">Student Last Name: </label>
         <input type="text" id="lname" required />
        </div>
        <div className="form_input">
         <label className="space" for="gpa">Student GPA:</label>
         <input type="text" id="gpa" required />
        </div>
        <a id="left" href="#"><button>Create</button></a>
        <button onClick={() => this.props.returnHome()}> Cancel </button>
       </form>
      </div>
      </div>
    );
  }
}
export default AddStudent;
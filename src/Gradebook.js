import React, { Component } from 'react';

//BEFORE:
//<td><a href="#">edit/</a> <a href="#">delete/</a> <a href="#">grades</a></td>

class Gradebook extends Component {

  render() {

    if( this.props.emptyClassroom === false){
      return (
        <div>Loading... or your students is not here</div>
      );
    }else{
      return (
        <div>
          <h1>Gradebook Front</h1>
          <table>
              <thead>
                  <tr>
                      <th>Student ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Grade Average</th>
                      <th></th>
                  </tr>
              </thead>
              <tbody>
                {
                 Object.keys(this.props.student).map(function(key){
                     return(
                      <tr>
                        <td>{this.props.student[key].id}</td>
                        <td>{this.props.student[key].firstname}</td>
                        <td>{this.props.student[key].lastname}</td>
                        <td>{this.props.student[key].email}</td>
                        <td>{this.props.student[key].gpa}</td>
                        <td>
                          <button onClick={() => this.props.editStudentInfo()}> Edit </button>
                          <button onClick={() => this.props.editStudentGrades(this.props.student[key])}> Grades </button>
                          <button onClick={() => this.props.deleteStudent(this.props.student[key])}> Delete </button>
                        </td>
                      </tr>
                     );
                  }.bind(this))
                }
              </tbody>
          </table>
          <button onClick={() => this.props.addStudent()}>Add Student</button>
        </div>
      );
    }
  }
}

export default Gradebook;

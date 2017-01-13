import React, { Component } from 'react';

//BEFORE:
//<td><a href="#">edit/</a> <a href="#">delete/</a> <a href="#">grades</a></td>

class StudentGrades extends Component {

  render() {
    // console.log("current Student", this.props.currentStudent);
    return (
      <div>
      <h1>Student Name: {this.props.currentStudent.firstname} {this.props.currentStudent.lastname}</h1>

      <h2>Average Grade Average: {this.props.currentStudent.gpa}</h2>
     <table>
         <thead>
             <tr>
                 <th>Grade ID</th>
                 <th>Grade Name</th>
                 <th>Grade</th>
                  <th>Date</th>
                  <th></th>
             </tr>
         </thead>
         <tbody>
              {
               Object.keys(this.props.currentStudent.grades).map(function(key){
                  // console.log("new student ",this.props.currentStudent.grades[key]);
                  if(this.props.currentStudent.grades[key].studentid === this.props.currentStudent.id){
                   return(
                      <tr>
                        <td>{this.props.currentStudent.grades[key].gradeid}</td>
                        <td>{this.props.currentStudent.grades[key].assignment}</td>
                        <td>{this.props.currentStudent.grades[key].grade}</td>
                        <td>{this.props.currentStudent.grades[key].dateadded}</td>
                        <td>
                        <button onClick={() => this.props.deleteStudentGrade(this.props.currentStudent ,this.props.currentStudent.grades[key].gradeid)}> Delete </button>
                        </td>
                      </tr>
                   );
                 }
                }.bind(this))
            }
         </tbody>
     </table>
     <button onClick={() => this.props.returnHome()}> Go back to Home </button>
      </div>
    );
  }
}
export default StudentGrades;

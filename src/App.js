import React, { Component } from 'react';
import './App.css';
import Gradebook from './Gradebook.js';
import StudentInfo from './Student_Info.js';
import StudentGrades from './Student_Grades.js';
import StudentDelete from './Student_Delete.js';
import StudentGradeDelete from './Student_Grade_Delete.js';
import AddStudent from './Add_Student.js'

class App extends Component {
  constructor() {
    super();
    this.state={
      student: {},
      currentStudent: {},
      selectedGrade: {},
      gradebookStudent: true,
      newStudent: false,
      emptyClassroom: false,
      detailStudent: false,
      gradesStudent: false,
      deleteStudent: false,
      deleteStudentGrade: false,
      test: true
    };

    this.editStudentInfo = this.editStudentInfo.bind(this);
    this.editStudentGrades = this.editStudentGrades.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
    this.deleteStudentGrade = this.deleteStudentGrade.bind(this);
    this.addStudent = this.addStudent.bind(this);
    this.returnHome = this.returnHome.bind(this);

  }

  componentWillMount(){
    var url = 'http://localhost:12345/students';
    var myHeaders = new Headers();
    var myInit = { method: 'GET',
           headers: myHeaders,
           mode: 'cors',
           cache: 'no-cache'
         };
    // fetch() hits a url and brings back a response
    fetch(url, myInit).then(
      (response) => {
        // console.log('RESPONSE: ', response);
        //response is then returned to us to use as json formatted data
        return response.json();
      })
    // we then pass that data under "json" and use that to set state
    .then((json) => {
      this.setState({
        ...this.state,
        student: json
      })
      // console.log("json " ,json);
      // console.log("state.student ",this.state.student);
    })
  }

  addStudent(){
    this.setState({
      gradebookStudent: false,
      newStudent: true
    })
  }

  editStudentInfo(){
    this.setState({
      ...this.state,
      gradebookStudent: false,
      detailStudent: true
    })
  }

  editStudentGrades(studentinfo){
    // console.log("student info ", studentinfo);
    this.setState({
      ...this.state,
      gradebookStudent: false,
      gradesStudent: true,
      currentStudent: studentinfo
    })
  }

  deleteStudent(studentinfo){
    console.log("pineapple ",studentinfo)
    this.setState({
      ...this.state,
      gradebookStudent: false,
      detailStudent: false,
      gradesStudent: false,
      deleteStudent: true,
      currentStudent: studentinfo
    })
  }

  deleteStudentGrade(studentinfo, selectedGrade){
    this.setState({
      ...this.state,
      gradebookStudent: false,
      detailStudent: false,
      gradesStudent: false,
      deleteStudent: false,
      deleteStudentGrade: true,
      currentStudent: studentinfo,
      selectedGrade: selectedGrade
    })
  }

  returnHome(){
    this.setState({
      ...this.state,
      gradebookStudent: true,
      detailStudent: false,
      gradesStudent: false,
    })
  }
      //remember to add error catching


  render() {
      if(this.state.gradebookStudent){
        return (
          //passing in all students into Gradebook as props
          <Gradebook
              student={this.state.student}
              addStudent={() => this.addStudent()}
              editStudentInfo={() => this.editStudentInfo()}
              editStudentGrades={(studentinfo) => this.editStudentGrades(studentinfo)}
              deleteStudent={(studentinfo) => this.deleteStudent(studentinfo)}
          />
        );
      }
      if(this.state.detailStudent) {
        return(
          <StudentInfo
            returnHome={() => this.returnHome()}
          />
        );
      }
      if(this.state.gradesStudent){
        return(
          <StudentGrades
          currentStudent={this.state.currentStudent}
          deleteStudentGrade={(studentinfo, selectedGrade) => this.deleteStudentGrade(studentinfo, selectedGrade)}
          returnHome={() => this.returnHome()}
          />
        );
      }
      if(this.state.deleteStudent){
        return(
          <StudentDelete
          currentStudent={this.state.currentStudent}
          returnHome={() => this.returnHome()}
          />
        );
      }
      if(this.state.deleteStudentGrade){
        return(
          <StudentGradeDelete
          currentStudent={this.state.currentStudent}
          selectedGrade={this.state.selectedGrade}
          returnHome={() => this.returnHome()}
          />
        );
      }
      if(this.state.newStudent){
        return(
          <AddStudent
          returnHome={() => this.returnHome()}
          />
        );
      }
  }
}

export default App;

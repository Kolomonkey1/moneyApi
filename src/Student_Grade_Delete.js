import React, { Component } from 'react';

//BEFORE:
//<td><a href="#">edit/</a> <a href="#">delete/</a> <a href="#">grades</a></td>

class StudentGradeDelete extends Component {
  deleteGrade(StudentID, GradeInfo){
    var url = 'http://localhost:12345/students/'+ StudentID + '/' + GradeInfo;
    var myHeaders = new Headers();
    var myInit = { method: 'DELETE',
           headers: myHeaders,
           mode: 'cors',
           cache: 'no-cache'
         };
    // fetch() hits a url and brings back a response
    // console.log('URL: ', url);
    // console.log('myInit: ', myInit);


    fetch(url, myInit).then(
      (response) => {
        //console.log('RESPONSE: ', response);
        //response is then returned to us to use as json formatted data
        return response.json();
      })
    // we then pass that data under "json" and use that to set state
    .then((json) => {
      this.setState({
        ...this.state,
        gradebookStudent: true,
      })
      // console.log("json " ,json);
      // console.log("state.student ",this.state.student);
    })
  }
  render() {
    return (
      <div>
      <h2>Delete</h2>

      <h3>Are you sure you want to delete this Grade?</h3>
      <form /*method= delete*/>
           <div>
              <button onClick={() => this.deleteGrade(this.props.currentStudent.id , this.props.selectedGrade)}> Delete </button> |
              <button onClick={() => this.props.returnHome()}> Cancel </button>
           </div>
       </form>
      </div>
    );
  }
}
export default StudentGradeDelete;

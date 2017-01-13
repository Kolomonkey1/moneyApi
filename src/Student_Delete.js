import React, { Component } from 'react';

//BEFORE:
//<td><a href="#">edit/</a> <a href="#">delete/</a> <a href="#">grades</a></td>

class StudentDelete extends Component {
  deleteStudent(){
    var url = 'http://localhost:12345/students/'+ this.props.currentStudent.id;
    var myHeaders = new Headers();
    var myInit = { method: 'DELETE',
           headers: myHeaders,
           mode: 'cors',
           cache: 'no-cache'
         };
    // fetch() hits a url and brings back a response
    console.log('URL: ', url);
    console.log('myInit: ', myInit);


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

    console.log("delete ",this.props);
    //var studentID = {this.props.currentStudent.id};
    return (
      <div>
      <h2>Delete</h2>

      <h3>Are you sure you want to delete Student: {this.props.currentStudent.firstname} {this.props.currentStudent.lastname} </h3>
      <form>
           <div>
              <button onClick={() => this.deleteStudent(this.props.currentStudent.id)} > Delete </button> |
              <button onClick={() => this.props.returnHome()}> Cancel </button>
           </div>
       </form>
      </div>
    );
  }
}
export default StudentDelete;

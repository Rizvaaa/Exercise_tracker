// // components/edit-exercise.component.js
// import React, { Component } from 'react';
// import axios from 'axios';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
// import { useParams } from 'react-router-dom';

// export default class EditExercise extends Component {
//   constructor(props) {
//     super(props);


//     this.onChangeUsername = this.onChangeUsername.bind(this);
//     this.onChangeDescription = this.onChangeDescription.bind(this);
//     this.onChangeDuration = this.onChangeDuration.bind(this);
//     this.onChangeDate = this.onChangeDate.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);

//     this.state = {
//       username: '',
//       description: '',
//       duration: 0,
//       date: new Date(),
//       users: []
//     };
//   }

//   componentDidMount() {
//         const { id } = useParams();
//     axios.get('http://localhost:5000/exercise/${id}')
//       .then(response => {
//         this.setState({
//           username: response.data.username,
//           description: response.data.description,
//           duration: response.data.duration,
//           date: new Date(response.data.date)
//         });
//       })
//       .catch(error => console.log(error));

//     axios.get('http://localhost:5000/users/')
//       .then(response => {
//         if (response.data.length > 0) {
//           this.setState({
//             users: response.data.map(user => user.username)
//           });
//         }
//       });
//   }

//   onChangeUsername(e) {
//     this.setState({ username: e.target.value });
//   }

//   onChangeDescription(e) {
//     this.setState({ description: e.target.value });
//   }

//   onChangeDuration(e) {
//     this.setState({ duration: e.target.value });
//   }

//   onChangeDate(date) {
//     this.setState({ date: date });
//   }

//   onSubmit(e) {
//     e.preventDefault();

//     const exercise = {
//       username: this.state.username,
//       description: this.state.description,
//       duration: this.state.duration,
//       date: this.state.date
//     };

//     console.log(exercise);

//     axios.post('http://localhost:5000/exercise/update/:id' + this.props.match.params.id, exercise)
//       .then(res => console.log(res.data));

//     window.location = '/';
//   }

//   render() {
//     return (
//       <div>
//         <h3>Edit Exercise Log</h3>
//         <form onSubmit={this.onSubmit}>
//           <div className="form-group">
//             <label>Username: </label>
//             <select
//               required
//               className="form-control"
//               value={this.state.username}
//               onChange={this.onChangeUsername}>
//               {
//                 this.state.users.map(user => (
//                   <option key={user} value={user}>{user}</option>
//                 ))
//               }
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Description: </label>
//             <input type="text"
//               required
//               className="form-control"
//               value={this.state.description}
//               onChange={this.onChangeDescription}
//             />
//           </div>
//           <div className="form-group">
//             <label>Duration (in minutes): </label>
//             <input
//               type="text"
//               className="form-control"
//               value={this.state.duration}
//               onChange={this.onChangeDuration}
//             />
//           </div>
//           <div className="form-group">
//             <label>Date: </label>
//             <div>
//               <DatePicker
//                 selected={this.state.date}
//                 onChange={this.onChangeDate}
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <input type="submit" value="Update Exercise Log" className="btn btn-primary" />
//           </div>
//         </form>
//       </div>
//     )
//   }
// }
// components/edit-exercise.component.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function EditExercise() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/exercise/${id}`)
      .then(response => {
        setUsername(response.data.username);
        setDescription(response.data.description);
        setDuration(response.data.duration);
        setDate(new Date(response.data.date));
      })
      .catch(error => console.log(error));

    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          setUsers(response.data.map(user => user.username));
        }
      });
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username,
      description,
      duration,
      date
    };

    console.log(exercise);

    axios.post(`http://localhost:5000/exercise/update/${id}`, exercise)
      .then(res => {
        console.log(res.data);
        navigate('/');
      });
  };

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select required className="form-control" value={username} onChange={e => setUsername(e.target.value)}>
            {
              users.map(user => (
                <option key={user} value={user}>{user}</option>
              ))
            }
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input type="text" required className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input type="text" className="form-control" value={duration} onChange={e => setDuration(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <DatePicker selected={date} onChange={date => setDate(date)} />
        </div>
        <div className="form-group">
          <input type="submit" value="Update Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}

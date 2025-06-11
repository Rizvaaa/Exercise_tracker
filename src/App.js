import React from "react";
import { BrowserRouter as Router,Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar.component";
import CreateExercises from "./components/create-exercise.component";
// import CreateUser from "./components/create-user.component";
// import EditExercise from "./components/edit-exercise.component";
// import ExercisesList from "./components/exercises-list.component";



function App() {
  return (
    <Router>
      <Navbar/>
      <br/>
      <Routes>
      {/* <Route path="/" exact Component={ExercisesList}/> */}
      {/* <Route path="/edit/:id" exact Component={EditExercise}/> */}
      <Route path="/create" Component={CreateExercises}/>
      {/* <Route path="/user" exact Component={CreateUser}/> */}
      </Routes>
    </Router>
  );
}

export default App;

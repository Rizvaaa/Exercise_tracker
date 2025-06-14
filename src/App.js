import React from "react";
import { BrowserRouter as Router,Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar.component";
import CreateExercises from "./components/create-exercise.component";
import CreateUsers from "./components/create-user.component";
import EditExercise from "./components/edit-exercise.componet";
import ExercisesList from "./components/exercises-list.component";



function App() {
  return (
    <Router>
      <div >
      <Navbar/>
      <br/>
      <Routes>
      <Route path="/" element ={<ExercisesList/>}/>
      <Route path="/edit/:id" element={<EditExercise/>}/>
      <Route path="/create" element={<CreateExercises/>}/>
      <Route path="/user" element={<CreateUsers/>}/>
      </Routes>
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HabitList from './components/HabitList';
import HabitForm from './components/HabitForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HabitList />} />
        <Route path="/add" element={<HabitForm />} />
        <Route path="/edit/:id" element={<HabitForm />} />
      </Routes>
    </Router>
  );
}

export default App;

// src/components/HabitList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  // تأكد من استيراد Link

function HabitList() {
  const [habits, setHabits] = useState([]);
  const [filters, setFilters] = useState({ category: '', tag: '', search: '' });

  useEffect(() => {
    fetchHabits();
  }, [filters]);

  const fetchHabits = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/habits', { params: filters });
      setHabits(response.data);
    } catch (error) {
      console.error('Error fetching habits:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/habits/delete/${id}`);
      fetchHabits();
    } catch (error) {
      console.error('Error deleting habit:', error);
    }
  };

  return (
    <div>
      <h1>Habit List</h1>
      <Link to="/add">Add New Habit</Link>
      {/* Add HabitFilters component here */}
      <ul>
        {habits.map(habit => (
          <li key={habit._id}>
            {habit.name} - {habit.category}
            <Link to={`/edit/${habit._id}`}>Edit</Link>
            <button onClick={() => handleDelete(habit._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HabitList;

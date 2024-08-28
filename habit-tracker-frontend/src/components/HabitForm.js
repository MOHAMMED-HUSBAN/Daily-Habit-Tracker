import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function HabitForm() {
  const [habit, setHabit] = useState({ name: '', description: '', category: '', tags: [], goal: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchHabit = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/habits/${id}`);
          setHabit(response.data);
        } catch (error) {
          console.error('Error fetching habit:', error);
          setError('Failed to fetch habit. Please try again.');
        }
      };
      fetchHabit();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHabit({ ...habit, [name]: value });
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim());
    setHabit({ ...habit, tags });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', habit);
    setIsLoading(true);
    setError('');
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/habits/update/${id}`, habit);
      } else {
        await axios.post('http://localhost:5000/api/habits/add', habit);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving habit:', error);
      setError('Failed to save habit. Please try again.');
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>{id ? 'Edit Habit' : 'Add Habit'}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={habit.name}
          onChange={handleChange}
          placeholder="Habit Name"
          required
        />
        <textarea
          name="description"
          value={habit.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input
          type="text"
          name="category"
          value={habit.category}
          onChange={handleChange}
          placeholder="Category"
        />
        <input
          type="text"
          name="tags"
          value={habit.tags.join(', ')}
          onChange={handleTagsChange}
          placeholder="Tags (comma-separated)"
        />
        <input
          type="number"
          name="goal"
          value={habit.goal}
          onChange={handleChange}
          placeholder="Goal"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
}

export default HabitForm;
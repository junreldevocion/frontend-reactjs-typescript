import { useEffect, useState } from 'react';
import './App.css';

interface User {
  id: number;
  name: string;
  email: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editingUser, setEditingUser] = useState<User | null>(null);

  console.log(process.env.REACT_APP_API_URL);

  const fetchUsers = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/users`)
      .then(res => res.json())
      .then(data => setUsers(data));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id: number) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/users/${id}`, {
      method: 'DELETE',
    })
      .then(() => fetchUsers());
  };

  const handleUpdate = (user: User) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(() => {
        fetchUsers();
        setEditingUser(null);
      });
  };

  const handleAdd = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then(() => {
        fetchUsers();
        setNewUser({ name: '', email: '' });
      });
  };

  return (
    <div className="container">
      <h1>User Management</h1>

      {/* Add User Form */}
      <div className="add-user-form">
        <h2>Add New User</h2>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button onClick={handleAdd}>Add User</button>
      </div>

      {/* Users Table */}
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {editingUser?.id === user.id ? (
                  <input
                    type="text"
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editingUser?.id === user.id ? (
                  <input
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingUser?.id === user.id ? (
                  <>
                    <button onClick={() => handleUpdate(editingUser)}>Save</button>
                    <button onClick={() => setEditingUser(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setEditingUser(user)}>Edit</button>
                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

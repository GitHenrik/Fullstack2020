import React from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const UserList = () => {
  const users = useSelector(state => state.users)
  return (
    <div>
      <h3>User data</h3>
      <table>
        <tbody>
          <tr>
            <th>Username</th>
            <th>Blog count</th>
          </tr>
          {
            users.map(user => {
              return (
                <tr key={user.id}>
                  <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                  <td>{user.blog.length}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default UserList
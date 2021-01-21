import React from 'react';
import { useSelector } from 'react-redux'
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
                  <td>{user.name}</td>
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
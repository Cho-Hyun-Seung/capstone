const User = ({ userData }: any) => {
  return (
    <tr>
      <td>{userData.name}</td>
      <td>{userData.email}</td>
    </tr>
  )
}

const UserList = () => {
  const users = [
    { id: 1, email: 'john@gmail.com', name: 'John' },
    { id: 2, email: 'kim@gmail.com', name: 'Kim' },
    { id: 3, email: 'roy@gmail.com', name: 'Roy' },
  ]

  return (
    <table>
      <thead>
        <tr>
          <th>이름</th>
          <th>이메일</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user: any) => (
          <User key={user.id} userData={user} />
        ))}
      </tbody>
    </table>
  )
}

export default UserList

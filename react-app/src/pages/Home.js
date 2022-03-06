import React from 'react'
import Layout from '../components/layout'
import { Link } from 'react-router-dom'
import { Container, Table, Card, Button, Row, Badge } from 'react-bootstrap'
import {
  BsFillPersonPlusFill,
  BsFillPencilFill,
  BsTrashFill,
} from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, deleteUser } from '../redux/action/userAction'
import Swal from 'sweetalert2'

function Home(props) {
  const dispatch = useDispatch()

  React.useLayoutEffect(() => {
    dispatch(getUsers())
  }, [])
  const dateFormate = function (date) {
    return new Date(date).toLocaleString().split(',')[0]
  }

  const data = useSelector((state) => state.userReducer)
  const users = data && data.users ? data.users : []

  function userMap(users) {
    return users.map((user, index) => (
      <tr key={index}>
        <td>{++index}</td>
        <td>{user?.userName}</td>
        <td>{user?.gender}</td>
        <td>{user?.age}</td>
        <td>
          {user?.status == 'Active' ? (
            <Badge bg="success">{user?.status}</Badge>
          ) : (
            <Badge bg="danger">{user?.status}</Badge>
          )}
        </td>
        <td>{dateFormate(user?.date)}</td>
        <td>{user?.hobby.toString()}</td>
        <td>
          <Link to={`/edit/${user?._id}`}>
            <Button className="btn btn-warning space-bw">
              <BsFillPencilFill />
            </Button>
          </Link>
          <Button
            className="btn btn-danger"
            onClick={() => {
              handleDelete(user?._id)
            }}
          >
            <BsTrashFill />
          </Button>
        </td>
      </tr>
    ))
  }

  // DELETE USER
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00AA55',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(id))
      }
    })
  }

  return (
    <Layout header="true">
      <Container>
        <br />
        <Card>
          <Card.Header>
            <Row>
              TO-DO
              <div className="btn-end">
                <Link to="/add">
                  <Button>
                    <BsFillPersonPlusFill />
                  </Button>
                </Link>
              </div>
            </Row>
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Gender</th>
                  <th>Age</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Hobby</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{users && users.length > 0 && userMap(users)}</tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  )
}

export default Home

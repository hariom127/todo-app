import React from 'react'
import { Container, Card, Button, Form, Row, Col } from 'react-bootstrap'
import Layout from '../components/layout'
import { Link } from 'react-router-dom'
import { BsArrowLeftCircleFill } from 'react-icons/bs'
import RangeSlider from 'react-bootstrap-range-slider'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css'
import Select from 'react-select'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { createUser } from '../redux/action/userAction'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// form validation
const schema = Yup.object().shape({
  userName: Yup.string()
    .min(2, 'Username must be 2 characters or more.')
    .max(50, 'Category must be 50 characters or less.')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field')
    .required('Username is required'),
})

function Add(props) {
  const [value, setValue] = React.useState(25)
  const [statusValue, setStatusvalue] = React.useState(null)
  const [formReset, setformReset] = React.useState(false)
  const [dateValue, setDateValue] = React.useState(new Date())

  React.useEffect(() => {
    // reset form
    reset()
  }, [formReset])

  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (formData) => {
    const { userName, gender, hobby, taskName } = formData
    let age = value
    let date = dateValue
    let data = new FormData()
    data.append('userName', userName)
    data.append('gender', gender)
    data.append('hobby', hobby)
    data.append('taskName', taskName)
    data.append('age', age)
    data.append('status', statusValue.value)
    data.append('date', date)

    dispatch(createUser(data))
    setformReset(true)
  }
  // select-field options
  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
  ]

  return (
    <Layout header="true">
      <Container>
        <br />
        <Card>
          <Card.Header>
            Create to-do
            <div className="btn-end">
              <Link to="/">
                <Button>
                  <BsArrowLeftCircleFill />
                </Button>
              </Link>
            </div>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>
                  Username <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  name="userName"
                  {...register('userName')}
                  type="text"
                  placeholder="Enter username"
                />
                <p className="text-danger">{errors.userName?.message}</p>
              </Form.Group>

              <Form.Label>Gender</Form.Label>
              <div key="inline-radio" className="mb-3">
                <Form.Check
                  inline
                  label="Male"
                  name="gender"
                  type="radio"
                  value="Male"
                  id="inline-radio-1"
                  {...register('gender')}
                />
                <Form.Check
                  inline
                  label="Female"
                  name="gender"
                  type="radio"
                  value="Female"
                  id="inline-radio-2"
                  {...register('gender')}
                />
              </div>

              <Form.Label>Hobby</Form.Label>
              <div key="inline-checkbox" className="mb-3">
                <Form.Check
                  inline
                  label="Sports"
                  name="hobby"
                  type="checkbox"
                  value="Sports"
                  id="inline-checkbox-1"
                  {...register('hobby')}
                />
                <Form.Check
                  inline
                  label="Reading"
                  name="hobby"
                  type="checkbox"
                  value="Reading"
                  id="inline-checkbox-2"
                  {...register('hobby')}
                />
                <Form.Check
                  inline
                  label="Music"
                  name="hobby"
                  type="checkbox"
                  value="Music"
                  id="inline-checkbox-2"
                  {...register('hobby')}
                />
              </div>

              <Form.Group as={Row}>
                <Form.Label>Age</Form.Label>

                <Col xs="6">
                  <RangeSlider
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    size="sm"
                    min={18}
                    max={55}
                  />
                </Col>
                <Col xs="2">
                  <Form.Control value={`${value} year`} size="sm" disabled />
                </Col>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Row>
                  <Col xs="6">
                    <Form.Label>Date</Form.Label>
                    <DatePicker
                      selected={dateValue}
                      onChange={(date) => setDateValue(date)}
                      className="form-control"
                    />
                  </Col>
                  <Col xs="6">
                    <Form.Label>Status</Form.Label>
                    <Select options={options} onChange={setStatusvalue} />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Task name</Form.Label>
                <Form.Control
                  name="taskName"
                  {...register('taskName')}
                  as="textarea"
                  rows={3}
                  placeholder="Enter task"
                />
              </Form.Group>
              <Button type="submit">Submit</Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  )
}

export default Add

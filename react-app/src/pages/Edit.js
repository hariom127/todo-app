import React from 'react'
import { Container, Card, Button, Form, Row, Col } from 'react-bootstrap'
import Layout from '../components/layout'
import { Link, useParams } from 'react-router-dom'
import { BsArrowLeftCircleFill } from 'react-icons/bs'
import RangeSlider from 'react-bootstrap-range-slider'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleUser, updateUser } from '../redux/action/userAction'

const schema = yup.object({
  userName: yup
    .string()
    .max(15, 'Username 15 characters or less.')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field')
    .required('Username name required.'),
})

function Edit(props) {
  const { userId } = useParams()
  const [ageValue, setAgeValue] = React.useState(25)
  const [dateValue, setDateValue] = React.useState(new Date())
  const [selectedOption, setSelectedOption] = React.useState(null)
  const [sport, setSport] = React.useState(null)
  const [reading, setReading] = React.useState(null)
  const [music, setMusic] = React.useState(null)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getSingleUser(userId))
  }, [userId])

  // get data from store
  const apiData = useSelector((state) => state.userReducer)
  const data = apiData && apiData.users ? apiData.users : {}

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
  ]

  React.useEffect(() => {
    if (data && data.userName) {
      setValue('userName', data.userName, { shouldDirty: true })
      setValue('gender', data.gender, { shouldDirty: true })
      setValue('taskName', data.taskName, { shouldDirty: true })
      setValue('status', data.status, { shouldDirty: true })

      if (data.hobby.includes('Sport')) {
        setSport(() => {
          return true
        })
      }
      if (data.hobby.includes('Music')) {
        setMusic(() => {
          return true
        })
      }
      if (data.hobby.includes('Reading')) {
        setReading(() => {
          return true
        })
      }

      setSport(true)
      setAgeValue(data.age)
      if (data.status == 'Active') {
        setSelectedOption('Active')
      } else {
        setSelectedOption('Inactive')
      }
    }
  }, [data])

  const onSubmit = (formData) => {
    const { userName, gender, status, taskName } = formData
    let age = ageValue
    let date = dateValue
    let hobbydata = []
    if (sport) {
      hobbydata.push('sport')
    }
    if (reading) {
      hobbydata.push('reading')
    }
    if (music) {
      hobbydata.push('music')
    }
    let data = new FormData()
    data.append('id', userId)
    data.append('userName', userName)
    data.append('gender', gender)
    data.append('hobby', JSON.stringify(hobbydata))
    data.append('taskName', taskName)
    data.append('age', age)
    data.append('status', status)
    data.append('date', date)
    dispatch(updateUser(data))
  }

  return (
    <Layout header="true">
      <Container>
        <br />
        <Card>
          <Card.Header>
            Update to-do
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
                  Username<sapn className="text-danger">*</sapn>
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
                  checked={sport}
                  onChange={() => {
                    setSport(!sport)
                  }}
                />
                <Form.Check
                  inline
                  label="Reading"
                  name="hobby"
                  type="checkbox"
                  value="Reading"
                  id="inline-checkbox-2"
                  {...register('hobby')}
                  checked={reading}
                  onChange={() => {
                    setReading(!reading)
                  }}
                />
                <Form.Check
                  inline
                  label="Music"
                  name="hobby"
                  type="checkbox"
                  value="Music"
                  id="inline-checkbox-2"
                  {...register('hobby')}
                  checked={music}
                  onChange={() => {
                    setMusic(!music)
                  }}
                />
              </div>

              <Form.Group as={Row}>
                <Form.Label>Age</Form.Label>

                <Col xs="6">
                  <RangeSlider
                    value={ageValue}
                    onChange={(e) => setAgeValue(e.target.value)}
                    size="sm"
                    min={18}
                    max={55}
                  />
                </Col>
                <Col xs="2">
                  <Form.Control value={`${ageValue} year`} size="sm" disabled />
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
                    <Form.Select
                      aria-label="Default select example"
                      {...register('status')}
                    >
                      <option>Select</option>
                      {options.map((el) => (
                        <option
                          value={el.value}
                          selected={el.value == selectedOption}
                        >
                          {el.label}
                        </option>
                      ))}
                    </Form.Select>
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

export default Edit

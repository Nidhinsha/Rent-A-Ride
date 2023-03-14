import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userSignup } from '../../../Redux/Actions/userActions';
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../../../components/Loading/Loading';
import ErrorMessage from '../../../components/Alert/Error';
function Signup() {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')


  const navigate = useNavigate()
  const dispatch = useDispatch()

  // not finished
  const haveAccount = () => {
    navigate('/user-login')
  }

  const Signup = useSelector(state => state.userSignup)

  const { loading, error, userInfo } = Signup

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(firstName, lastName, email, phone, password);

    dispatch(userSignup(firstName, lastName, email, phone, password))

  }
  // this one redirect the user into login page
  useEffect(() => {
    if (userInfo) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  return (
    <div>
      <form action="">

        {/* error showing */}
        {error ? <ErrorMessage variant="danger"> {error}</ErrorMessage> : ""}

        {/* loadding showing */}
        {loading ? <strong><Loading /> </strong> : ""}


        <input
          onChange={(e) => {
            setFirstName(e.target.value)
          }}
          type="text"
          name="firstName"

        />
        <input
          onChange={(e) => {
            setLastName(e.target.value)
          }}
          type="text"
          name="lastName"

        />
        <input
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          type="email"
          name="email"

        />
        <input
          onChange={(e) => {
            setPhone(e.target.value)
          }}
          type="number"
          name="phone"

        />

        <input
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          type="password"
          name="password"

        />

        <button onClick={handleSubmit}>submit</button>
      </form>

      <div>
        <Link to={'/login'}>login</Link>
      </div>
    </div>
  )
}

export default Signup



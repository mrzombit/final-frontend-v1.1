import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import URL from './../URL'

function DBTest2() {
  const [user, setUser] = useState({});
  const { register, handleSubmit } = useForm();
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVyaWthQTEiLCJzdWIiOiI2Mzk5NWU4MmI0YmIzN2JlNTA5ZjYxZDgiLCJpYXQiOjE2NzA5OTU1OTQsImV4cCI6MTY3MDk5OTE5NH0.Fs1ePCEjwy58grTeMWNU5mot73BiyORUvvHRF2sYsk8'
  const username = "erikaA1"
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    if (!isLoaded) {
      const config = {
        params: { username: username },
        headers: { Authorization: `Bearer ${token}` }
      }
      axios.get(`${URL}/user/username`,
        config,
      )
        .then(res => {
          console.log("response!");
          console.log(res)
          setUser(res.data)
          setIsLoaded(true)
        })
        .catch(function (error) {
          console.log(error);
        })
    }

  }, [isLoaded])

  const saveData = (user = null) => {
    alert("save data");
  }

  const submitAllForms = () => {
    document.getElementById("nameForm").submit();
    document.getElementById("surnameForm").submit();
    document.getElementById("usernameForm").submit();
    document.getElementById("emailForm").submit();
    document.getElementById("passwordForm").submit();
  }

  const submitNameForm = (input) => {
    const data = input
    const config = {
      params: {username: user.username}
    }
    axios.put(`${URL}/user/update`,data, config,)
    .then(res => {
      setIsLoaded(false)
    })
    .catch(function (error) {
      console.log(error);
    })
  }


  return (
    <div>
      <div>DBTest2</div>
      <div className='card-body'>
        <div className='text-lg-center'>
          User data:
        </div>
        <div className='m-2 border'>
          <form id="nameForm" onSubmit={handleSubmit(submitNameForm)}>
            <div id='name' className="d-flex">
              <div className="m-2 w-50 justify-content-end">name</div>
              <div className="m-2 w-50 justify-content-center text-danger">{user.name}</div>
              <input
                type="name" className="form-control"
                {...register('name', { required: true })}
                className="m-2 w-50 justify-content-center" />
              <button className="m-2 btn w-50 justify-content-center btn-primary" type="submit">save</button>
            </div>
          </form>
          <div id='surname' className="d-flex">
            <div className="m-2 w-50 justify-content-end">surname</div>
            <div className="m-2 w-50 justify-content-center text-danger">{user.surname}</div>
            <input className="m-2 w-50 justify-content-center" />
            <button className="m-2 btn w-50 justify-content-center btn-primary">save</button>
          </div>
          <div id='email' className="d-flex">
            <div className="m-2 w-50 justify-content-end">email</div>
            <div className="m-2 w-50 justify-content-center text-danger">{user.email}</div>
            <input className="m-2 w-50 justify-content-center" />
            <button className="m-2 btn w-50 justify-content-center btn-primary">save</button>
          </div>
          <div id='username' className="d-flex">
            <div className="m-2 w-50 justify-content-end">username</div>
            <div className="m-2 w-50 justify-content-center text-danger">{user.username}</div>
            <input className="m-2 w-50 justify-content-center" />
            <button className="m-2 btn w-50 justify-content-center btn-primary">save</button>
          </div>
          <div id='password' className="d-flex">
            <div className="m-2 w-50 justify-content-end">password</div>
            <div className="m-2 w-50 justify-content-center text-danger">*****</div>
            <input className="m-2 w-50 justify-content-center" />
            <button className="m-2 btn w-50 justify-content-center btn-primary">save</button>
          </div>
        </div>
        <div className='flex'>
          <div className='m-1 btn btn-primary'
            onClick={() => saveData()}> save </div>
          <div className='m-1 btn btn-danger'
            onClick={() => deleteData()}> delete </div>
        </div>
      </div>
    </div>
  )
}

export default DBTest2
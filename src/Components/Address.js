import React,{useState} from 'react';
import { useNavigate , Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import '../Styles/Address.css'
import {Add_into_address} from '../Redux/Actions.js'

const Address = () => { 

  const navigate = useNavigate()
  const dispatch = useDispatch()

    const [getaddress , setGetAddress] = useState({
        fullname: '',
        streetnumber: '',
        apartment:'',
        city:'',
        state:'',
        pincode:'',
        mobile:''
    })
    const [message , setMessage] = useState({
        fullname: false,
        streetnumber: false,
        apartment:false,
        city:false,
        state:false,
        pincode:false,
        mobile:false
    })

    const handlePhonenumber = (event) =>{
        if(event.target.value.slice(-1).match(/[0-9]/) || event.target.value === ''){
            (event.target.value.length <= 10 && setGetAddress({...getaddress,  mobile: event.target.value}))
            }
    }
    const handlePincode = (event) =>{
        if(event.target.value.slice(-1).match(/[0-9]/) || event.target.value === ''){
          (event.target.value.length <= 6 && setGetAddress({...getaddress, pincode: event.target.value}))
          }
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        setMessage(validation(getaddress))
        console.log(message)
        if(!message.toString.length){
          const newAddress = {...getaddress};
          dispatch(Add_into_address(newAddress));
          navigate('/payment');
        }
    }

    const validation = (value) =>{
      const messages = {}
      if(!value.fullname){
        messages.fullname = true
      }
      if(!value.streetnumber){
        messages.streetnumber = true
      }
      if(!value.apartment){
        messages.apartment = true
      }
      if(!value.city){
        messages.city = true
      }
      if(!value.state){
        messages.state = true
      }
      if(!value.pincode){
        messages.pincode = true
      }
      if(!value.mobile){
        messages.mobile = true
      }
    return messages
    }
    return (
        <div className="form_container">
            <Link to='/'>
                <img
                    className="login__logo"
                    
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' 
                    alt='Amazon'
                />
            </Link>
            <h3>Select a delivery address</h3>
            <hr></hr>
            <form onSubmit={handleSubmit} >
                    <div className="mb-3">
                      <label >Full name (First and Last name)</label>
                      <input type="text" value={getaddress.fullname} onChange={(e) => setGetAddress({...getaddress, fullname: e.target.value})}  />
                      {message.fullname && <div className="form-text text-danger d-flex align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info" viewBox="0 0 16 16">
                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                            </svg>
                         <span className='ms-1'>Please enter a name.</span></div>
                         }
                    </div>
                    <div className="mb-3">
                      <label >Street number</label>
                      <input type="text" value={getaddress.streetnumber}  onChange={(e) => setGetAddress({...getaddress, streetnumber: e.target.value})} placeholder='Street address, P.O.box, company name, c/o'/>
                        {message.streetnumber && <div className="form-text text-danger d-flex align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info" viewBox="0 0 16 16">
                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                            </svg>
                          <span className='ms-1'>Please enter an address.</span>
                          </div>
                        }
                      <input type="text" className='mt-2' value={getaddress.apartment} onChange={(e) => setGetAddress({...getaddress , apartment: e.target.value})} placeholder='Apartment, suite,unit,building,floor,etc' />
                      {message.apartment && <div className="form-text text-danger d-flex align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info" viewBox="0 0 16 16">
                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                            </svg>
                          <span className='ms-1'>Please enter an apartment (Number).</span>
                          </div>
                        }
                    </div>
                    <div className="mb-3 ">
                      <label >City</label>
                      <input type="text" value={getaddress.city}  onChange={(e) => setGetAddress({...getaddress , city: e.target.value})} />
                      {message.city && 
                          <div className="form-text text-danger d-flex align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info" viewBox="0 0 16 16">
                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                            </svg>
                          <span className='ms-1'>Please enter a city name.</span>
                          </div>
                        }
                    </div>
                    <div className="mb-3">
                      <label >State / Province / Region</label>
                      <input type="text" value={getaddress.state} onChange={(e) => setGetAddress({...getaddress , state: e.target.value})} />
                    </div>
                    <div className="mb-3">
                      <label >PIN Code</label>
                      <input type="text" value={getaddress.pincode} onChange={handlePincode}/>
                      {message.pincode && 
                         <div className="form-text text-danger d-flex align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info" viewBox="0 0 16 16">
                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                            </svg>
                          <span className='ms-1'>Please enter a ZIP or postal code.</span>
                          </div>
                        }
                    </div>
                    <div className="mb-3">
                      <label >Phone number</label>
                      <input type="text" value={getaddress.mobile} onChange={handlePhonenumber} />
                      {message.mobile && <div className="form-text text-danger d-flex align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info" viewBox="0 0 16 16">
                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                            </svg>
                          <span className='ms-1'>Please enter a phone number so we can call if there are any issues with delivery.</span>
                          </div>
                        }
                    </div>
                    <button type="submit" >Use this address</button>
            </form>
            </div>
    )
}

export default Address;
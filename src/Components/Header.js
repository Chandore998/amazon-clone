import React,{useState} from "react";
import "../Styles/Header.css";
import {Remove_User} from '../Redux/Actions'
import {useDispatch} from 'react-redux';
import {auth} from './firebase';
import { signOut } from "firebase/auth";
import { Link , useNavigate,useLocation} from "react-router-dom";
import {useSelector} from 'react-redux'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PushPinIcon from '@mui/icons-material/PushPin';
import { createTheme ,ThemeProvider} from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6c757d',
    },

  },
});

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [pincode, setPinCode] = useState({city:null , pincode: '',currentpincode:''})
    const [pinmessage , setPinMessage] = useState(false);
    const basketItemsLength = useSelector((state) => state.basket.basket.length);

    const currentLocation = location.pathname

    const handleChangePin = (event) =>{
      if(event.target.value.slice(-1).match(/[0-9]/)){
        event.target.value.length > 6 ? setPinMessage(true) : setPinCode({...pincode , pincode: event.target.value}) 
      }
    }


    const handlePin = async () =>{
      pincode.pincode.length === 6 &&
      fetch(`https://api.postalpincode.in/pincode/${pincode.pincode}`)
      .then((response) => response.json()).then((data) => {
        setPinCode({...pincode , city: {...data[0]}.PostOffice[0].Region , currentpincode: pincode.pincode })
      }).catch((error) => console.log(error)) 
    }



    const handleSignOut = () =>{

      signOut(auth).then(() => {
        dispatch(Remove_User())
        navigate('/')
      }).catch((error) => {
        console.log(error)
      })
    }
    
  return (
    <div className="header">
      <Link to="/">
        <img
        className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt='amazon'
        />
      </Link>
      <div className='d-flex align-items-end header__address' data-bs-toggle="modal" data-bs-target="#exampleModal" >
            <ThemeProvider theme={theme} >
                <PushPinIcon className='  mr-3' color='primary' />
            </ThemeProvider>
        <span className="text-white d-flex flex-column align-items-sm-start ">
            <span className="text-secondary p-0 m-0">{pincode.city ? 'Deliver to' : 'hello'}</span>
            <p className="p-0 m-0">{pincode.city ? `${pincode.city} ${pincode.currentpincode}` : 'Select your address'}</p>
        </span>
      </div>

      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" size={40 }/>
      </div>

      <div className="header__nav">
        {auth.currentUser === null ? <div className="header__option" onClick={() => navigate('/login', {state: currentLocation }) }>
            <span className="header__optionLineOne">Hello </span>
            <span className="header__optionLineTwo">Sign In</span>
          </div> : <div className="header__option" onClick={handleSignOut}>
            <span className="header__optionLineOne"> {auth.currentUser.email}</span>
            <span className="header__optionLineTwo">Sign Out</span>
          </div>}
        

        <Link to='/Orders' style={{textDecoration: 'none'}}>
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>
        

        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>

        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingCartIcon />
            <span className="header__optionLineTwo header__basketCount">
              {basketItemsLength}
            </span>
          </div>
        </Link>
      </div> 
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title " id="staticBackdropLabel">
                <PushPinIcon />
                  <span className="ms-3">Choose your location</span></h5>
              </div>
              <div className="modal-body">
                <div>
                  <input type="text" className='form-control mb-2' placeholder="Enter your pincode here...." value={pincode.pincode} onInput={handleChangePin} />
                  <button className="btn btn-light" data-bs-dismiss="modal" onClick={handlePin}>Apply</button>
                </div>
                {pinmessage && <p style={{color: 'red'}}><InfoIcon color='error' /> Please enter a valid pincode</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
      ) 
}

export default Header;

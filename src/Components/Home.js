import React,{useState,useMemo} from "react";
import Product from "./Product";
import "../Styles/Home.css";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import setData from '../Assests/SliderData'
import ProductItems from '../Assests/productData'


function Home() {

  const [slider, setSlider] = useState(0);
  const [sliderImage , setSliderImage] = useState("")
  const [productList, setProductList] = useState([])


  // fetch all product from api

  useMemo(() =>{
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=> setProductList(json))
  },[])


  // banner slider function include scroll left and scroll Right

  const banner = useMemo(() =>{
         let banners = setData();
         setSliderImage(banners[0])
         return banners;
    },[])

  function scrollLeft (){
    slider <= 0  ? setSlider(banner.length - 1) : setSlider((prev) => prev - 1);
    setSliderImage(banner[slider]);

  }

  function scrollRight(){
    slider >= banner.length -1 ? setSlider(0) : setSlider((prev) => prev + 1);
    setSliderImage(banner[slider]);
  }


  return (
    <div className="home">
      <div className="home__container">
        <div styled={{background: 'red'}}>
  
        <ChevronLeftIcon className="slider_left_button" fontSize='large' onClick={scrollLeft}/>
          <img
            className="home__image"
            src={sliderImage}
            alt=""
          />
          <ChevronRightIcon className="slider_right_button" fontSize='large' onClick={scrollRight}/>
        </div>
      
        <div className="home__row">

            {
              ProductItems.map((items,index)=>{
                return <Product key={index} items ={items}/>
              })
            } 
          
        </div>
        <div className="home__row2">

            {
              productList.map((items,index)=>{
                return <Product key={index} items ={items}/>
              })
            } 
          
        </div>
 
      </div>
    </div>
  );
}

export default Home;

import React,{useState,useEffect} from 'react'
import classes from './Category.module.css'
import VideosGrid from '../Components/VideosGrid'
import {useParams,useNavigate} from 'react-router-dom'
import Navbar from '../Components/Navbar'
import { fetchDataFromBackend } from '../Services/api'
import {useSelector} from 'react-redux'
import {arabic_arr} from '../Data'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Loader from '../Components/Loader'


const Category = () => {

    const params = useParams();
    const navigate = useNavigate();
    const [loading,setLoading] = useState(true);

    const {lang} = useSelector((state)=>state.langSlice)

    const [games,setGames] = useState([]);
    const [category,setCategory] = useState([]);
   
    const fetchData = async()=>{
        const response = await fetchDataFromBackend();
        const arr = response.games;
        const arr2 = response?.category?.find((item)=>item.sr_no == params.id )
        // console.log(arr2.cat_name,'-----')
        setLoading(false);
        setGames(arr?.filter((item)=>item.cat_id == params.id))
        setCategory(arr2?.cat_name)
    }

    useEffect(() => {
      fetchData()
      console.log(category)
    //   console.log(games?.filter((filtered_item)=>filtered_item.category == "kids"))

    }, [params])


    // console.log(lang)

    const changeLang=(key)=>{
      // key = key?.split(/\r?\n/).join("")
    //  console.log(key)
      if(lang == 0){
        return key;
      }
      if(lang == 1){
        console.log(`(${key})`,lang)
       const data = arabic_arr.findIndex((item)=>item.key == key);
       console.log(data,'=============================')
       if(data>=0){
        
        return arabic_arr[data].value;
       }

       return key;
      }
    }
  
    // console.log(category[0]?.cat_name)


    if(loading){
      return(
        <>
        <Loader/>
        </>
        
      )
    }
  



  return (
    <div className={classes.container}>
    <div className={classes.top}>
    <div className={classes.logo} onClick={()=>navigate(-1)}>
    {/* <img src="/assets/back.png" alt="" className={classes.img}/> */}
    <KeyboardBackspaceIcon sx={{color:'white',fontSize:"3rem",cursor:'pointer'}}/>
    </div>

    <div className={classes.category_name}>
    
    {changeLang(category)} <span style={{color:"white"}}>{lang == 0 ? 'Games':'ألعاب'}</span>
    </div>


    <div className={classes.back_logo} onClick={()=>navigate(-1)}>
    <img src="/assets/back_logo.png" alt="" className={classes.back_logo_img} />
    </div>


    </div>
    <hr />
    <VideosGrid arr={games} />
    </div>
  )
}

export default Category

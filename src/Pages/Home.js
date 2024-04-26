import React,{useState,useEffect} from 'react'
import classes from './Home.module.css'
import Navbar from '../Components/Navbar'
import VideosGrid from '../Components/VideosGrid'
import { fetchDataFromBackend } from '../Services/api'
import Intro from '../Components/Intro'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {arabic_arr} from '../Data'
import Loader from '../Components/Loader'


const Home = () => {

    const [games,setGames] = useState([]);
    const [category,setCategory] = useState([]);
    const [loading,setLoading] = useState(true);
    const {lang} = useSelector((state)=>state.langSlice)
    const navigate = useNavigate();
    console.log(loading)

    const fetchData = async()=>{
        const response = await fetchDataFromBackend();
      
          setLoading(false);
       
        setGames(response.games)
        setCategory(response.category)
    }

    useEffect(() => {
      fetchData()
      console.log(games?.filter((filtered_item)=>filtered_item.category == "kids"))

    }, [])


    const changeLang=(key)=>{
        // console.log(`(${key})`,lang)
        key = key.split(/\r?\n/).join("")
        // console.log('==================',`(${ar}---)`);
        if(lang == 0){
          return key.slice(0,15);
        }
        if(lang == 1){
          // console.log("====",lang,key)
         const data = arabic_arr.findIndex((item)=>item.key == key);
         console.log(data)
         if(data>=0){
          return arabic_arr[data].value.slice(0,15);
         }
         return key.slice(0,13);
        }
      }


    if(loading){
        return(
          <>
       
          <Loader/>
          </>
          
        )
      }
    



  return (
    <div className={classes.container}>
    <Navbar/>
    <Intro/>
    <div className={classes.categories}>
    {
        category?.map((item,idx)=>(
        <div className={classes.item}>
        <div className={classes.title}>
        <div className={classes.small_line}></div>
        <div className={classes.text}>
        {changeLang(item.cat_name)} <span style={{color:"white"}}>{lang == 0 ? 'Games':'ألعاب'}</span>
        </div>
        <div className={classes.large_line}></div>
        </div>
        <VideosGrid arr={games?.filter((filtered_item)=>filtered_item.cat_id == item.sr_no).slice(0,5)}/>
        <div className={classes.btn_div}>
        <button className={`${lang == 0 ? classes.Btn:classes.btn}`} onClick={()=>navigate(`/category/${item.sr_no}`)}></button>
        </div>
        </div>
        ))
    }
        
    </div>
   
    
    </div>
  )
}

export default Home

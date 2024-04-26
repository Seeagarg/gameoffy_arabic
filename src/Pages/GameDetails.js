import React,{useState,useEffect} from 'react'
import {useParams,Link,useNavigate} from 'react-router-dom'
import classes from './GameDetails.module.css'
import { fetchDataFromBackend } from '../Services/api';
import {useSelector} from 'react-redux'

const GameDetails = () => {

    const params = useParams();
    const [url,setUrl] = useState();
    const {lang} = useSelector((state)=>state.langSlice)
    // console.log(params.id)
    const fetchData = async()=>{
        const response = await fetchDataFromBackend();
        const arr = response.games.filter((item)=>item.gameid == params.id);
        console.log(arr)
        setUrl(arr[0].gameurl)
    }

    useEffect(() => {
      fetchData()
    //   console.log(games?.filter((filtered_item)=>filtered_item.category == "kids"))
    console.log(url)
    }, [])


  return (
    <div className={classes.main}>
    <div className={classes.container}>
    <Link to="/" className={classes.close}>  
    <button className={classes.button}>
    {lang == 0 ?'close':'يغلق'}
    </button>
    </Link>
        <iframe src={url} frameborder="0" className={`${classes.frame}`}></iframe>
    
    </div>
    
    </div>
  )
}

export default GameDetails

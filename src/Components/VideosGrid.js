import React from 'react'
import classes from './VideosGrid.module.css'
import {useSelector} from 'react-redux'
import {arabic_arr} from '../Data'
import {useNavigate} from 'react-router-dom'

const VideosGrid = ({arr}) => {

  const {lang} = useSelector((state)=>state.langSlice)
  const navigate = useNavigate();


  const changeLang=(key)=>{
    key = key.split(/\r?\n/).join("")
   
    if(lang == 0){
      return key;
    }
    if(lang == 1){
      console.log(`(${key})`,lang)
     const data = arabic_arr.findIndex((item)=>item.key == key);
     console.log(data)
     if(data>=0){
      return arabic_arr[data].value;
     }
     return key;
    }
  }




  return (
    <div className={classes.main}>

    
    <div className={classes.games}>
    {
        arr?.map((item,idx)=>(
            <div class={classes.card} onClick={()=>{navigate(`/game/${item.gameid}`)}}>
    <div class={classes.content}>
      <div class={classes.back}>
        <div class={classes.back_content}>
          <img src={item.imgurl} alt="" className={classes.img} />
          <strong>{changeLang(item.gamename)}</strong>
        </div>
      </div>
      <div class={classes.front}>
        <div class={classes.img}>
        <img src={item.imgurl} alt="" />
        </div>
  
        <div class={classes.front_content}>
          <small className={classes.badge}>{lang==0?'Play':'يلعب'}</small>
          <div class={classes.description}>
            <div class={classes.title}>
              {/* <p class={classes.title}> */}
                <strong>{changeLang(item.gamename)}</strong>
              {/* </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
        ))
    }
    
      
    </div>
    </div>
  )
}

export default VideosGrid

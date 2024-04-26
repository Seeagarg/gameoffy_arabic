import React from 'react'
import classes from './Intro.module.css'
import Lottie from 'lottie-react'
import animationData from '../Animation/bg.json'
import {useSelector} from 'react-redux'

const Intro = () => {

    // const lang = 0;
    const {lang} = useSelector((state)=>state.langSlice)


    const defaultOptionss = {
        loop: true,
        autoplay: true,
        animationData: animationData.default,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
      

  return (
    <div>
      <div className={classes.container}>
        <img className={classes.bg_img}
          src="/assets/bg1.avif"
          alt="background"/>
      
       

        <div className={classes.front}>
       
        <div className={classes.title_div}>
        <h1 className={classes.title} >GAMEOFFY</h1>
        <h1 className={classes.title_desc} style={{ fontfamily: "Aclonica", fontWeight: 'semibold' }}>{lang==0 ? 'Video Games Online' : 'العاب فيديو اون لاين'}</h1>
        </div>
       <div className={classes.front_img}>
       <img src="/assets/intro.png"  />
       </div>
       <Lottie
        animationData={animationData}
        //  options={defaultOptionss}
          height={400} width={480}
          className={classes.animation}
           />
         
        </div>
      </div>
      
    </div>
  )
}

export default Intro

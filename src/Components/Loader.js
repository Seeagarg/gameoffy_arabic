import React from 'react'
import Lottie from 'lottie-react'
import loader from '../Animation/loading.json'


const Loader = () => {
  return (
    <div style={{height:"100dvh",width:"100%"}}>
        <Lottie
            animationData={loader}
            style={{height:"100%",width:"100%"}}
        />
    </div>
  )
}

export default Loader

import axios from 'axios'
import {toast} from 'react-toastify'

export const fetchDataFromBackend=async()=>{
    try{
        const response = await axios.get('https://api.panzcon.com/fetch-games');
        return response.data;
    }
    catch(err){
        console.log('error while fetching',err)
        toast.danger(err.message)
    }
   
}
import React,{useState,useEffect} from 'react'
import classes from './Navbar.module.css'
import {Link,useParams} from 'react-router-dom'
import { fetchDataFromBackend } from '../Services/api';
import {useSelector,useDispatch} from 'react-redux'
import {arabic_arr} from '../Data';
import { changeLanguage } from '../Slices/langSlice';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';


const Navbar = () => {

  const params = useParams();

    const [category,setCategory] = useState([]);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    // console.log(open)

    const fetchData=async()=>{
        const response = await fetchDataFromBackend();
        setCategory(response.category)
    }

    console.log(category,'=================')

    useEffect(() => {
      fetchData()
    }, [])

    const {lang} = useSelector((state)=>state.langSlice)


  const changeLang=(key)=>{
    key = key.split(/\r?\n/).join("")
    if(lang == 0){
      return key;
    }
    if(lang == 1){
    
     const data = arabic_arr.findIndex((item)=>item.key == key);
   
     if(data>=0){
      return arabic_arr[data].value;
     }
     return key;
    }
  }



  const toggleDrawer = () => {
    setOpen(!open);
  };


  const DrawerList =(
    <Box className={classes.SideBar} role="presentation" >
    <div className={classes.list}>
    
    {
      category?.map((item,idx)=>(
        <>
        
        <Link to={`/category/${item.sr_no}`} className={`${classes.list_item}`}>
        {changeLang(item.cat_name)}
        </Link>
        
        </>
      ))
    }

    </div>
    </Box>
  );
    


  return (
    <div className={classes.container}>
    <div className={classes.logo}>
    <img src="/assets/back_logo.png" alt="" className={classes.img}/>
    <span className={classes.title}>Gameoffy</span>
    </div>
    <div className={classes.categories}>
    {
        category?.map((item,idx)=>(
        <div className={classes.item}>
        <Link to={`/category/${item.sr_no}`} className={classes.link}>
        {changeLang(item.cat_name)}
        </Link>
        </div>
        ))
    }

    <div className={classes.menu}  >
          
          <label class={classes.menuButton} for="check" >
    <input type="checkbox" id="check" onClick={toggleDrawer}/>
    <span class={classes.top}></span>
    <span class={classes.mid}></span>
    <span class={classes.bot}></span>
</label>
           <Drawer open={open} onClose={toggleDrawer} >
        {DrawerList}
      </Drawer>
        </div>




    <button class={classes.btn} onClick={()=>{lang == 0 ? dispatch(changeLanguage(1)): dispatch(changeLanguage(0))}}>
    <span class={classes.btn_text_one}>{lang==0?'Eng':'Ara'}</span>
    <span class={classes.btn_text_two}>{lang==0?'Ara':'Eng'}</span>
</button>
        
    </div>
    </div>
  )
}

export default Navbar

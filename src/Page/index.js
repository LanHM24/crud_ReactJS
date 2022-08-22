import React,{useState,useEffect} from 'react'
import { createApi } from '../API'
import './App.css'
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faWrench,faUserXmark,faSearch} from '@fortawesome/free-solid-svg-icons' 
export default function Users(){
    const styles={
        input:{
        }
    }
    const[listUser,setListUser] = useState([])
    const[user,setUser] = useState({})
    const [nameUser,setNameUser] = useState("") 



    const getListUser = () => {
        createApi("/Users").fetchall().then(res=>{
            console.log(res)
            setListUser(res.data)
        }).catch(err=>console.log(err))
    }

    useEffect(()=> {
        getListUser()
    },[])

    const onChangeHandle = (event)=>{
        setUser({
            ...user,
            [event.target.name]:event.target.value
        })
        console.log(user)
    }
    const addNewUser = ()=>{
        createApi("/Users").addNew(user).then(res=>{
            getListUser()
        })
    }
    const getInfoUser = (id,name)=>{
        setUser({
            ...user,
            "Id":id,
            "Name":name
        })
    }
    const updateUser = ()=>{
        createApi("/Users").updateUser(user).then(res=>{
            getListUser()
        })
    }
    const deleteUser =()=>{
        createApi("/Users/").deleteUser(user.Id).then(res=>{
            getListUser()
        })
    }
    const search = (event)=>{
        setNameUser(event.target.value)
        
    }
    const onClickSearch = ()=>{
        createApi("/Users/").search(nameUser).then(res=>{
            console.log(res)
            setListUser(res.data)
            if(res.data.length===0){
                alert("Khong thay")
            }
        })
    }
    return (
    <div className="App">
        <div className="CURD">
                <lable className="LB_Name">Name</lable>
                <input className='inputCRUD' name="Name" value={user.Name} onChange={onChangeHandle}/>
                <button className='btnAdd' onClick={addNewUser}><FontAwesomeIcon icon={faPlus} /> </button>
                <button className='btnUpdate' onClick={updateUser}><FontAwesomeIcon icon={faWrench} /> </button>
                <button className='btnDel'  onClick={deleteUser}><FontAwesomeIcon icon={faUserXmark} /></button>
        </div>

        <div className='Search'>
            <lable className="LB_search">Name</lable>
            <input className='inputCRUD'  style={styles.input} value={nameUser} name="Search" onChange={search}/>
            <button className='btnSearch'  onClick={onClickSearch}><FontAwesomeIcon icon={faSearch} /></button>
        </div>

        <div className='table'>
            <table>
                        <tr>
                            <th className='id'>Id</th>
                            <th className='name'>Name</th>
                        </tr>
           {
            listUser.map((item)=>{
                return(
                        <tr onClick={()=>{getInfoUser(item.Id,item.Name)}}>
                            <th>{item.Id}</th>
                            <th>{item.Name}</th>
                        </tr>
                        
                    
                )
            })
           }
            </table>
        </div>
        </div>)
}

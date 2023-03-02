import TopBar from "../topBar/topbar"
import "./landingPage.css"
import {data} from "../../data"
import LandingPageListItem from "../landingPageListItem/landingPageList"
import { useState } from "react";
import {Delete} from "@mui/icons-material"
import { useEffect } from "react";
import axios from "axios";
const LandingPage=()=>{
    const [arr,setArr]=useState(Array(data.length).fill(false));
    const [selected,setSelected]=useState({isValid:false,data:{}});
    const [userInfo,setUserInfo]=useState({});
    const [proposals,setProposals]=useState([]);
    const userSelectionDeleteHandler=()=>{
        // selected={isValid:false,data:{}};45y
        console.log(userInfo._id);
        axios.put(`http://localhost:8000/users/${userInfo._id}`,{select:""})
        .then((response)=>{setSelected({isValid:false,data:{}})})
        .catch((e)=>{console.log("error in deleting")})
    }
    const retriveUserInfo=()=>{
        axios.get("http://localhost:8000/users/info",{withCredentials:true})
        .then((response)=>{
            console.log(response.data.result);
            setUserInfo(response.data.result);
            if(response.data.result.select)
            {
                axios.get(`http://localhost:8000/events/${response.data.result.select}`,{withCredentials:true})
                .then((response)=>{setSelected({isValid:true,data:response.data.result})})
                .catch((e)=>{console.log(e)});
                }
            else{
                setSelected({isValid:false,data:{}})
            }
        }).catch((e)=>{console.log(e)});
    }
    // const retriveUserSelection=()=>{
    //     if(userInfo.select==="")
    //     {
    //           console.log("no selection");
    //     }
    //     else{
    //         axios.get(`http://localhost:8000/events/${userInfo.select}`,{withCredentials:true})
    //         .then((response)=>{setSelected({isValid:true,data:response.data.result})})
    //         .catch((e)=>{console.log(e)});
    //     }
    // }
    const retriveProposals=()=>{
        axios.get("http://localhost:8000/events/all",{withCredentials:true})
        .then((response)=>{
            console.log(response.data);
            setProposals(response.data.result);
        }).catch((e)=>{console.log(e)});
    }
    useEffect(()=>{
       
      
        // retriveUserSelection();
        retriveUserInfo();
        retriveProposals();
        
    },[])
    
    return(
        <>
        <article className="landingPageContainer">
            <TopBar user={userInfo.userName}/>
            <section className="landingPageImageSection">

            </section>
            {
                selected.isValid?<h4 className="landingPageSelectedFieldHeading">Selected</h4>:null
            }
            {

               selected.isValid? <article className="landingSelectedEvent" >
               <img src={selected.data.eventImage} alt="pic"/>
               <ul>
                 <li>{selected.data.vendorName}</li>
                 <li>{selected.data.budget}/-</li>
                 <li>{selected.data.place}</li>
               </ul>
               <Delete className="landingSelectedEventDeleteIcon" onClick={userSelectionDeleteHandler}/>
                </article>:null
            }
            <section className={selected.isValid?"landingPageProposalsContainerafterSelection":"landingPageProposalsContainer"}>
                  <h4>Proposals</h4>
                  <section>
                    {
                        proposals.map((value,index)=>{
                            return <LandingPageListItem key={index} listItemData={value} urr={arr} setUrr={setArr} number={index} select={selected} setSelect={setSelected} user={userInfo._id} />
                        })
                    }
                  </section>
            </section>

        </article>
        </>
    )
}
export default LandingPage;
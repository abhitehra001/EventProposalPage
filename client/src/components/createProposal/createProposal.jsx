import {Clear} from "@mui/icons-material";
import "./createProposal.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderDashboard from "../vendorheaderDashBoard/HeaderDashboard";
import Swal from "sweetalert2";

const CreateProposal=()=>{
    const navigate = useNavigate();
    const [allData,setAllData]=useState({
        name:"",
        place:"",
        proposalType:"",
        eventType:"",
        budget:null,
        from:"",
        to:"",
        description:"",
        eventImage:"",
        venueImage:[],
        foodPreferences:"",
        events:""
    })
    const [eventImage,setEventImage]=useState("");
    const [eveImg, setEveImg] = useState("");
    const [venImg, setVenImg] = useState([]);
    const [venueImage,setVenueImage]=useState([]);
    const valueHandler=(e)=>{
        setAllData({...allData,[e.target.name]:e.target.value})
    }
   
    const uploadEventImage=()=>{
        if(eventImage){
             uploadImages(eventImage)
            .then((res)=>{ setAllData({...allData, eventImage:res})
            
           });
        }
    }
    const uploadImages = async(val) => {
        const data=new FormData();
        data.append("file",val);
        data.append("upload_preset","abhi001");
        return axios.post("https://api.cloudinary.com/v1_1/dq600wlce/image/upload",data).then(res=>{
            return res.data.url
        })
    }
    const uploadSetVenueImage=async()=>{
        if(venueImage.length>0){
            let urlArr = venueImage.map(val=>{
                return uploadImages(val);
            })
            let result = await Promise.all(urlArr).then(res=>{
                setAllData({...allData, venueImage:res});
            })
        }
    }
    const clickHandler=async (e)=>{
        e.preventDefault();
        axios.post("https://eventproposalserver.onrender.com/events/add", allData, { withCredentials:true }).then(data=>{
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Proposal created successfully',
                timer: 1000,
                timerProgressBar: true,
                showConfirmButton: false,
              }).then((willNavigate)=>{
                if(willNavigate){
                   navigate("/view")
                }
              })
        }).catch(err=>{
            
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'All fields are mandatory',
                
                showConfirmButton: true,
                confirmButtonText:"ok"
                
              })
        })
    }

    return(
        <>
        <HeaderDashboard />
        <form className="proposalPostingForm">
            <header>
                <h3>Create Proposal</h3>
                <Clear className="proposalPostingFormbackSymbol" onClick={()=>{
                    navigate("/view")
                }} />
            </header>
            <section>
                <section className="proposalPostingFormBodyLeftPart">
                    <section>
                        <label htmlFor="eventLocation">Event Name</label>
                        <input type="text" placeholder="Name" name="name" id="eventName" onChange={valueHandler} value={allData.name}/>
                    </section>
                    <section>
                      <section>
                        <label htmlFor="eventLocation">Event Location</label>
                        <select id="eventLocation" name="place" onChange={valueHandler} value={allData.place}>
                              <option>select</option>
                              <option value="Bangolore">Bangolore</option>
                              <option value="mumbai">Mumbai</option>
                              <option value="Hyderabad">Hyderabad</option>
                              <option value="Chennai">chennai</option>
                              <option value="Visakhapatnam">Visakhapatnam</option>
                        </select>
                      </section>
                      <section>
                        <label htmlFor="eventProposal">Proposal Type</label>
                        <select id="eventProposal" name="proposalType" onChange={valueHandler} value={allData.proposalType}>
                              <option>select</option>
                              <option value="Venue">Venue</option>
                        </select>
                      </section>
                    </section>
                    <section>
                      <section>
                        <label htmlFor="eventType">Event Type</label>
                        <select id="eventType" name="eventType" onChange={valueHandler} value={allData.eventType}>
                              <option>select</option>
                              <option value="Wedding">Wedding</option>
                              <option value="Concert">Concert</option>
                              <option value="Proposal">Proposal</option>
                              <option value="College">College</option>
                              <option value="Birthday">Birthday</option>
                        </select>
                      </section>
                      <section>
                        <label htmlFor="eventBudget">Budget</label>
                        <input type="text" placeholder="In rupees" id="eventBudget" name="budget" onChange={valueHandler} value={allData.eventBudget}/>
                      </section>
                    </section>
                    <section>
                     <section>
                        <label htmlFor="fromData">From</label>
                        <input type="date" id="fromDate" name="from" onChange={valueHandler} value={allData.from}/>
                     </section>
                     <section>
                        <label htmlFor="toData">To</label>
                        <input type="date" id="toDate" name="to" onChange={valueHandler} value={allData.to}/>
                     </section>
                    </section>
                    <section>
                        <label htmlFor="formDescription">Description</label>
                        <textarea id="formDescription" name="description" onChange={valueHandler} value={allData.description} style={{resize: "none"}}></textarea>
                       
                     </section>
                </section>
                <section className="proposalPostingFormBodyRightPart">
                    <section>
                        <label>Event Image</label>
                        <input id="eventImage" type="file" accept="image/*" name="eventImage"
                        onChange={(e)=>{setEventImage(e.target.files[0]);setEveImg(URL.createObjectURL(e.target.files[0]))
                            }} onBlur={uploadEventImage}  />
                    </section>
                    <section className="Images">
                        <img id="renderEventImage" src={eveImg?eveImg:"/images/render.jpg"} alt="eventImage" />
                    </section>
                    <section>
                        <label>Venue Images</label>
                        <input type="file" accept="image/*" multiple name="venueImage" max="5" onChange={(e)=>{setVenueImage([...e.target.files]);
                        setVenImg([...e.target.files]);
                        }} onBlur={uploadSetVenueImage} />
                    </section>
                    <section className="Images">
                        <img id="renderVenueImage0" className="renderImages" src={
                            venImg[0]?URL.createObjectURL(venImg[0]):"/images/render.jpg"
                        } alt="venueImage" />
                        <img id="renderEventImage1" className="renderImages" src={
                            venImg[1]?URL.createObjectURL(venImg[1]):"/images/render.jpg"
                        } alt="venueImage" />
                        <img id="renderEventImage2" className="renderImages" src={
                            venImg[2]?URL.createObjectURL(venImg[2]):"/images/render.jpg"
                        } alt="venueImage" />
                        <img id="renderEventImage3" className="renderImages" src={
                            venImg[3]?URL.createObjectURL(venImg[3]):"/images/render.jpg"
                        } alt="venueImage" />
                        <img id="renderEventImage4" className="renderImages" src={
                            venImg[4]?URL.createObjectURL(venImg[4]):"/images/render.jpg"
                        } alt="venueImage" />
                    </section>
                    <section>
                        <label>Food Preferences</label>
                        <textarea name="foodPreferences" onChange={valueHandler} value={allData.foodPreferences} style={{resize: "none"}}></textarea>
                        
                    </section>
                    <section>
                        <label>Events</label>
                        <textarea name="events" onChange={valueHandler} value={allData.events} style={{resize: "none"}}></textarea>
                        
                    </section>
                </section>
            </section>
            <section className="proposalPostingFormFooter">
                <button onClick={clickHandler}>Add</button>
            </section>
        </form>
        </>
    )
}
export default CreateProposal;

import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/Toast/ToastContext";
import { Context } from "../main.jsx"
const AppointmentForm = () => {
    const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated } = useContext(Context)
    const toast = useToast();
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [aadhaarNumber, setAadhaarNumber] = useState("")
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");

    const [department, setDepartment] = useState("");
    const [doctoreFirstName, setDoctoreFirstName] = useState("");
    const [doctoreLastName, setDoctoreLastName] = useState("");
    const [address, setAddress] = useState("");
    const [hasVisited, setHasVisited] = useState(false);
    const [appointmentDate, setAppointmentDate] = useState("")


    const departmentArray = [
        "Pediatrics", "Orthopedics", "Cardiology", "Neurology", "Oncology", "Radiology", "ENT"
    ];

    const [doctores, setDoctores] = useState([]);
    useEffect(() => {
        const fetchDoctores = async () => {
            try {
                const { data } = await axios.get("http://localhost:4800/api/v1/user/doctors",
                    { withCredentials: true }
                );
                setDoctores(data.doctore);// get all doctore data like avarat url
            } catch (err) {
                console.error("Error fetching doctors:", err);
            }
        }
        fetchDoctores();
    }, []) //When page is refreshed, this function is executed 


    // handle form submission
    const handelAppoinment = async (e) => {
        e.preventDefault();
        try {
            if (!firstName || !lastName || !email || !phone || !aadhaarNumber || !dob || !gender || !department || !doctoreFirstName || !doctoreLastName || !appointmentDate || !address) {
                toast.error("Please fill all fields!");
                return;
            }
            const response = await axios.post("http://localhost:4800/api/v1/appointment/post", {
                firstName, lastName, email, phone, aadhaarNumber,
                dob, gender, hasVisited, address,
                 doctor_firstName:doctoreFirstName,
                  doctor_lastName:doctoreLastName,
                   department, appointment_date: appointmentDate
            }, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" }
            });
            toast.success(response.data?.message);
            navigate("/")

        } catch (error) {
            toast.error(error.response?.data?.message || "Error booking appointment");
        }
    }

    const sendLoginToast=()=>{
      return  toast.error("Login First Than Get Appoinmet")
    }

    return (
        <>
            <div className="container form-component appointment-form">
                <h2>Welcome to ZeeCare Portal</h2>
                <p>Appointment</p>
                <p>If you not Logged | Plese Login </p>
                <form onSubmit={handelAppoinment}>
                    <div>
                        <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div>
                        <input type="number" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        <input type="number" placeholder="Addaar-Number" value={aadhaarNumber} onChange={(e) => setAadhaarNumber(e.target.value)} />
                    </div>
                    <div>
                        <select value={gender} onChange={(e) => setGender(e.target.value)} >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Others</option>
                        </select>

                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <input type="date" placeholder="Date fo Birth" value={dob} onChange={(e) => setDob(e.target.value)} />
                        <input type="date" placeholder="Enter Appoinment Date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} />

                    </div>
                    <div>
                        <select value={department} onChange={(e) => {
                            setDepartment(e.target.value);
                            setDoctoreFirstName("");
                            setDoctoreLastName("");
                        }}>
                            <option value="">Select Department</option>
                            {
                                departmentArray.map((depart, index) => {
                                    return (
                                        <option value={depart} key={index}>{depart}</option>
                                    )
                                })
                            }

                        </select>
                        <select value={`${doctoreFirstName} ${doctoreLastName}`}
                            onChange={(e) => {
                                const [firstName, lastName] = e.target.value.split(" ");
                                setDoctoreFirstName(firstName);
                                setDoctoreLastName(lastName);

                            }}
                            disabled={!department}
                        >
                            <option value="">
                                Select Doctore
                            </option>
                            {
                                doctores.filter(doc => doc.doctorDepartment === department).map((doctore, index) => {
                                    return (
                                        <option value={`${doctore.firstName} ${doctore.lastName}`} key={index}>
                                            {doctore.firstName} {doctore.lastName}
                                        </option>
                                    )
                                })
                            }
                        </select>


                    </div>
                    <div>
                        <textarea rows="1" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter your Full Address" />
                    </div>
                    <div>
                        <p style={{ marginBottom: 0 }}>Have you visited before ? <input type="checkbox" checked={hasVisited} onChange={(e) => setHasVisited(e.target.checked)} style={{flex:"none", width:"50px" , hight:"25px"}} /></p>

                    </div>
                    <div style={{justifyContent:"center" , alignItems:"center"}}>
                       { 
                          isAuthenticated ? <button type="submit">GET Appoinment</button> : <button type="button" style={{color:"black" , backgroundColor:"gray"}} onClick={() => sendLoginToast()} > Login First </button>  
                       }

                    </div>





                </form>

            </div>
        </>
    )
}
export default AppointmentForm;
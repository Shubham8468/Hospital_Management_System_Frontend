import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/Toast/ToastContext";
import { Context } from "../main.jsx"
import { getApiUrl, API_ENDPOINTS } from "../config/apiConfig";

const AppointmentForm = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(Context)
    const toast = useToast();
    
    // Personal Information
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [aadhaarNumber, setAadhaarNumber] = useState("")
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    
    // Appointment Information
    const [department, setDepartment] = useState("");
    const [doctorFirstName, setDoctorFirstName] = useState("");
    const [doctorLastName, setDoctorLastName] = useState("");
    const [address, setAddress] = useState("");
    const [hasVisited, setHasVisited] = useState(false);
    const [appointmentDate, setAppointmentDate] = useState("")
    
    // Loading and validation states
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const departmentArray = [
        "Pediatrics", "Orthopedics", "Cardiology", "Neurology", "Oncology", "Radiology", "ENT", "Dermatology", "Physical Therapy"
    ];

    const [doctors, setDoctors] = useState([]);
    const [doctorLoading, setDoctorLoading] = useState(true);
    
    useEffect(() => {
        const fetchDoctors = async () => {
            setDoctorLoading(true);
            try {
                const { data } = await axios.get(getApiUrl(API_ENDPOINTS.GET_DOCTORS),
                    { withCredentials: true }
                );
                setDoctors(data.doctore || []);
            } catch (err) {
                console.error("Error fetching doctors:", err);
                toast.error("Failed to load doctors");
            } finally {
                setDoctorLoading(false);
            }
        }
        fetchDoctors();
    }, [])

    // Validation function
    const validateForm = () => {
        const newErrors = {};
        
        if (!firstName.trim()) newErrors.firstName = "First name is required";
        if (!lastName.trim()) newErrors.lastName = "Last name is required";
        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Valid email is required";
        if (!phone || phone.length < 10) newErrors.phone = "Valid phone number is required";
        if (!aadhaarNumber || aadhaarNumber.length !== 12) newErrors.aadhaarNumber = "Aadhaar must be 12 digits";
        if (!dob) newErrors.dob = "Date of birth is required";
        if (!gender) newErrors.gender = "Gender is required";
        if (!department) newErrors.department = "Department is required";
        if (!doctorFirstName) newErrors.doctor = "Doctor selection is required";
        if (!appointmentDate) newErrors.appointmentDate = "Appointment date is required";
        if (!address.trim()) newErrors.address = "Address is required";
        
        return newErrors;
    };

    // Handle form submission
    const handleAppointment = async (e) => {
        e.preventDefault();
        
        if (!isAuthenticated) {
            toast.error("Please login first to book an appointment");
            return;
        }
        
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            toast.error("Please fill all required fields correctly");
            return;
        }
        
        setLoading(true);
        try {
            const response = await axios.post(getApiUrl(API_ENDPOINTS.POST_APPOINTMENT), {
                firstName, lastName, email, phone, aadhaarNumber,
                dob, gender, hasVisited, address,
                doctor_firstName: doctorFirstName,
                doctor_lastName: doctorLastName,
                department, appointment_date: appointmentDate
            }, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" }
            });
            
            toast.success(response.data?.message || "Appointment booked successfully!");
            
            // Reset form
            setFirstName("");
            setLastName("");
            setEmail("");
            setPhone("");
            setAadhaarNumber("");
            setDob("");
            setGender("");
            setDepartment("");
            setDoctorFirstName("");
            setDoctorLastName("");
            setAddress("");
            setHasVisited(false);
            setAppointmentDate("");
            setErrors({});
            
            setTimeout(() => navigate("/"), 1500);
        } catch (error) {
            toast.error(error.response?.data?.message || "Error booking appointment");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="container form-component appointment-form">
                <div className="form-header">
                    <h2>Book Your Appointment</h2>
                    <p className="form-subtitle">Expert Healthcare at Your Service</p>
                </div>
                
                {!isAuthenticated && (
                    <div className="auth-alert">
                        <p>⚠️ Please log in to book an appointment</p>
                    </div>
                )}
                
                <form onSubmit={handleAppointment} className="appointment-form-grid">
                    {/* Section: Personal Information */}
                    <fieldset className="form-section">
                        <legend>Personal Information</legend>
                        
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="firstName">First Name *</label>
                                <input 
                                    id="firstName"
                                    type="text" 
                                    placeholder="Enter your first name" 
                                    value={firstName} 
                                    onChange={(e) => {
                                        setFirstName(e.target.value);
                                        if (errors.firstName) setErrors({...errors, firstName: ""});
                                    }} 
                                    className={errors.firstName ? "input-error" : ""}
                                />
                                {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name *</label>
                                <input 
                                    id="lastName"
                                    type="text" 
                                    placeholder="Enter your last name" 
                                    value={lastName} 
                                    onChange={(e) => {
                                        setLastName(e.target.value);
                                        if (errors.lastName) setErrors({...errors, lastName: ""});
                                    }}
                                    className={errors.lastName ? "input-error" : ""}
                                />
                                {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                            </div>
                        </div>
                        
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="email">Email *</label>
                                <input 
                                    id="email"
                                    type="email" 
                                    placeholder="Enter your email" 
                                    value={email} 
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (errors.email) setErrors({...errors, email: ""});
                                    }}
                                    className={errors.email ? "input-error" : ""}
                                />
                                {errors.email && <span className="error-text">{errors.email}</span>}
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="phone">Phone Number *</label>
                                <input 
                                    id="phone"
                                    type="tel" 
                                    placeholder="Enter your phone number" 
                                    value={phone} 
                                    onChange={(e) => {
                                        setPhone(e.target.value);
                                        if (errors.phone) setErrors({...errors, phone: ""});
                                    }}
                                    className={errors.phone ? "input-error" : ""}
                                />
                                {errors.phone && <span className="error-text">{errors.phone}</span>}
                            </div>
                        </div>
                        
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="aadhaar">Aadhaar Number *</label>
                                <input 
                                    id="aadhaar"
                                    type="number" 
                                    placeholder="Enter 12-digit Aadhaar" 
                                    value={aadhaarNumber} 
                                    onChange={(e) => {
                                        setAadhaarNumber(e.target.value);
                                        if (errors.aadhaarNumber) setErrors({...errors, aadhaarNumber: ""});
                                    }}
                                    className={errors.aadhaarNumber ? "input-error" : ""}
                                />
                                {errors.aadhaarNumber && <span className="error-text">{errors.aadhaarNumber}</span>}
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="gender">Gender *</label>
                                <select 
                                    id="gender"
                                    value={gender} 
                                    onChange={(e) => {
                                        setGender(e.target.value);
                                        if (errors.gender) setErrors({...errors, gender: ""});
                                    }}
                                    className={errors.gender ? "input-error" : ""}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                                {errors.gender && <span className="error-text">{errors.gender}</span>}
                            </div>
                        </div>
                        
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="dob">Date of Birth *</label>
                                <input 
                                    id="dob"
                                    type="date" 
                                    value={dob} 
                                    onChange={(e) => {
                                        setDob(e.target.value);
                                        if (errors.dob) setErrors({...errors, dob: ""});
                                    }}
                                    className={errors.dob ? "input-error" : ""}
                                />
                                {errors.dob && <span className="error-text">{errors.dob}</span>}
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="address">Full Address *</label>
                                <textarea 
                                    id="address"
                                    rows="1" 
                                    value={address} 
                                    onChange={(e) => {
                                        setAddress(e.target.value);
                                        if (errors.address) setErrors({...errors, address: ""});
                                    }} 
                                    placeholder="Enter your complete address"
                                    className={errors.address ? "input-error" : ""}
                                />
                                {errors.address && <span className="error-text">{errors.address}</span>}
                            </div>
                        </div>
                    </fieldset>
                    
                    {/* Section: Appointment Details */}
                    <fieldset className="form-section">
                        <legend>Appointment Details</legend>
                        
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="department">Department *</label>
                                <select 
                                    id="department"
                                    value={department} 
                                    onChange={(e) => {
                                        setDepartment(e.target.value);
                                        setDoctorFirstName("");
                                        setDoctorLastName("");
                                        if (errors.department) setErrors({...errors, department: ""});
                                    }}
                                    className={errors.department ? "input-error" : ""}
                                >
                                    <option value="">Select Department</option>
                                    {departmentArray.map((depart, index) => (
                                        <option value={depart} key={index}>{depart}</option>
                                    ))}
                                </select>
                                {errors.department && <span className="error-text">{errors.department}</span>}
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="doctor">Doctor *</label>
                                <select 
                                    id="doctor"
                                    value={`${doctorFirstName} ${doctorLastName}`}
                                    onChange={(e) => {
                                        const [firstName, lastName] = e.target.value.split(" ");
                                        setDoctorFirstName(firstName);
                                        setDoctorLastName(lastName);
                                        if (errors.doctor) setErrors({...errors, doctor: ""});
                                    }}
                                    disabled={!department || doctorLoading}
                                    className={`${!department ? "disabled" : ""} ${errors.doctor ? "input-error" : ""}`}
                                >
                                    <option value="">
                                        {doctorLoading ? "Loading doctors..." : "Select Doctor"}
                                    </option>
                                    {doctors
                                        .filter(doc => doc.doctorDepartment === department)
                                        .map((doctor, index) => (
                                            <option value={`${doctor.firstName} ${doctor.lastName}`} key={index}>
                                                Dr. {doctor.firstName} {doctor.lastName}
                                            </option>
                                        ))
                                    }
                                </select>
                                {errors.doctor && <span className="error-text">{errors.doctor}</span>}
                            </div>
                        </div>
                        
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="appointmentDate">Appointment Date *</label>
                                <input 
                                    id="appointmentDate"
                                    type="date" 
                                    value={appointmentDate} 
                                    onChange={(e) => {
                                        setAppointmentDate(e.target.value);
                                        if (errors.appointmentDate) setErrors({...errors, appointmentDate: ""});
                                    }}
                                    className={errors.appointmentDate ? "input-error" : ""}
                                />
                                {errors.appointmentDate && <span className="error-text">{errors.appointmentDate}</span>}
                            </div>
                            
                            <div className="form-group checkbox-group">
                                <label htmlFor="hasVisited">Have you visited us before?</label>
                                <div className="checkbox-wrapper">
                                    <input 
                                        id="hasVisited"
                                        type="checkbox" 
                                        checked={hasVisited} 
                                        onChange={(e) => setHasVisited(e.target.checked)}
                                    />
                                    <span className="checkbox-label">{hasVisited ? "Yes, I have visited" : "No, first time visiting"}</span>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    
                    {/* Submit Button */}
                    <div className="form-actions">
                        {isAuthenticated ? (
                            <button 
                                type="submit" 
                                className="submit-btn"
                                disabled={loading}
                            >
                                {loading ? "Booking..." : "Book Appointment"}
                            </button>
                        ) : (
                            <button 
                                type="button" 
                                className="submit-btn login-required"
                                onClick={() => navigate("/login")}
                            >
                                Login to Book Appointment
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </>
    )
}
export default AppointmentForm;
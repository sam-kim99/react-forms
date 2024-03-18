import { useState } from 'react';
import './Form.css';

const Form = props => {
    const [errors, setErrors] = useState([]);
    // console.log(errors);

    const [formInfo, setFormInfo] = useState({
        name: '',
        email: '',
        phoneNum: '',
        phoneType: '',
        staff: '',
        bio: '',
        emailNoti: false
    })
    
    const handleChange = key => e => {
        setFormInfo(old => ({...old, [key]: e.target.value}));
    }

    const validate = () => {
        const errors = [];
        if (formInfo.name.length === 0) errors.push('Name must be defined');
        if (!/\S+@\S+\.\S+/.test(formInfo.email)) errors.push('Invalid email');
        if (!/^(\d{3}[-\s]?){2}\d{4}$/.test(formInfo.phoneNum)) errors.push('Invalid phone number');
        if (formInfo.phoneNum && !formInfo.phoneType) errors.push('Please select phone type');
        if (formInfo.bio.length > 280) errors.push('Bio has a character limit of 280');
        return errors;
    }

    const handleSubmit = e => {
        e.preventDefault();
        const errors = validate();
        if (errors.length > 0) {
            setErrors(errors);
        } else {
            setErrors([]);
            setFormInfo({
                name: '',
                email: '',
                phoneNum: '',
                phoneType: '',
                staff: '',
                bio: '',
                emailNoti: false
            })
        }
    }

    return (
        <div className='new-form'>
            <h2>New Form</h2>
            {errors.length > 0 && (
                errors.map((err, idx) => <p key={idx}>{err}</p>)
            )}
            <form onSubmit={handleSubmit}>
                <label>Name:
                    <input type="text" value={formInfo.name} placeholder='Name' onChange={handleChange('name')}/>
                </label>
                <label>Email:
                    <input type="text" value={formInfo.email} placeholder='Email' onChange={handleChange('email')}/>
                </label>
                <label>Phone Number:
                    <input type="text" value={formInfo.phoneNum} placeholder='Phone Number' onChange={handleChange('phoneNum')}/>
                </label>
                <label>Phone Type:
                    <select name="phone-type" onChange={handleChange('phoneType')} defaultValue={formInfo.phoneType}>
                        <option value="" disabled>Please Select</option>
                        <option value="home">Home</option>
                        <option value="mobile">Mobile</option>
                        <option value="work">Work</option>
                    </select>
                </label>
                <label>Staff
                    <label>Instructor
                        <input type="radio" name="staff" onChange={handleChange('staff')} value="instructor" checked={formInfo.staff === "instructor"} />
                    </label>
                    <label>Student
                        <input type="radio" name="staff" onChange={handleChange('staff')} value="student" checked={formInfo.staff === "student"} />
                    </label>
                </label>
                <label>Bio
                    <textarea name="bio" cols="30" rows="10" onChange={handleChange('bio')} value={formInfo.bio}></textarea>
                </label>
                <label>Sign up for email notifications:
                    <input type="checkbox" name="email-noti" onChange={handleChange('emailNoti')} checked={formInfo.emailNoti}/>
                    <label>Sign Up</label>
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )

}

export default Form;
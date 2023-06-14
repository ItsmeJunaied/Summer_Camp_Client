import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";


const SocialLogin = () => {
    const {googleSignIN}=useContext(AuthContext);
    const navigate=useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";
    const handleGooglesignIN=()=>{
        googleSignIN()
        .then(res=>{
            const loggeduser= res.user;
            console.log(loggeduser);
            const saveUser={name:loggeduser.displayName,email:loggeduser.email}
            fetch('http://localhost:5001/users',{
                            method: 'POST',
                            headers:{
                                'content-type':'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(()=> {
                                    navigate(from,{replace:true});
                            })

        })
    }
    return (
        <div>
            <div className="divider"></div>
            <button onClick={handleGooglesignIN} className="btn btn-circle btn-outline">
                <FaGoogle></FaGoogle>
            </button>
        </div>
    );
};

export default SocialLogin;
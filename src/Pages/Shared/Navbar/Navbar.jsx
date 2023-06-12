// import { useContext } from "react";
import { Link } from "react-router-dom";
import logo from '../../../../public/photos/MusicSchool_Logo.png'
// import { AuthContext } from "../../../Providers/AuthProvider";
// import { FaShoppingCart } from 'react-icons/fa';
// import useCART from "../../../Hook/useCART";

const Navbar = () => {
    // const { user, logOut } = useContext(AuthContext);
    // const [cart] = useCART();
    // const handleLogOut = () => {
    //     logOut()
    //         .then(() => { })
    //         .catch(error => console.log(error));
    // }
    const navOptions = <>
        <li className=" no-underline hover:underline hover:text-amber-400"><Link to='/'> Home </Link></li>
        <li className="no-underline hover:underline  hover:text-amber-400"><Link to='instructor'> Instructors</Link></li>
        <li className="no-underline hover:underline"><Link to='class'>Classes</Link></li>
        <li className="no-underline hover:underline"><Link to='dashboard'>Dashboard</Link></li>
        {/* <li>
            <Link to="/dashboard/mycart">
                <button className="btn">
                    <FaShoppingCart></FaShoppingCart>
                    <div className="badge badge-secondary">+{cart?.length}</div>
                </button>
            </Link>
        </li> */}

        {/* <li><Link to='/signup'>Sign Up</Link></li> */}
        {/* {
            user ? <>
                <span>{user.displayName} </span>
                <button onClick={handleLogOut} className="btn btn-outline btn-primary">LOG OUT</button></> : <><li><Link to='/login'>Log IN</Link></li></>
        } */}
    </>

    return (
        <div className="navbar sticky top-0 z-10  mx-auto px-4 lg:px-0 w-full bg-[#121640] text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className=" lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {navOptions}
                    </ul>
                </div>
                <img className=" w-32 ml-32" src={logo} alt="" />
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-xl">
                    {navOptions}
                </ul>
            </div>
            
        </div>
    );
};

export default Navbar;
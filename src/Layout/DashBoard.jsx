import { FaWallet, FaCalendarAlt, FaHome, FaUtensilSpoon } from 'react-icons/fa';
import { Link, Outlet } from "react-router-dom";
import UseAdmin from '../Hooks/UseAdmin';
import UseInstructorCheck from '../Hooks/UseInstructorCheck';
// import useAdmin from '../Hook/useAdmin';
// import useCart from '../Hooks/useCart';

const DashBoard = () => {
    // const [cart] = useCart();

    // const isAdmin = true;
    // const isinstructor = false;
    const [isAdmin]=UseAdmin();
    const[isInstructor]=UseInstructorCheck();
    // console.log("isAdmin",isAdmin); 
    // console.log('isInstructor',isInstructor); 

    return (
        <>
            {/* <Helmet>
                <title>
                    Bistro Boss | My Cart
                </title>
            </Helmet> */}
            <div className="drawer lg:drawer-open ">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side bg-violet-700">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full  text-white">
                        {
                            isAdmin ? <>
                                <li><Link to='/dashboard/manageclass'><FaCalendarAlt></FaCalendarAlt>Manage Classes</Link></li>
                                <li><Link to='/dashboard/manageuser'><FaWallet></FaWallet>Manage Users</Link></li>
                            </> :
                                isInstructor ? <>
                                    <li><Link to='/dashboard/addclass'><FaUtensilSpoon></FaUtensilSpoon> Add a Class</Link></li>
                                    <li><Link to='/dashboard/myclass'><FaWallet></FaWallet>My Classes</Link></li>
                                </> : <>
                                    <li><Link to='/dashboard/selectedclass'><FaUtensilSpoon></FaUtensilSpoon>My Selected Classes</Link></li>
                                    <li><Link to='/dashboard/enrolledclass'><FaWallet></FaWallet>My Enrolled Classes</Link></li>
                                </>
                        }


                        <div className="divider"></div>
                        <li><Link to='/'><FaHome></FaHome>Home</Link></li>
                        <li><Link to='/instructor'><FaHome></FaHome>Instructor</Link></li>
                        <li><Link to='/class'><FaHome></FaHome>Class</Link></li>
                    </ul>

                </div>
            </div>
        </>
    );
};

export default DashBoard;
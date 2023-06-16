import { useEffect, useState } from "react";
import useClass from "../../../../Hooks/useClass";


const MyClass = () => {
    const [classList] = useClass();
    const [history, setHistory] = useState([]);

    const ids = history.map(item => item.classItems);

    const handleUpdate=(item)=>{
        console.log(item._id)
    }

    useEffect(() => {
        fetch('http://localhost:5001/payments')
            .then(res => res.json())
            .then(data => setHistory(data))
    }, [])
    return (
        <div className="overflow-x-auto">
            <h2 className=' font-bold text-5xl text-center text-cyan-600 mb-20'>My Class</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Class Image</th>
                        <th>Class Name</th>
                        <th>Available Seats</th>
                        <th>Status</th>
                        <th>Total Enrolled Students</th>
                        <th>Price</th>
                        <th>Feedback</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {classList.map(item => {
                        const idCount = ids.filter(id => id == item._id.toString()).length;

                        return (
                            <tr key={item._id}>
                                <div className="avatar">
                                    <div className="w-24 rounded-xl">
                                        <td><img src={item?.image} /></td>
                                    </div>
                                </div>
                                <td>{item?.className}</td>
                                <td>{item?.availableSeats}</td>
                                <td className="badge badge-secondary -mt-2">{item?.status}</td>
                                <td>
                                    
                                    <span className="badge badge-accent ml-2">{idCount}</span>
                                </td>
                                <td>{item?.price}</td>
                                <div className="avatar indicator mt-8">
                                    {item?.feedback && (
                                        <span className="indicator-item badge badge-secondary">{item.feedback}</span>
                                    )}
                                    <div className="w-20 h-20 rounded-lg">
                                        <td>Feedback</td>
                                    </div>
                                </div>
                                <td>
                                    <button onClick={()=>handleUpdate(item)} className="btn btn-error btn-sm">Update</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>


            </table>
        </div>

    );
};

export default MyClass;
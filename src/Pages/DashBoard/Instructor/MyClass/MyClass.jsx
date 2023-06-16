import useClass from "../../../../Hooks/useClass";


const MyClass = () => {
    const [classList] = useClass();
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
                    {
                        classList.map(item => <tr key={item._id}>
                            <div className="avatar">
                                <div className="w-24 rounded-xl">
                                    <td><img src={item?.image} /></td>
                                </div>
                            </div>
                            <td>{item?.className}</td>
                            <td >{item?.availableSeats}</td>
                            <td className="badge badge-secondary -mt-2">{item?.status}</td>
                            <td>{item?.enrollStudent}</td>
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
                                <button className="btn btn-error btn-sm">Update</button>
                            </td>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>

    );
};

export default MyClass;
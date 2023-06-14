import { useState } from "react";
import useClass from "../../../../Hooks/useClass";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const ManageClass = () => {
    const [classList] = useClass();
    const { register, handleSubmit } = useForm();
    const [status, setStatus] = useState('pending');
    console.log(status);
    const [modalOpen, setModalOpen] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);


    const handleApprove = (itemId) => {
        setStatus('approve')
        fetch(`http://localhost:5001/class/approve/${itemId}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setIsUpdated(true);
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: ``,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    };

    const handleDeny = (item_Id) => {
        setStatus('deny')
        fetch(`http://localhost:5001/class/deny/${item_Id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    setIsUpdated(true);
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: ``,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    };

    const [feedback, setFeedback] = useState('');
    const [itemId, setItemId] = useState('');
    const storefeedback = { feedback };

    const handleSendFeedback = (itemId) => {
        setModalOpen(true);
        setItemId(itemId); // Set the item ID in state
    };

    const onSubmit = (data) => {
        const { feedback } = data;
        console.log('itemId', itemId);
        console.log('feedback', feedback);
        setFeedback(feedback);

        // Use itemId in the fetch request
        fetch(`http://localhost:5001/class/feedback/${itemId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ feedback })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    setIsUpdated(true);
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: '',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };



    return (
        <div className="overflow-x-auto">
            <h2 className=' font-bold text-5xl text-center text-cyan-600 mb-20'>Manage Class</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            index
                        </th>
                        <th>Class Image</th>
                        <th>Class Name</th>
                        <th>Instructor Name</th>
                        <th>Instructor Email</th>
                        <th>Available Seats</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        classList.map((item, index) => <tr key={item._id}>
                            <td>
                                {index + 1}
                            </td>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item?.image} />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>{item?.className}</td>
                            <td>{item?.instructorName}</td>
                            <td>{item?.instructorEmail}</td>
                            <td>{item?.availableSeats}</td>
                            <td>{item?.price}</td>
                            <td>{item?.status}</td>
                            <td>
                                <div className="flex flex-col space-y-2">
                                    <button
                                        className="btn btn-primary btn-xs"
                                        onClick={() => handleApprove(item._id)}
                                        disabled={status !== 'pending'}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="btn btn-secondary btn-xs"
                                        onClick={() => handleDeny(item._id)}
                                        disabled={status !== 'pending'}
                                    >
                                        Deny
                                    </button>
                                    <button
                                        className="btn btn-tertiary btn-xs"
                                        onClick={() => handleSendFeedback(item._id)}
                                        disabled={status === 'pending' || status === 'approve'}
                                    >
                                        Send Feedback
                                    </button>


                                </div>

                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-md">
                        <h2 className="text-xl font-semibold mb-4">Send Feedback</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <textarea
                                className="w-full border border-gray-300 rounded-md p-2 mb-4"
                                rows={4}
                                placeholder="Enter feedback..."
                                {...register('feedback')}
                            />

                            <div className="flex justify-end">
                                <input
                                    type="submit"
                                    className="btn btn-primary mr-2"
                                    value="Send"

                                />
                            </div>
                        </form>
                    </div>
                </div>



            )}
        </div>
    );
};


export default ManageClass;
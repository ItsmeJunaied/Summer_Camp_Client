
import { FaChalkboardTeacher, FaTrashAlt, FaUserShield } from "react-icons/fa";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import UseAxios from "../../../../Hooks/UseAxios";

const ManageUser = () => {
    // const [activeRoles, setActiveRoles] = useState({});
    const [axiosSecure] = UseAxios();
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/users')
        return res.data;
    })
    console
    const handleMakeAdmin = user => {
        fetch(`http://localhost:5001/users/admin/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is an admin now`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    const handleMakeInstructor = user => {
        fetch(`http://localhost:5001/users/Instructor/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    fetch('http://localhost:5001/instructor', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(user)
                    })
                        .then((res) => res.json())
                        .then((instructorData) => {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: `Instructor inserted`,
                                showConfirmButton: false,
                                timer: 1500
                            })
                        });

                    refetch();

                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is an Instructor now`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };
    const handleDelete = user => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5001/users/${user._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deleteCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>

                                <td>{user.role === 'admin' ? 'admin' : <button onClick={() => handleMakeAdmin(user)} className="btn btn-sm btn-secondary text-white mr-3" ><FaUserShield></FaUserShield></button>}

                                    {user.role === 'instructor' ? 'instructor' : <button onClick={() => handleMakeInstructor(user)} className="btn btn-sm btn-accent text-white" ><FaChalkboardTeacher></FaChalkboardTeacher></button>}
                                </td>

                                <td>
                                    <td>
                                        <button onClick={() => handleDelete(user)} className="btn btn-ghost bg-red-600 text-white"><FaTrashAlt></FaTrashAlt></button>
                                    </td>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUser;
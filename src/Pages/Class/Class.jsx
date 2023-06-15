import { useContext } from "react";
import useClass from "../../Hooks/useClass";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import logo from '../../../public/photos/Class Header 2.svg';
import './Class.css';

const Class = () => {

  const [classList] = useClass();


  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const handleAddToCart = item => {
    const { _id, name, className, instructorName, image, price, availableSeats } = item;

    if (user && user.email) {
      const selectedItem = { classId: _id, name, className, image, instructorName, price, email: user.email };
      fetch('http://localhost:5001/carts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedItem)
      })
        .then(res => res.json())
        .then(data => {
          if (data.insertedId) {
            const newAvailableSeats = parseInt(availableSeats) - 1;
            fetch(`http://localhost:5001/class/seat/${_id}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ availableSeats: newAvailableSeats })
            })
              .then(res => res.json())
              .then(data => {
                if (data.modifiedCount) {
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Added to cart',
                    showConfirmButton: false,
                    timer: 1500
                  });
                } else {
                  Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Failed to update seat count',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  navigate('/login', { state: { from: location } });
                }
              })
              .catch(error => {
                console.log(error);
                Swal.fire({
                  position: 'top-end',
                  icon: 'error',
                  title: 'An error occurred while updating seat count',
                  showConfirmButton: false,
                  timer: 1500
                });
              });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'info',
              title: 'Please log in',
              showConfirmButton: false,
              timer: 1500
            });
            navigate('/login', { state: { from: location } });
          }
        })
        .catch(error => {
          console.log(error);
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'An error occurred while adding to cart',
            showConfirmButton: false,
            timer: 1500
          });
        });
    }
  };

  return (
    <div>
      <div className=" relative overflow-hidden h-96">
        <img className=" w-full " src={logo} alt="" />
        <div className="absolute bottom-0 top-36 p-4 class-header">
          <p className="text-white text-5xl font-bold">Classes</p>
          <p className=" text-yellow-600 class-sub text-3xl font-bold">Enroll Now</p>
        </div>
      </div>
      <div className=" grid grid-cols-3 mt-20 pb-20 container mx-auto ">
        {
          classList.map(item =>
            item.status === "approve" ? (
              <div
                key={item._id}
                className={`card card-side bg-base-100 shadow-xl mb-10 mr-10 ${item.availableSeats === 0 ? "bg-red-500" : ""
                  }`}
              >
                <figure>
                  <img src={item.image} alt="Movie" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{item.name}</h2>
                  <p>Instructor: {item.instructorName}</p>
                  <h2>
                    Price: <span className="badge badge-secondary">{item.price}</span>{" "}
                  </h2>
                  <h2>
                    Seats:{" "}
                    <span className="badge badge-secondary">{item.availableSeats}</span>{" "}
                  </h2>
                  <div className="card-actions justify-end">
                    <button onClick={() => handleAddToCart(item)} className="btn btn-primary">
                      Enroll
                    </button>
                  </div>
                </div>
              </div>
            ) : null
          )
        }

      </div>
    </div>
  );
};

export default Class;
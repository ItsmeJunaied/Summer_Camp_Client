import { useContext } from "react";
import useClass from "../../Hooks/useClass";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

const Class = () => {
  
  const [classList] = useClass();
  
  
  const { user } = useContext(AuthContext);
  const navigate= useNavigate();
  const location= useLocation();
  const handleAddToCart = item => {
    const {_id,name,  instructorName,  price  }= item ;
    console.log(name);
    console.log(item);
    if (user && user.email) {
      const selectedItem={classId:_id,name,instructorName,price,email: user.email}
      fetch('http://localhost:5001/carts',{
        method:'POST',
        headers:{
          'content-type':'application/json'
        },
        body: JSON.stringify(selectedItem)
      })
        .then(res => res.json())
        .then(data => {
          if (data.insertedId) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Added to cart',
              showConfirmButton: false,
              timer: 1500
            })
          } else {
            <div className="toast">
              <div className="alert alert-info">
                <span>Please Login</span>
              </div>
            </div>
            navigate('/login', {state:{from: location}})
          }
        })
    }
  }
  return (
    <div className=" grid grid-cols-3 mt-20 pb-20 container mx-auto ">
      {
        classList.map(item => <div key={item._id}
          className="card card-side bg-base-100 shadow-xl mb-10 mr-10">
          <figure><img src="/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie" /></figure>
          <div className="card-body">
            <h2 className="card-title">{item.name}</h2>
            <p>Instructor:{item.instructorName}</p>
            <h2>Price: <span className="badge badge-secondary">{item.price}</span> </h2>
            <div className="card-actions justify-end">
              <button onClick={() => handleAddToCart(item)} className="btn btn-primary">Enroll</button>
            </div>
          </div>
        </div>)
      }
    </div>
  );
};

export default Class;
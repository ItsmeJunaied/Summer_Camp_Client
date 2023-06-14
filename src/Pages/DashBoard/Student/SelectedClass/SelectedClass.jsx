import './SelectedClass.css';
import useCart from "../../../../Hooks/useCart";
import Swal from 'sweetalert2';

const SelectedClass = () => {
    const [cart,refetch] = useCart();
    const total = cart.reduce((sum, item) => item.price + sum, 0);
    // console.log(total);
    const handleDelete=(item)=>{
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
                fetch(`http://localhost:5001/carts/${item._id}`, {
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
        <div className="CartContainer container mx-auto">
            <div className="Header">
                <h3 className="Heading text-center">Sellected Courses</h3>
                
            </div>
            {
                cart.map(item => <div key={item._id}
                    className="Cart-Items">
                    <div className="image-box">
                        <img src={item.image} style={{ height: "120px" }} />
                    </div>
                    <div className="about mt-44">
                        <h1 className="title">{item.name}</h1>

                    </div>
                    <div className="counter">
                        <div className="count">{item.instructorName}</div>
                    </div>
                    <div className="prices mt-20">
                        <div className="amount">${item.price}</div>
                        <button onClick={()=>handleDelete(item)} className="remove"><u>Remove</u></button>
                    </div>
                    
                </div>
                
                )
            }
            

            <hr />
            <div className="checkout">
                <div className="total">
                    <div>
                        <div className="Subtotal">Sub-Total</div>
                        <div className="items">{cart.length}</div>
                    </div>
                    <div className="total-amount">${total}</div>
                </div>
                <button className="button">Checkout</button>
            </div>
        </div>

    );
};

export default SelectedClass;
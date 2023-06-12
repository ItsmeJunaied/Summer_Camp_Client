import useClass from "../../Hooks/useClass";

const Class = () => {
    const [classList]=useClass();
    return (
        <div className=" grid grid-cols-3 mt-20 pb-20 container mx-auto ">
            {
                classList.map(item=><div key={item._id}
                className="card w-96 bg-base-100 shadow-xl mb-20">
                <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                <div className="card-body">
                  <h2 className="card-title">
                    {item.name}
                    <div className="badge badge-secondary">Instructor:{item.instructorName}</div>
                  </h2>
                  
                  <div className="card-actions justify-end">
                    <div className="badge badge-outline">{item.availableSeats}</div> 
                    <div className="badge badge-outline">{item.price}</div>
                  </div>
                </div>
              </div>)
            }
        </div>
    );
};

export default Class;
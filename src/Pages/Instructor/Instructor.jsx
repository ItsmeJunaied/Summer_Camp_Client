
import useClass from "../../Hooks/useClass";
import useInstructor from "../../Hooks/useInstructor";
import './Instructor.css';
import logo from '../../../public/photos/Instructor Header 1.svg';


const Instructor = () => {
  const [instructor] = useInstructor();
  const [classList] = useClass();
  // console.log('=>',classList);
  // console.log('***',instructor);

  return (
    <div>
      <div className=" relative overflow-hidden h-96">
        <img className=" w-full " src={logo} alt="" />
        <div className="absolute bottom-0 top-36 p-4 class-header">
          <p className="text-white text-5xl font-bold">Instructors</p>
          <p className=" text-yellow-600 class-sub text-3xl  font-bold">Choose Now By Enroll</p>
        </div>
      </div>
      <div className=" grid grid-cols-3 mt-20 pb-20 container mx-auto ">
        {
          instructor.map(item => <div key={item._id}
            className="card w-96 bg-base-100 shadow-xl mb-20">
            <figure><img className=" w-fit h-60" src={item.image} alt="Instructor" /></figure>
            <div className="card-body">
              <h2 className="card-title">
                {item.name}
                <div className="badge badge-secondary">Instructor</div>
              </h2>
              <p>{item.email}</p>
              <div className="card-actions justify-end">
                <div className="badge badge-outline">Music</div>
                <div className="badge badge-outline">Instrument</div>
              </div>
            </div>
          </div>)
        }
      </div>
    </div>
  );
};

export default Instructor;
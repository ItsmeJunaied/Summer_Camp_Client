import useClass from '../../../Hooks/useClass';
import './PopularClass.css';

const PopularClass = () => {
    const [classList]= useClass;
    return (
        <div className=' container mx-auto  mt-40 mb-40'>
            <div className='pb-20 '>
                <h2 className='Engage flex justify-center text-3xl text-amber-500'>Enroll Our</h2>
                <h3 className=' flex justify-center text-5xl font-bold'>Popular Classes</h3>
            </div>
            {
                classList.map(item=><div key={item._id} className='grid grid-cols-3 mt-20'>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Andre Martine</h2>
                        <h2 className="card-title">Classical music</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                    </div>
                </div>
            </div>)
            }
            <div className="flex justify-center mt-20">
                <button className="btn btn-warning">Show More</button>
            </div>

        </div>
    );
};

export default PopularClass;
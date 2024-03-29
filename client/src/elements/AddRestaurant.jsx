import React, { useContext, useState } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const AddRestaurant = () => {
    const {addRestaurants} = useContext(RestaurantsContext);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [price_range, setPriceRange] = useState("Price Range");

    const handleSubmit = async (e) => {
        e.preventDefault() // prevents reloading page
        try {
            const response = await RestaurantFinder.post("/", {
                name: name, // can be written as name,
                location: location,
                price_range: price_range
            });
            addRestaurants(response.data.data.restaurant);
            console.log(response)
        } catch (err) {
            
        }
    }

  return (
    <div className="mb-4">
        <form action="">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <input value ={name} onChange={e => setName(e.target.value)} type="text" className='form-control' placeholder='Name'/>
                    </div>
                    <div className="col">
                        <input value ={location} onChange={e => setLocation(e.target.value)} type="text" className='form-control' placeholder='Location'/>
                    </div>
                    <div className="col">
                        <select value ={price_range} onChange={e => setPriceRange(e.target.value)} className='form-select mr-sm-2'>
                            <option disabled>Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>
                    <button onClick={handleSubmit} type="submit" className="col btn btn-primary">Add</button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default AddRestaurant

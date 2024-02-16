import React, {useEffect} from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { useContext } from 'react';
import { RestaurantsContext } from '../context/RestaurantsContext';

const RestaurantList = (props) => {
    const {restaurants, setRestaurants} = useContext(RestaurantsContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await RestaurantFinder.get("/");
              setRestaurants(response.data.data.restaurants);
            } catch (err) {}
          };
      
          fetchData();
        }, []);

    const handleDelete = async (id) => {
        try {
            const response = await RestaurantFinder.delete(`/${id}`);
            setRestaurants(restaurants.filter(restaurant => {
                return restaurant.id !== id
            }))
        } catch (err) {
            console.log(err);
        }
    };

  return (
    <div className='list-group'>
        <div className="container">
            <table className="table table-hover table-dark">
            <thead>
                <tr className='table-danger'>
                    <th scope='col'>Restaurant</th>
                    <th scope='col'>Location</th>
                    <th scope='col'>Price Range</th>
                    <th scope='col'>Ratings</th>
                    <th scope='col'>Edit</th>
                    <th scope='col'>Delete</th>
                </tr>
            </thead>
            <tbody>
                {restaurants && restaurants.map((restaurant) => { // runs only if restaurants exists using && {true && expressiom}
                    return(<tr key={restaurant.id}>
                        <td>{restaurant.name}</td>
                        <td>{restaurant.location}</td>
                        <td>{"$".repeat(restaurant.price_range)}</td>
                        <td>Reviews</td>
                        <td>
                            <button className='btn btn-warning'>Update</button>
                        </td>
                        <td>
                            <button onClick={() => handleDelete(restaurant.id)} className="btn btn-danger">Delete</button> {/* Arrow function since we only want to run one button is clicked, therefore we pass by refrerence*/}
                        </td>
                    </tr>)
                })}
                {/* <tr>
                    <td>Mcdonalds</td>
                    <td>New York</td>
                    <td>$$$</td>
                    <td>Rating</td>
                    <td><button className='btn btn-warning'>Update</button></td>
                    <td><button className="btn btn-danger">Delete</button></td>
                </tr>
                <tr>
                    <td>Mcdonalds</td>
                    <td>New York</td>
                    <td>$$$</td>
                    <td>Rating</td>
                    <td><button className='btn btn-warning'>Update</button></td>
                    <td><button className="btn btn-danger">Delete</button></td>
                </tr> */}
            </tbody>
        </table>
        </div>
    </div>
  )
}

export default RestaurantList

import {DUMMY_MEALS} from '../dev-data/dummy-meals';
import classes from './AvailableMeals.module.css';
import Card from '../../Shared/Card/Card';
import MealItem from '../MealItem/MealItem';
import {useEffect, useState} from 'react';

const AvailableMeals = () => {

    const [meals, setMeals] = useState({
        meals: []
    })

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch('https://react-meals-2a831-default-rtdb.firebaseio.com/meals.json')
            console.log('res is ', response)
            const responseData = await response.json()

            const meals = [];

            for (const key in responseData) {
                meals.push({
                    id: key,
                    name: responseData[key]['name'],
                    description: responseData[key]['description'],
                    price: responseData[key]['price'],
                })
            }

            setMeals(prevState => ({...prevState, meals: [...meals]}))
        }

        fetchMeals()
    }, [])

    const mealsList = meals.meals.map(meal => <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />);

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    )
};

export default AvailableMeals;

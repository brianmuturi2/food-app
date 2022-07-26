import {DUMMY_MEALS} from '../dev-data/dummy-meals';
import classes from './AvailableMeals.module.css';
import Card from '../../Shared/Card/Card';
import MealItem from '../MealItem/MealItem';
import {useEffect, useState} from 'react';

const AvailableMeals = () => {

    const [meals, setMeals] = useState({
        meals: [],
        isLoading: true,
        httpError: null
    })

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch('https://react-meals-2a831-default-rtdb.firebaseio.com/meals.json')

            if (!response.ok) {
                throw new Error('Something went wrong!')
            }

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

            setMeals(prevState => ({...prevState, meals: [...meals], isLoading: false}))
        }

        fetchMeals().catch(e => {
            setMeals(prevState => ({...prevState, isLoading: false, httpError: e.message}))
        })

    }, [])

    if (meals.isLoading) {
        return (
            <section className={classes.mealsLoading}>
                <p>Loading...</p>
            </section>
        )
    }

    if (meals.httpError) {
        return (
            <section className={classes.mealsError}>
                <p>{meals.httpError}</p>
            </section>
        )
    }

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

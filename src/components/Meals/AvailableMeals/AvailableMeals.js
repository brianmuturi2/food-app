import {DUMMY_MEALS} from '../dev-data/dummy-meals';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {

    const mealsList = DUMMY_MEALS.map(meal => <li key={meal.id}>{meal.name}</li>);

    return (
        <section className={classes.meals}>
            <ul>
                {mealsList}
            </ul>
        </section>
    )
};

export default AvailableMeals;

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css'
import axios from "axios";



const DUMMY_MEALS = [
    {
      id: 'm1',
      name: 'Sushi',
      description: 'Finest fish and veggies',
      price: 150,
    },
    {
      id: 'm2',
      name: 'Schnitzel',
      description: 'A german specialty!',
      price: 180,
    },
    {
      id: 'm3',
      name: 'Barbecue Burger',
      description: 'American, raw, meaty',
      price: 290,
    },
    {
      id: 'm4',
      name: 'Green Bowl',
      description: 'Healthy...and green...',
      price: 300,
    },
  ];



const AvailableMeals=()=>{

    const mealsList=DUMMY_MEALS.map((meal)=>(
        <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
        />
    ));
  return (
      <section className={classes.meals}>
          <Card>
          <ul>
              {mealsList}
          </ul>
          </Card>
      </section>
  )
}

export default AvailableMeals;
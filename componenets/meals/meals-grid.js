import MealItem from "./meal-item";
import classes from "./meals-grid.module.css";
export default function MealsGrid({ meals }) {
  return (
    <lu className={classes.meals}>
      {meals.map((m) => (
        <li key={m.id}>
          <MealItem {...m}></MealItem>
        </li>
      ))}
    </lu>
  );
}

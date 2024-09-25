import Link from "next/link";
import classes from "./page.module.css";
import MealsGrid from "@/componenets/meals/meals-grid";
import getMeals from "@/lib/meals";
import { Suspense } from "react";

export const metadata={
  title:"Meals Page",
  description:'browse the delicious'
}

 async function Meals (){
  const meals =  await getMeals()

  return   <MealsGrid meals={meals}></MealsGrid>
}



export default async function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Declices Meail,Creadted{""}
          <span className={classes.hi}></span>
        </h1>
        <p>
          Choose your faverite recipe and cook it your self .it is easy and fun
        </p>

        <p className={classes.cta}>
          <Link href="/meals/share">Share your fav rec </Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense>
               <Meals></Meals>
        </Suspense>
  
      </main>
    </>
  );
}

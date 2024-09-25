"use server";

import { redirect } from "next/navigation";
import { SaveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isinvaledtext(text) {
  return !text || text.trim() === "";
}

export default async function ShareData(prevState,formData) {
  const meal = {
    title: formData?.get("title"),
    summary: formData?.get("summary"),
    instructions: formData?.get("instructions"),
    image: formData?.get("image"),
    creator: formData?.get("name"),
    creator_email: formData?.get("email"),
  };

  if (
    isinvaledtext(meal.title) ||
    isinvaledtext(meal.summary) ||
    isinvaledtext(meal.instructions) ||
    isinvaledtext(meal.creator_email) ||
    isinvaledtext(meal.creator) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return{
      message:"invaled input "
    }
  }

  await SaveMeal(meal);
  revalidatePath("/meals")
  redirect("/meals");
}

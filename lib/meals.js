import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";
import { error } from "node:console";

const db = sql("meals.db");
export default async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // throw new Error('loading Failed')
  return db.prepare("SELECT * From meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function SaveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extintion = meal.image.name.split(".").pop();
  const filename = `${meal.slug}.${extintion}`;

  const stream = fs.createWriteStream(`public/images/${filename}`);
  const bufferedimag = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedimag), (error) => {
    if (error) {
      throw new Error("Saving image failed!");
    }
  });
  meal.image=`/images/${filename}`
  db.prepare(`
     INSERT INTO meals (title, image, summary, instructions, creator, creator_email, slug)
     VALUES (
       @title,
       @image,
       @summary,
       @instructions,
       @creator,
       @creator_email,
       @slug
     )
   `).run(meal);
   
}

import { recipes } from "../defaults";

export default function Recipes() {
  console.log('this is recipes', recipes[0].ingredients)
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div>This is the recipes page</div>
      {
        recipes.map((recipe) => (<div className="border border-black p-3" key={recipe.id}>
            <div>{recipe.name}</div>
            <div>{recipe.ingredients.map((ingredient) => (
                <p key={ingredient.id}>{ingredient.name} {ingredient.quantity.number} {ingredient.quantity.measurement}</p>
            ))}</div>
        </div>))
      }
    </main>
  );
}

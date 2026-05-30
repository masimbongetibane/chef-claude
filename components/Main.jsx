import React from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"
import { getRecipeFromChefClaude } from "./ai"

function Main() {
    const [ingredients, setIngredients] = React.useState([])

    const [recipe, setRecipe] = React.useState("")

    async function getRecipe() {
        try {
            const recipeMarkdown = await getRecipeFromChefClaude(ingredients)
            setRecipe(recipeMarkdown)
        } catch (err) {
            console.error(err)
        }
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")

        setIngredients(prevIngredients => [
            ...prevIngredients,
            newIngredient
        ])
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 && (
                <IngredientsList
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                />
            )}

            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    )
}

export default Main;
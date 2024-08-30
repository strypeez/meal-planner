import { Recipe } from "../stores/planner-store"
import { Day } from "../stores/planner-store"

export let defaultRecipes: { [key: string]: Recipe}= {
    '1': {
        id: '1',
        name: "Mapo Tofu",
        servings: 3,
        ingredients: [
            {
                id: '2',
                name: "Ground Pork",
                quantity: {
                    number: 2,
                    measurement: 'lbs',
                },
                isList: true
            },
            {
                id: '3',
                name: "Tofu",
                quantity: {
                    number: 1,
                    measurement: 'box',
                },
                isList: true
            }
        ]
    },
    '4':{
        id: '4',
        name: 'Bacon Pasta',
        servings: 3,
        ingredients: [
            {
                id: '5',
                name: "Pasta",
                quantity: {
                    number: 1,
                    measurement: 'handful'
                },
                isList: true
            },
            {
                id: '6',
                name: 'Sauce',
                quantity: {
                    number: 1,
                    measurement: 'bottle'
                },
                isList: true
            }
        ]
    }
}

export let defaultPlanner: Day[] = [
    {
        id: '1',
        name: 'Monday',
        short: 'Mon',
        breakfast: [],
        lunch: [],
        dinner: []
    },
    {
        id: '2',
        name: 'Tuesday',
        short: 'Tue',
        breakfast: [],
        lunch: [],
        dinner: []
    },
    {
        id: '3',
        name: 'Wednesday',
        short: 'Wed',
        breakfast: [],
        lunch: [],
        dinner: []
    },
    {
        id: '4',
        name: 'Thursday',
        short: 'Thu',
        breakfast: [],
        lunch: [],
        dinner: []
    },
    {
        id: '5',
        name: 'Friday',
        short: 'Fri',
        breakfast: [],
        lunch: [],
        dinner: []
    },
    {
        id: '6',
        name: 'Saturday',
        short: 'Sat',
        breakfast: [],
        lunch: [],
        dinner: []
    },
    {
        id: '7',
        name: 'Sunday',
        short: 'Sun',
        breakfast: [],
        lunch: [],
        dinner: []
    },

]


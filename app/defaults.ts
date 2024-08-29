import { Recipe } from "../stores/planner-store"

export let defaultRecipes: Recipe[] = [
    {
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
    {
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
]

export let defaultPlanner = [
    {
        id: '1',
        name: 'Monday',
        short: 'Mon',
        meals: []
    },
    {
        id: '2',
        name: 'Tuesday',
        short: 'Tue',
        meals: []
    },
    {
        id: '3',
        name: 'Wednesday',
        short: 'Wed',
        meals: []
    },
    {
        id: '4',
        name: 'Thursday',
        short: 'Thu',
        meals: [],
    },
    {
        id: '5',
        name: 'Friday',
        short: 'Fri',
        meals: []
    },
    {
        id: '6',
        name: 'Saturday',
        short: 'Sat',
        meals: []
    },
    {
        id: '7',
        name: 'Sunday',
        short: 'Sun',
        meals: []
    },

]


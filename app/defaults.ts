export let recipes = [
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
                }
            }
        ]
    }
]


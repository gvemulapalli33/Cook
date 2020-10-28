const $button = document.querySelector('.btn-cook');
const $message = document.querySelector('section:last-child');

const dishesMenu = {
    sides : ["Miso Glazed Carrots", "Coleslaw", "Garden Salad", "Crispy Potatoes"],
    mains : ["Spaghetti and Meatballs", "Pineapple Chicken", "Shakshuka", 
    "Thai Yellow Curry", "Bibimbap"],
    desserts : ["Apple Pie", "Lemon Meringue Pie", "Black Forest Cake", 
    "Banana Bread"]
}

function handleClick(event) {

    if (event.target.name === 'dish') {
        if(event.target.checked) {
            $button.disabled = false;
        }
    }

    if (event.target.classList.contains('btn-cook')) {
        const selections = document.querySelectorAll('input');
        const dishType = [...selections].find((item) => item.checked).id;
        generateDish(dishType);
    }

    if (event.target.classList.contains('clear')) {
        $message.classList.add('cook');
        const message = document.querySelector('.message');
        message.remove();
    }
}

function getEntireMeal() {
    let sidesIndex = Math.floor(Math.random() * dishesMenu['sides'].length);
    let mainsIndex = Math.floor(Math.random() * dishesMenu['mains'].length);
    let dessertsIndex = Math.floor(Math.random() * dishesMenu['desserts'].length);

    return `${dishesMenu['mains'][mainsIndex]}! with a of ${dishesMenu['sides'][sidesIndex]} and ${dishesMenu['desserts'][dessertsIndex]} for dessert!`;
}

function getDish(dishType) {
    let randomIndex = Math.floor(Math.random() * dishesMenu[dishType].length);
    let dish = dishesMenu[dishType][randomIndex];
    return dish;
}

function generateDish(dishType) {
    $message.classList.remove('cook');
    $message.innerHTML = 
    `<section class="message">
        <span class="text"><em>You should make</em></span> 
        <p class="dishName">${dishType === 'entireMeal' ? 
        getEntireMeal() : getDish(dishType)}</p>
        <button class="clear">clear</button>
     </section>`;
}

document.addEventListener('click', handleClick);
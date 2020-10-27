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
    if (!event.target.classList.contains('btn-cook')) {
        return;
    } 
    const selections = document.querySelectorAll('input');
    const dishType = [...selections].find((item) => item.checked).id;
    generateDish(dishType);
}

function generateDish(dishType) {
    let randomIndex = Math.floor(Math.random() * dishesMenu[dishType].length);
    let dish = dishesMenu[dishType][randomIndex];
    $message.classList.remove('cook');
    $message.innerHTML = 
    `<section class="message">
        <span class="text"><em>You should make</em></span> 
        <p class="dishName">${dish}!</p>
    </section>`;
}

document.addEventListener('click', handleClick);
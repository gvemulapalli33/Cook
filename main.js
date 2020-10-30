const $button = document.querySelector('.btn-cook');
const $message = document.querySelector('section:last-child');

const dishesMenu = {
    sides : ["Miso Glazed Carrots", "Coleslaw", "Garden Salad", "Crispy Potatoes"],
    mains : ["Spaghetti and Meatballs", "Pineapple Chicken", "Shakshuka", 
    "Thai Yellow Curry", "Bibimbap"],
    desserts : ["Apple Pie", "Lemon Meringue Pie", "Black Forest Cake", 
    "Banana Bread"]
}

function addMenuItem() {
    let form = document.forms.addRecepie;
    let recepieName = form.elements.recepieName.value;
    let recepieType = form.elements.type.value;
    let types = Object.keys(dishesMenu);
    if (recepieName && recepieType && types.includes(recepieType)) {
       dishesMenu[recepieType].push(recepieName);
       generateDish(recepieType, recepieName, error);
    }
    if (!types.includes(recepieType)) {
        generateDish(recepieType, recepieName, true);
    }
}

function handleClick(event) {

    if (event.target.name === 'dish') {
        if (event.target.checked) {
            $button.disabled = false;
        }
    }

    if (event.target.classList.contains('addRecepieBtn')) {
        document.forms.addRecepie.style.display = 'block';
    }

    if (event.target.classList.contains('add')) {
         event.preventDefault();
         addMenuItem();
    }

    if (event.target.classList.contains('btn-cook')) {
        showLoading();
        const selections = document.querySelectorAll('input');
        const dishType = [...selections].find((item) => item.checked).id;
        setTimeout(() => generateDish(dishType), 2000);
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

function generateDish(dishType, dishName, error) {
    let errMessage;
    $message.classList.remove('cook');
    if (error) {
        errMessage = `${dishType} is not in Menu`;
    }
    $message.innerHTML = 
    `<section class="message">
        <span hidden=${errMessage} class="text"><em>You should make</em></span> 
        <p class="dishName">
        ${errMessage || dishName || (dishType === 'entireMeal' ? 
        getEntireMeal() : getDish(dishType))}
        </p>
        <button class="clear">clear</button>
        <button hidden=${errMessage} class="btn delete">Delete</button>
     </section>`;
}

function showLoading() {
    $message.classList.remove('cook');
    $message.innerHTML = 
    `<section class="message">
        <span class="dishName"><em>Loading ...</em></span> 
     </section>`;
}

document.addEventListener('click', handleClick);
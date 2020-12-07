class App {

    constructor() {
        this.dishesMenu = {
            sides : ["Miso Glazed Carrots", "Coleslaw", "Garden Salad", "Crispy Potatoes"],
            mains : ["Spaghetti and Meatballs", "Pineapple Chicken", "Shakshuka", 
            "Thai Yellow Curry", "Bibimbap"],
            desserts : ["Apple Pie", "Lemon Meringue Pie", "Black Forest Cake", 
            "Banana Bread"]
        }

        this.$button = document.querySelector('.btn-cook');
        this.$message = document.querySelector('section:last-child');

        this.addEventListeners();
    }

    addEventListeners() {
        document.addEventListener('click', (event) => {
            this.disableButton(event);
            this.showAddRecepie(event);
            this.addRecepie(event);
            this.letsCook(event);
            this.clearDish(event);
        });
    }


    addMenuItem() {
        let form = document.forms.addRecepie;
        let recepieName = form.elements.recepieName.value;
        let recepieType = form.elements.type.value;
        let types = Object.keys(this.dishesMenu);
        if (recepieName && recepieType && types.includes(recepieType)) {
            this.dishesMenu[recepieType].push(recepieName);
            this.generateDish(recepieType, recepieName, error);
        }
        if (!types.includes(recepieType)) {
            this.generateDish(recepieType, recepieName, true);
        }
    }

    disableButton(event) {
        let {name, checked} = event.target;
        if (name === 'dish') {
            if (checked) {
                this.$button.disabled = false;
            }
        }
    }

    showAddRecepie(event) {
        let {target} = event;
        if (target.classList.contains('addRecepieBtn')) {
            document.forms.addRecepie.style.display = 'block';
        }
    }

    addRecepie(event) {
        let {target} = event;
        if (target.classList.contains('add')) {
            event.preventDefault();
            this.addMenuItem();
        }
    }

    letsCook(event) {
        let {target} = event;
        if (target.classList.contains('btn-cook')) {
            this.showLoading();
            const selections = document.querySelectorAll('input');
            const dishType = [...selections].find((item) => item.checked).id;
            setTimeout(() => this.generateDish(dishType), 2000);
        }
    }

    clearDish(event) {
        let {target} = event;
        if (target.classList.contains('clear')) {
            this.$message.classList.add('cook');
            const message = document.querySelector('.message');
            message.remove();
        }
    }

    getEntireMeal() {
        let sidesIndex = Math.floor(Math.random() * this.dishesMenu['sides'].length);
        let mainsIndex = Math.floor(Math.random() * this.dishesMenu['mains'].length);
        let dessertsIndex = Math.floor(Math.random() * this.dishesMenu['desserts'].length);
    
        return `${this.dishesMenu['mains'][mainsIndex]}! with a of ${this.dishesMenu['sides'][sidesIndex]} and ${this.dishesMenu['desserts'][dessertsIndex]} for dessert!`;
    }
    
    getDish(dishType) {
        let randomIndex = Math.floor(Math.random() * this.dishesMenu[dishType].length);
        return this.dishesMenu[dishType][randomIndex];
    }

    showLoading() {
        this.$message.classList.remove('cook');
        this.$message.innerHTML = 
        `<section class="message">
            <span class="dishName"><em>Loading ...</em></span> 
         </section>`;
    }

    generateDish(dishType, dishName, error) {
        let errMessage;
        this.$message.classList.remove('cook');
        if (error) {
            errMessage = `${dishType} is not in Menu`;
        }
        this.$message.innerHTML = 
        `<section class="message">
            <span hidden=${errMessage} class="text"><em>You should make</em></span> 
            <p class="dishName">
            ${errMessage || dishName || (dishType === 'entireMeal' ? 
            this.getEntireMeal() : this.getDish(dishType))}
            </p>
            <button class="clear">clear</button>
            <button hidden=${errMessage} class="btn delete">Delete</button>
         </section>`;
    }

}

new App();
// Пример данных для меню
const menuData = [
    { name: 'Латте', price: 50, description: 'Нежный латте с молочным вкусом' },
    { name: 'Капучино', price: 45, description: 'Кофе с воздушной пенкой и шоколадной ноткой' },
    { name: 'Эспрессо', price: 68, description: 'Классический короткий кофе' },
    // Добавьте другие элементы меню здесь
];

document.addEventListener('DOMContentLoaded', () => {
    const menuList = document.getElementById('menu-list');
    const orderList = document.getElementById('order-list');
    const totalPriceElement = document.getElementById('total-price');
    const clearOrderButton = document.getElementById('clear-order'); // Кнопка "Очистить заказ"

    let total = 0;


    function createMenuItem(item) {
        const menuItem = document.createElement('li');
        menuItem.innerHTML = `
            <span>${item.name} <p>${item.description}</p></span>         
            <span>${item.price.toFixed(2)} ₴</span>
            <button class="button" data-name="${item.name}" data-price="${item.price}">Add</button>
        `;
        menuList.appendChild(menuItem);
    }

    menuData.forEach(createMenuItem);

   
    function addToOrder(name, price) {
        const orderItem = document.createElement('li');
        orderItem.innerHTML = `
            <span>${name}</span>
            <span>${price.toFixed(2)} ₴</span>
            <button class="button" data-name="${name}" data-price="${price}">Delete</button>
        `;
        orderList.appendChild(orderItem);

        total += price;
        totalPriceElement.textContent = `Total: ₴${total.toFixed(2)}`;
    }

    
    function removeFromOrder(button) {
        const listItem = button.parentElement;
        const price = parseFloat(button.getAttribute ('data-price'));

        total -= price;
        totalPriceElement.textContent = `Total: ₴${total.toFixed(2)}`;

        listItem.remove();
    }

    
    menuList.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const name = event.target.getAttribute('data-name');
            const price = parseFloat(event.target.getAttribute('data-price'));
            addToOrder(name, price);
        }
    });

    orderList.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            removeFromOrder(event.target);
        }
    });

 
    clearOrderButton.addEventListener('click', () => {
        
        while (orderList.firstChild) {
            orderList.removeChild(orderList.firstChild);
        }
        total = 0;
        totalPriceElement.textContent = `Total: ₴${total.toFixed(2)}`;
    });
});

/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/


const baseUrl = 'https://platzi-avo.vercel.app';
const appNode = document.querySelector('#app');

// Intl
// 1. format dates
// 2. format currency

const formatPrice = (price) => {
  const newPrice = new window.Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
  
  return newPrice;
}
  
// web api
// conectarnos al server
// promise -> async/await
window.fetch(`${baseUrl}/api/avo`)
// procesar la respuesta y convertirla en JSON
.then(response => response.json())
// JSON -> Data -> Renderizar info browser 
.then((responseJSON) => {
  const nodeArray = responseJSON.data.map((item) => {
    // crear image
    const image  = document.createElement('img');
    image.className = 'h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6';
    image.src = `${baseUrl}${item.image}`;
    // crear titulo
    const title  = document.createElement('h2');
    title.textContent = item.name;
    title.className = 'text-2xl';
    // crear precio
    const price  = document.createElement('div');
    price.className = 'text-gray-600';
    price.textContent = formatPrice(item.price);

    const priceAndTitle = document.createElement('div');
    priceAndTitle.className = 'text-center md:text-left';
    priceAndTitle.appendChild(title);
    priceAndTitle.appendChild(price);

    const card = document.createElement('div');
    card.className = 'md:flex bg-white rounded-lg p-6 hover:bg-gray-300';
    card.appendChild(image);
    card.appendChild(priceAndTitle);

    return card;
  });
  appNode.append(...nodeArray);
});
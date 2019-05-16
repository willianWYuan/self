import '../style.css';
import timg from '../timg.jpg';
import pa from '../../package.json';

function component() {
	var element = document.createElement('div');
	element.innerHTML = `Hello ${pa.name}<br /> <img class="images" src="${timg}" alt="${timg}">`;
	element.className = "h1";
	console.log(pa, element)
	return element;

}



document.body.appendChild(component());



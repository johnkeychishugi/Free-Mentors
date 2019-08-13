
const ul = document.getElementById("ul");

const dropdown = () =>{
	if(ul.classList.contains('active')){
	    ul.classList.remove('active');
	}else{
        ul.classList.add('active');
	}
}
document.querySelector('.menu')
        .addEventListener('click',dropdown);
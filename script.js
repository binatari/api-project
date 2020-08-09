//code to let animations wait for page to load befor firing 
document.body.classList.add('js-loading');

window.addEventListener("load", showPage);

function showPage() {
  document.body.classList.remove('js-loading');
}

let img  = document.querySelectorAll(".img-cont");

//animation javascript
const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -250px 0px"
};

const visible = document.querySelectorAll(".is-visible");

const appearOnScroll = new IntersectionObserver(function(
  entries,
  appearOnScroll
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("appear");
      appearOnScroll.unobserve(entry.target);
    }
  });
},
appearOptions);

  visible.forEach(visibles => {
      appearOnScroll.observe(visibles);
  });

  img.forEach(image => {
      appearOnScroll.observe(image);
  });


//code to fetch from api 
let heading = document.querySelectorAll(".heading");

let images = document.querySelectorAll(".images");

let summary = document.querySelectorAll(".summary");

let section = document.querySelectorAll(".section");




let sport = fetch("https://newscatcher.p.rapidapi.com/v1/latest_headlines?topic=sport&lang=en&media=True", headers);

let finance = fetch("https://newscatcher.p.rapidapi.com/v1/latest_headlines?topic=finance&lang=en&media=True", headers);

let business = fetch("https://newscatcher.p.rapidapi.com/v1/latest_headlines?topic=business&lang=en&media=True", headers);

let entertainment = fetch("https://newscatcher.p.rapidapi.com/v1/latest_headlines?topic=entertainment&lang=en&media=True", headers);

let politics = fetch("https://newscatcher.p.rapidapi.com/v1/latest_headlines?topic=politics&lang=en&media=True", headers);

Promise.all([sport, finance, business, entertainment, politics])
.then( res => {
	
	res.forEach( req => {
		process (req.json());
	}
	)
})
.catch( err =>{
	console.log(err);
});

let i = 0;

let process = (res) => {
	res.then( response => {
		console.log(response);
		heading[i].innerHTML = response.articles[0].title;
		if (response.articles[0].media !== "null") {
			images[i].src = response.articles[0].media;
		}
        summary[i].innerHTML = response.articles[0].summary;
		i++;
		console.log(i);
	});
};


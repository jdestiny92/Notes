var dogs = {
	raining: true,
	noise: 'woof',
	makeNoise: function(){
		if(dogs.raining){
			console.log(dogs.noise);
		}
	}
}

var cats = {
	raining: false,
	noise: 'meow',
	makeNoise: function(){
		if(cats.raining){
			console.log(cats.noise);
		}
	}
}

dogs.makeNoise();

function meow(){
	cats.raining = true;
	cats.makeNoise();
}

meow();

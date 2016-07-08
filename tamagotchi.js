var DigitalPal = function(hungry, sleepy, bored, age){
	this.hungry = hungry;
	this.sleepy = sleepy;
	this.bored = bored;
	this.age = age;

	this.feed = function(){
		if(this.hungry==true){
			console.log('That was yummy!');
			this.hungry = false;
			this.sleepy = true;
		}
		else{
			console.log('No Thanks! I am full!');
		}
	}
	this.sleep = function(){
		if(this.sleepy==true){
			console.log('Zzzz');
			this.sleepy = false;
			this.bored = true;
			this.increaseAge();
		}
		else{
			console.log('No way I am not tired!');
		}
	}
	this.play = function(){
		if(this.bored==true){
			console.log('Yay, lets play!');
			this.bored = false;
			this.hungry = true;
		}
		else{
			console.log('Not right now. Later?');
		}
	}
	this.increaseAge = function(){
		this.age++;
		console.log('Happy Birthday to me! I am ' + this.age + ' years old!');
	}
}

var dog = new DigitalPal(false, false, true, 0);
dog.Outside = false;
dog.Bark = function(){
	console.log('Woof! Woof!');
};
dog.goOutside = function(){
	if(dog.Outside==false){
		console.log('Yay! I love the outdoors!');
		dog.Outside = true;
		dog.Bark();
	}
	else{
		console.log('We are already outside though...');
	}
}

var cat = new DigitalPal(false, false, true, 0);
cat.HouseCondition = 100;
cat.meow = function(){
	console.log('meow meow');
}
cat.destroyFurniture = function(){
	if(cat.HouseCondition > 0){
	cat.HouseCondition = cat.HouseCondition - 10;
	console.log('Hahahha take that furniture!');
	cat.bored = false;
	cat.sleepy = true;
	}
	else{
		console.log('No more furniture to destroy');
	}
}

cat.BuyNewFurniture = function(){
	cat.HouseCondition = cat.HouseCondition + 50;
	console.log('Are you sure about that?');
}

dog.increaseAge();
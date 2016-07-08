function newChar(options) {
    this.name = options.name;
    this.profession = options.profession;
    this.gender = options.gender;
    this.age = options.age;
    this.strength = options.strength;
    this.hitPoints = options.hitPoints;
    this.printStats = function() {
        console.log(this.name, this.profession, this.gender, this.age, this.strength, this.hitPoints);
    }
}

var mage = new newChar({name: 'Julian', profession: 'alchemist', gender: 'male', age: 23, strength: 20, hitPoints: 60})

//console.log(mage);

mage.printStats();

var superman = new newChar({
	name: 'superman',
	profession: 'superhero', 
	gender: 'male',
	age: 52,
	strength: 9000,
	hitPoints: 10000
});

superman.printStats();
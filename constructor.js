//CONSTRUCTOR WHICH CAN BE USED TO CREATE OBJECTS WITH THE ".raining", ".noise", and ".makeNoise" PROPERTIES//
function Animal(options) {
    this.raining = options.raining;
    this.noise = options.noise;
    this.color = options.color;
    this.makeNoise = function() {
        if (this.raining == true) {
            console.log(this.noise);
        }
    }
}

//SETS THE VARIABLES "dogs" AND "cats" TO BE ANIMAL OBJECTS//
var dogs = new Animal({raining: true, noise: "Woof!", color: 'brown'});
var cats = new Animal({raining: false, noise: "Meow!", color: 'yellow'});

console.log(dogs);
console.log(cats);

dogs.makeNoise();
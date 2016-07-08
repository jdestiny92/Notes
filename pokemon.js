var Pokemon = function(type, name, hp) {
  this.type = type;
  this.name = name;
  this.hp = hp;
  this.attack = function(victim){
  	victim.hp = victim.hp - 10;
  	console.log(victim.name + ' new hp is ' + victim.hp);
  }
}

var pokemon1 = new Pokemon('electric', 'pikachu', 10);
var pokemon2 = new Pokemon('water', 'squirtle', 40);
var pokemon3 = new Pokemon('psychic', 'mew', 1000);
pokemon3.status = 'legendary';

pokemon1.attack(pokemon2);
function Programmer(name, title, age, language){
	this.name = name;
	this.title = title;
	this.age = age;
	this.language = language;
	this.printAll = function(){
		console.log(this.name, this.title, this.age, this.language);
	}
}

var programmer1 = new Programmer('Julian', 'Full Stack Developer', 23, 'Javascript');

programmer1.printAll();
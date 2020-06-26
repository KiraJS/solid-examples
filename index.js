/* SOLID PRINSIPLES */

/* S – Single Responsibility. One class – one job */

/* Bad practice */ 

class News {
  constructor(title, text) {
    this.title = title;
    this.text = text; 
    this.isModified = false;
  }
  update(text) {
    this.text = text;
    this.isModified = true;
  }
  toHTML() {
    return `
      <h1>${this.title}</h1>
      <p>${this.text}</p>
    `
  }
  toJSON() {
    return JSON.stringify({
      title: this.title,
      text: this.text
    })
  }
}

/* Best practice – New class */

class News {
  constructor(title, text) {
    this.title = title;
    this.text = text; 
    this.isModified = false;
  }
  update(text) {
    this.text = text;
    this.isModified = true;
  }
}

class NewsPrinter {
  constructor(news) {
    this.news = news;
  }

  toHTML() {
    return `
      <h1>${this.news.title}<h1>
      <p>${this.news.text}<p>
    `
  }

  toJSON() {
    return JSON.stringify({
      title: this.news.title,
      text: this.news.text
    })
  }

}
const news = new News('Title', 'Text');
console.log(new NewsPrinter(news).toHTML());
console.log(new NewsPrinter(news).toJSON());


/* O – Open-Closed. Open to Extention, Close to Modification */

/* Bad practice */ 

class Square {
  constructor(size) {
    this.size = size;
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
}

class AreaCalculator {
  constructor(shapes) {
    this.shapes = shapes
  }
  sum() {
    return this.shapes.reduce((acc, shape) => {
      if (shape.size) {
        acc += shape.size * shape.size;
      } else {
        acc += (shape.radius ** shape.radius) * Math.PI;
      }
      return acc;
    })
  }
  sum() {
    return this.shapes.reduce((acc, shape) => {
      
      return acc += shape.area();
    })
  }
}

/* Best practice – Base class */ 

class Shape { 
  area() {
    throw new Error('Method area() should be implemented');
  }
}

class Square extends Shape {
  constructor(size) {
    super();
    this.size = size;
  }
  area() {
    return this.size ** 2;
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  area() {
    return (this.radius ** 2) * Math.PI;
  }
}

class AreaCalculator {
  constructor(shapes) {
    this.shapes = shapes;
  }
  sum() {
    return this.shapes.reduce((acc, shape) => {
      
      return acc += shape.area();
    })
  }
}
console.log(new AreaCalculator([new Square(10), new Circle(2)]).sum());


/* L – Liskov Substitution. Derived class must be substitutable for its base class */

/* Bad practice */ 

class Person {
  access(){
    console.log('success');
  }
}
class Frontend extends Person {

}
class Backend extends Person {
  
}
class Guest extends Person {
  access(){
    throw new Error();
  }
}

/* Best practice */

class Person {}

class Member extends Person {
  access(){
    console.log('success');
  }
}
class Guest extends Person {
 
}
class Frontend extends Member {

}
class Backend extends Member {
  
}

function chechAccess(member) {
  console.log(member.access());
}


/* I – Interface Segregation. Few specific interface better than one general big one. No unusable methods! */

/* Bad practice */
class Animal {
  constructor(name) {
    this.name = name;
  }

  fly() {
      console.log(`${this.name} can fly`);
  };
  walk() {
      console.log(`${this.name} can walk`);
  };
  smim() {
      console.log(`${this.name} can swim`);
  };
}
class Cat extends Animal {
  fly() {
    return null;
  }
  swim() {
    return null;
  }
}

/* Best practice */

class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Cat extends Animal {}

const flyer = {
  fly() {
      console.log(`${this.name} can fly`);
  }
}

const walker = {
  walk() {
      console.log(`${this.name} can walk`);
  }
}

const swimmer = {
  smim() {
      console.log(`${this.name} can swim`);
  }
}

Object.assign(Cat.prototype, walker);


/* D – Dependency Inversion. High-level module not depends on low-level. Both depens on abstractions. Abstractions dont depends on details. Details depens on abstractions */

/* Bad practice */

class Fetch {
  request(url) {
    return Promise.resolve('some fetch data');
  }
}
class LocalStorage {
  get(key) {
    return 'some localStorage data';
  }
}
class DataBase {
  constructor() {
    //this.localStorage = new LocalStorage();
    this.fetch = new Fetch();
  }
  getData() {
    //return this.LocalStorage.get('someKey');
    return fetch.request('url.com');
  }
}

/* Best practice */
class Fetch {
  request(url) {
    return Promise.resolve('some fetch data');
  }
}

class FetchClient {
  constructor() {
    this.fetch = new Fetch();
  }
  clientGet() {
    return this.fetch.request('someUrl');
  }
}

class LocalStorage {
  get(key) {
    return 'some localStorage data';
  }
}

class LocalStorageClient {
  constructor() {
    this.LocalStorage = new LocalStorage();
  }
  clientGet() {
    return this.LocalStorage.get('someKey');
  }
}

class DataBase {
  constructor(client) {
    this.client = client;
  }
  getData() {
    return this.client.clientGet(key);
  }
}
const db = new DataBase(new LocalStorageClient());
db.getData('some-url.com');
// or
const db = new DataBase(new FetchClient());
db.getData('some-key');





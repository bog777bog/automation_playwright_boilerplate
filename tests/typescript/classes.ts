class Base {
    k = 4;
  }
   
  class Derived extends Base{
    constructor(private firstName: string, private lastName: string ) {
      // Prints a wrong value in ES5; throws exception in ES6
      super();
      console.log(this.k);
  // 'super' must be called before accessing 'this' in the constructor of a derived class.
    }

    getFirstName () {
      return this.firstName;
    }

    getLastName () {
        return this.lastName;
      }
  }

  let personObject = new Derived('Bohdan','Kudria');
  console.log(personObject.getFirstName());
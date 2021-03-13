import express from 'express';
import converter from 'number-to-words';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

const app = express();
const port = 3000;

/**
 * A class that allows a number to be examined in a few different ways
 */
class IntegerInfo {
  /**
   * The value of the number we are going to provide info for.
   */
  value: number;

  constructor(value: number) {
    this.value = value;
  }

  /**
   * Gets the english spelling for this number.
   * @return {string} The english words
   */
  numeral() {
    return converter.toWords(this.value);
  }

  /**
   * Square this number and returns a 
   * IntegerInfo object for that number.
   * @return {IntegerInfo} The object for the new number
   */
  square() {
    return new IntegerInfo(this.value * this.value);
  }

  /**
   * Gets the square root of this number as a float.
   * @return {Float} The square root
   */
  squareRoot() {
    return Math.sqrt(this.value);
  }

  /**
   * Returns the prime factors for this 
   * number as an array of IntegerInfo objects.
   * @return {IntegerInfo[]} The prime factors
   */
  primeFactors() {
    let remainder = this.value;
    let currentFactor = 2;
    let factors = [];
    while (remainder != 1 && currentFactor <= remainder) {
      // If the number can be evenly divided by this factor
      if (remainder % currentFactor == 0) {
        // Add the factor to the list
        factors.push(new IntegerInfo(currentFactor));
        // Divide the number by the factor
        remainder /= currentFactor;
      } else {
        // Try the next number if it can't be divided.
        currentFactor++;
      }
    }
    return factors;
  }

  /**
   * Checks if this number is prime.
   * @return {boolean} True if the number is prime
   */
  isPrime() {
    if (this.value == 1){
        return false
    }
    // Check all possible divisors from 2 to the square root of the integer
    let max = Math.sqrt(this.value);
    for (let i = 2; i < max; i++) {
      if (this.value % i == 0) {
        return false;
      }
    }
    return true;
  }

  /**
   * @return {IntegerInfo} Info for the i+1 number
   */
  next() {
    return new IntegerInfo(this.value + 1);
  }

  /**
   * @return {IntegerInfo} Info for the i-1 number
   */
  previous() {
    return new IntegerInfo(this.value - 1);
  }
}

let schema = buildSchema(`
  type Query {
    """
    Get information for a single integer.
    """
    number(
      "The number to examine."
      value: Int!): Integer
   
    """
    Get a range of integers values
    """
    range(
      "The integer to start at"
      start: Int, 
      "The integer to end at (non-inclusive)"
      end: Int!, 
      "How much to increment between each number"
      step: Int): [Integer]
 }   

  """
  The integer type that can be queried 
  for different facts about the integer.
  """
  type Integer {
    "The Numerical value of the integer"
    value: Int,
    "The i+1 integer"
    next: Integer,
    "The i-i integer"
    previous: Integer,
    "The integer expressed as words"
    numeral: String,
    "The square (i*i) of this number"
    square: Integer,
    "The square root as a float"
    squareRoot: Float,
    "The prime factors that make up this integer"
    primeFactors: [Integer],
    "Is true if this Integer is prime"
    isPrime: Boolean
  }
`);

let root = {
  range: ({start = 0, end, step = 1}: {start: number; end: number; step: number}) => {
    console.log(start);
    let numbers: IntegerInfo[] = [];

    for (let i = start; i < end; i += step) {
      numbers.push(new IntegerInfo(i));
    }
    return numbers;
  },
  number: ({value}: {value: number}) => {
    return new IntegerInfo(value);
  }
};

app.use('/', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.listen(port, () => {
  return console.log(`we are now listening on ${port}`);
});

'use strict';

const Mem = require ('./memory');
const Memory = new Mem();

class Array{
  constructor() {
    this.length = 0;
    this._capacity = 0;
    this.ptr = Memory.allocate(this.length);
  }

  push(value) {
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    Memory.set(this.ptr + this.length, value);
    this.length++;
  }

  _resize(size) {
    const oldPtr = this.ptr;
    this.ptr = Memory.allocate(size);
    if (this.ptr === null) {
      throw new Error('Out of memory');
    }
    Memory.copy(this.ptr, oldPtr, this.length);
    Memory.free(oldPtr);
    this._capacity = size;
  }

  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }
    return Memory.get(this.ptr + index);
  }

  pop() {
    if (this.length === 0) {
      throw new Error('Index error');
    }
    const value = Memory.get(this.ptr + this.length - 1);
    this.length--;
    return value;
  }

  insert(index, value) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }

    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    Memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
    Memory.set(this.ptr + index, value);
    this.length++;
  }

  remove(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }
    Memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
    this.length--;
  }

  urlify(string){
    let noSpaceString = '';
    for (let i =0; i < string.length; i++){ 
      if (string[i] !== ' '){
        noSpaceString = noSpaceString + string[i];
      }
      else {
        noSpaceString = noSpaceString + '%20';
      }
    }   
    return noSpaceString;
  }


  filterAllLessThanFive (array){
    let filteredArray = [];
    // console.log('array: ', array);
    for (let i =0; i < array.length; i++)
    {
      // console.log(array[i]);
      if (array[i] >=5){
        filteredArray.push(array[i]);
      }
    }
    return filteredArray;

  }

  maxSum (array){
    let maxSum=0;
    let sum =0;
    for (let i=0; i < array.length; i++){
      sum = sum + array[i];
      // console.log(sum);
      if (sum > maxSum){
        maxSum = sum;
      }
    }
    return maxSum;
  }

  mergeArrays(array1, array2){
    let mergedArray=[];
    array1.forEach(element => {
      mergedArray.push(element);
    });

    array2.forEach(element => {
      mergedArray.push(element);
    });

    let sortedArray = [];

    let lowest = mergedArray[0];
    while (mergedArray.length !== 0){
      for (let i=0; i < mergedArray.length; i++){
     
        // console.log(mergedArray[i]);
        if (mergedArray[i] <= lowest){
          lowest = mergedArray[i];
          sortedArray.push(lowest);
          mergedArray.splice(i, 1);

        }
      }
      lowest++;
    }

    return sortedArray;
  }

  removeCharacters(string, charsToRemove){

    for (let i=0; i< string.length; i++){
      for (let j=0; j< charsToRemove.length; j++){
      
        if (string[i] === charsToRemove[j]){
          //console.log(string[i]);
          string= string.replace(string[i], '');
        }
      }
    }
    return string;
  }

  products (array){
    let productArray =[], index = 0, ignoredIndex = 0, product =1;


    for (let i=ignoredIndex; i< array.length; i++){
      while (index < array.length){
        if (ignoredIndex !== index){
          product = product * array[index];
        }
        index++;
      }
      productArray.push(product); 
      index = 0;
      ignoredIndex++;
      product =1;
    }
    return productArray;
  }

  twoDArray(array){
    const rows =[];
    const columns =[];

    for (let i=0; i<array.length; i++){
      for (let j=0; j<array[i].length; j++){
        if (array[i][j] === 0){
          rows[i] = 0;
          columns[j] = 0;
        }
      }
    }

    for (let i=0; i < array.length; i++){
      for (let j=0; j < array[i].length; j++){

        if (rows[i] === 0 || columns[j]===0 ){
          array[i][j] = 0;
        }
      }
    }
    return array;
  }

  stringRotation(str1, str2){

    let mergedString2 = str2 + str2;

    if (mergedString2.includes(str1)){
      return true;
    }
    else{
      return false;
    }
  }
  
}
function main(){

  Array.SIZE_RATIO = 3;
  //create an instance of the array class
  let arr = new Array();

  ///1.What is the length, capacity and memory address of your array?

  //add an item to the array
  // arr.push(3);
  // arr.push(5);
  // arr.push(15);
  // arr.push(19);
  // arr.push(45);
  // arr.push(10);
  // arr.push(2);

  ///2.What is the length, capacity and memory address of your array? Explain the result of your program after adding the new lines of code

  // arr.pop();
  // arr.pop();
  // arr.pop();

  ///3.What is the length, capacity and address of your array? Explain the result of your program after adding the new lines of code

  // Print the first item in the array arr.
  
  //console.log(arr.get(0));
  
  // Empty the array and add just one item 
  
  // arr.push("tauhida");
  
  // 4. Print this one item that you just added. What is the result? Can you explain your result?
  
  // What is the purpose of the _resize() function in your Array class?  
  //Private function, used as convention to not be used out side class
  //

  //console.log(arr);

  // 5. Write a method that takes in a string and replaces all its empty spaces with a '%20'.

  // console.log(arr.urlify('tauhida parveen'));

  // console.log(arr.urlify('www.thinkful.com /tauh ida parv een'));


  // 6. Write an algorithm to remove all numbers less than five from the array.

  // console.log(arr.filterAllLessThanFive([4, 6, 9, 1, 15, 23]));

  // 7. Write an algorithm which will find the largest sum in a continuous sequence

  //console.log(arr.maxSum([4,6,-3,5,-2,1]));


  //8. Write an algorithm to merge the two arrays into a single array, which should also be sorted.

  //console.log(arr.mergeArrays([1, 3, 6, 8, 11], [2, 3, 5, 8, 9, 10]));

  //9. Write an algorithm that deletes given characters from a string. 

  //console.log(arr.removeCharacters('Battle of the Vowels: Hawaii vs. Grozny', 'aeiou'));

  //10. Given an array of numbers, write an algorithm to find out the products of every number, except the one at that index.

  //console.log(arr.products([1, 3, 45, 4]));

  //11. Write an algorithm which searches through a 2D array, and whenever it finds a zero should set the entire row and column to zero.

  //   let input = 
  // [[1,0,1,1,0],
  //   [0,1,1,1,0],
  //   [1,1,1,1,1],
  //   [1,0,1,1,1],
  //   [1,1,1,1,1]];
  //   console.log(arr.twoDArray(input));

  // 12. Given two strings, str1 and str2, write a program that checks if str2 is a rotation of str1.

  console.log(arr.stringRotation('testers', 'rsteste'));
  console.log(arr.stringRotation('testers', 'rsetste'));

}

main();
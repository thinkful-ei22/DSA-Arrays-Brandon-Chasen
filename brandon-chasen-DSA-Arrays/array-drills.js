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
}

function main(){

  Array.SIZE_RATIO = 3;
  //create an instance of the array class
  let arr = new Array();

  ///1.What is the length, capacity and memory address of your array?

  //add an item to the array
  arr.push(3);
  arr.push(5);
  arr.push(15);
  arr.push(19);
  arr.push(45);
  arr.push(10);

  ///2.What is the length, capacity and memory address of your array? Explain the result of your program after adding the new lines of code

  arr.pop();
  arr.pop();
  arr.pop();

  ///3.What is the length, capacity and address of your array? Explain the result of your program after adding the new lines of code

  // Print the first item in the array arr.

  // Empty the array and add just one item 
  arr.push("tauhida");
  
  // 4. Print this one item that you just added. What is the result? Can you explain your result?
  
  // What is the purpose of the _resize() function in your Array class?  
  //Private function, used as convention to not be used out side class
  //


  console.log(arr);
}

main();
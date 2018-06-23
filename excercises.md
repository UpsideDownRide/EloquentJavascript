# Excercises from Eloquent Javascript

## 1 Looping a triangle

Write a loop that makes seven calls to
console.log
to output the following
triangle:

```
#
##
###
####
#####
######
#######
```

*Writing a loop would be boring so here is recursive solution:*

```js
const printTree = (char) => {
    console.log(char)
    const addedChar = char.concat(char.charAt(0))
    addedChar.length <= 7 ? h(newChar) : undefined
}
```

## 2 FizzBuzz

*The evergreen FizzBuzz*

```js

const fizzBuzzer = (number) => {
    if (number % 15 === 0) return "FizzBuzz"
    else if (number % 5 === 0) return "Buzz"
    else if (number % 3 === 0) return "Fizz" 
    else return number
}

Array(100).fill().map((_, i) => console.log(fizzBuzzer(i+1)))
```

## 3 Chessboard

Write a program that creates a string that represents an 8×8 grid, using newline
characters to separate lines. At each position of the grid there is either a space
or a "#" character. The characters should form a chessboard.
Passing this string to
console.log
should show something like this:
```
 # # # #
# # # #
 # # # #
# # # #
 # # # #
# # # #
 # # # #
# # # #
```
When you have a program that generates this pattern, define a binding size = 8 and change the program so that it works for any size , outputting a grid of the given width and height.

```js
const lineGenerator = (length, parity) => {
    return Array(length)
            .fill()
            .map((_, i) => i % 2 === parity ? ' ' : '#')
            .reduce((h, t) => h + t)
}

const boardPrinter = (size) => {
    return Array(size)
            .fill()
            .map((_, i) => lineGenerator(size, i % 2))
            .map(line => console.log(line))
}
```
### 4 Beancounting
You can get the Nth character, or letter, from a string by writing
"string"[N]. The returned value will be a string containing only one character (for example, "b"). The first character has position 0, which causes the last one to be found at position string.length - 1. In other words, a two-character string has length
2, and its characters have positions 0 and 1. Write a function countBs that takes a string as its only argument and returns a number that indicates how many uppercase “B” characters there are in the string. Next, write a function called countChar that behaves like countBs, except it takes a second argument that indicates the character that is to be counted (rather than counting only uppercase “B” characters). Rewrite
countBs to make use of this new function.

```js
const countChar = (string, charToCount, count = 0) => {
    const strLen = string.length
    const [h, t] = [string[0], string.substr(1, strLen)]
    if (strLen === 0) return count
    else return (h === charToCount ?
        countChar(t, charToCount, count+1) :
        countChar(t, charToCount, count))
}
```
### 5 The sum of a range
The introduction of this book alluded to the following as a nice way to compute
the sum of a range of numbers: console.log(sum(range(1, 10)));
Write a range function that takes two arguments, start and end, and returns an array containing all the numbers from start up to (and including) end. Next, write a sum function that takes an array of numbers and returns the sum of these numbers.  Run the example program and see whether it does
indeed return 55. As a bonus assignment, modify your range function to take an optional third argument that indicates the “step” value used when building the array. If no step is given, the elements go up by increments of one, corresponding to the old behavior. The function call range(1, 10, 2) should return [1, 3, 5, 7, 9]. Make sure it also works with negative step values so that range(5, 2, -1) produces [5, 4, 3, 2].

```js
const range = (start, end, step = 1) => {
    const rangeLength = Math.floor((Math.abs(end - start) + 1) / Math.abs(step))
    return Array(rangeLength).fill()
        .map((_, i) => start + step * i)
}

const sum = (array) => {
    return(array.reduce((h,t) => h+t))
}
```

### 6 Reversing an array
Arrays have a reverse method that changes the array by inverting the order in which its elements appear. For this exercise, write two functions, reverseArray and reverseArrayInPlace. The first,reverseArray, takes an array as argument and produces a new array that has the same elements in the inverse order. The second, reverseArrayInPlace, does what the reverse method does: it modifies the array given as argument by reversing its elements. Neither may use the standard reverse method.

```js
const reverseArray = (array) => {
    const arrLength = array.length
    if (arrLength <= 1) return [...array]
    else return [array[arrLength - 1], ...reverseArray(array.slice(1, arrLength - 1)), array[0]]
}
```

### 7 Array to List

![](list-picture.png)

Write a function arrayToList that builds up a list structure like the one shown when given
[1, 2, 3] as argument. Also write a listToArray function that produces an array from a list. Then add a helper function prepend, which takes an element and a list and creates a new list that adds the element to the front of the input list, and nth, which takes a list and a number and returns
the element at the given position in the list (with zero referring to the first element) or undefined when there is no such element.




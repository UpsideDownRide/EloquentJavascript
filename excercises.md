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

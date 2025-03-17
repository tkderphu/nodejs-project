function convertToRoman(num) {
    const roman = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L',
        'XL', 'X', 'IX', 'V', 'IV', 'I']
    const numb = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
    
    let i = 0
    let res = ''
    while(num > 0) {
        if(num >= numb[i]) {
            res += roman[i]
            num -= numb[i]
        } else {
            i ++;
        }
    }
    return res
}
   
console.log(convertToRoman(12));
const numberToWordsEnglish= function(num) {
    let result = toHundreds(num % 1000);
    const bigNumbers = ["Thousand", "Million", "Billion"];
    for (let i = 0; i < 3; ++i) {
      num = Math.trunc(num / 1000);
      result = num % 1000 !== 0 ? [toHundreds(num % 1000), bigNumbers[i], result].filter(Boolean).join(" ") : result;
    }
    return result.length === 0 ? "Zero" : result;
  }
  function toHundreds(num) {
    const numbers = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
      "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    const result = Array(3).fill("");
    let a = Math.trunc(num / 100), b = num % 100, c = num % 10;
    result[0] = a > 0 && `${numbers[a]} Hundred`;
    result[1] = b < 20 ? numbers[b] : tens[Math.trunc(b / 10)]
    result[2] = b >= 20 && `${numbers[c]}`;
    return result.filter(Boolean).join(" ");
  }
  
  
  
  module.exports={
    numberToWordsEnglish

  }
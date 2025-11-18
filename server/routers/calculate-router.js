const express = require("express");
const router = express.Router();



// Addition of n natural numbers 
router.post("/", (req, res) => {
    const { numbers, operation } = req.body;
    if (!operation) {
    return res.status(400).json({ error: "Please provide num1, num2, and operation" });
  }

  let result = numbers[0];

  for(let i = 1 ; i < numbers.length ; i++) {
    if(i == numbers.length) {
        break;
    }
    result = result + numbers[i];
  }


  res.json({ result });
});






// Simple Calculator
// router.post("/", (req, res) => {
//     const { num1, num2, operation } = req.body;
//     if (num1 === undefined || num2 === undefined || !operation) {
//     return res.status(400).json({ error: "Please provide num1, num2, and operation" });
//   }

//   let result;

//   switch (operation) {
//     case "+":
//       result = num1 + num2;
//       break;
//     case "-":
//       result = num1 - num2;
//       break;
//     case "*":
//       result = num1 * num2;
//       break;
//     case "/":
//       if (num2 === 0) return res.status(400).json({ error: "Cannot divide by zero" });
//       result = num1 / num2;
//       break;
//     default:
//       return res.status(400).json({ error: "Invalid operation" });
//   }
 
//   res.json({ result });
// });


// Sample for loop
// for (let i = 0; i < array.length; i++) {
    
// }



module.exports = router;
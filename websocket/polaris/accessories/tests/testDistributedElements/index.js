const helper = require("../../helper/distributeElements");

const testDistibutedElements = function () {
    const elements = [1, 2, 3, 4, 5, 6, 7]
    const elements2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
    const elements3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]

    const distributedElements = helper.distributeEllements(elements)
    const distributedElements2 = helper.distributeEllements(elements2)
    const distributedElements3 = helper.distributeEllements(elements3)

    console.log(distributedElements)
    console.log(distributedElements2)
    console.log(distributedElements3)
    
};

testDistibutedElements()
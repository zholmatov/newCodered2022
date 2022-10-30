const distributeEllements = function (elements) {
  let count = 0;
  let index = 0;
  let distributedElements = [];
  let newElements = [];
  while (index < elements.length) {
    if (count >= 9) {
      distributedElements.push(newElements);
      newElements = [];
      count = 0;
    } else {
      newElements.push(elements[index]);
      index++;
      count++;
      if (index >= elements.length) {
        distributedElements.push(newElements);
        break;
      }
    }
  }

  return distributedElements;
};

exports.distributeEllements = distributeEllements;

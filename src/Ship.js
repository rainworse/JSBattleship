function Ship(length) {
  const totalLength = length;
  let health = length;
  const hit = () => {
    health--;
  };
  const timesHit = () => {
    return totalLength - health;
  };

  const isSunk = () => {
    return health == 0;
  };

  return { hit, timesHit, isSunk };
}

module.exports = Ship;

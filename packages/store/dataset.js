let work = {
    "1": "Администратор 10 Уровня",
    "": ""
};

function getWork(id) {
  return work[id];
}

function setWork(_work) {
  work = _work;
}

mp.events.add(
  {
    "getWork" : getWork,
    "setWork" : setWork
  })

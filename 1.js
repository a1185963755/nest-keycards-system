class Heap {
  constructor(compare) {
    this.compare = compare;
    this.data = [];
  }
  push(val) {
    this.data.push(val);
    this.data.sort(this.compare);
  }
  pop() {
    return this.data.shift();
  }
  size() {
    return this.data.length;
  }
}
function delay(delay) {
  return new Promise((res) => {
    setTimeout(res, delay);
  });
}

let flag = false;
class SuperTask {
  constructor(cap) {
    this.cap = cap;
    this.heap = new Heap((a, b) => a.priority - b.priority);
    this.runningCount = 0;
  }

  addTask(task, priority = 0) {
    const p = new Promise((res, rej) => {
      this.heap.push({
        task,
        res,
        rej,
        priority: priority,
      });
    });
    if (!flag) {
      flag = true;
      setTimeout(() => {
        this.__runtask();
        flag = false;
      }, 0);
    }

    return p;
  }

  __runtask() {
    while (this.runningCount < this.cap && this.heap.size()) {
      const { task, res, rej } = this.heap.pop();
      this.runningCount++;
      task()
        .then(res)
        .catch(rej)
        .finally(() => {
          this.runningCount--;
          this.__runtask();
        });
    }
  }
}

const superTask = new SuperTask(2);
superTask
  .addTask(() => delay(2000), 4)
  .then(() => console.log('Task 1 completed'));
superTask
  .addTask(() => delay(500), 5)
  .then(() => console.log('Task 2 completed'));
superTask
  .addTask(() => delay(5000), 1)
  .then(() => console.log('Task 3 completed'));

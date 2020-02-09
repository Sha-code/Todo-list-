var app = {

  addItems: document.querySelector('.add-items'),
  itemsList: document.querySelector('.tasks'),
  items: JSON.parse(localStorage.getItem('items')) || [],
  eraseButton: document.querySelector('button'),
  numberTodo: document.querySelector('.todo'),

  init: function () {
    app.addItems.addEventListener('submit', app.addItem);
    app.itemsList.addEventListener('click', app.toggleDone);
    app.eraseButton.addEventListener('click', app.eraseList)
    app.populateList(app.items, app.itemsList);
  },

  addItem: function (e) {
    e.preventDefault();
    const text = (this.querySelector('[name=item]')).value;
    const item = {
      text,
      done: false
    };
    app.items.push(item);
    app.populateList(app.items, app.itemsList);
    localStorage.setItem('items', JSON.stringify(app.items));
    this.reset();
  },

  populateList: function (tasks = [], tasksList) {
    tasksList.innerHTML = tasks.map((task, i) => {
      return `
        <li>
          <input type="checkbox" data-index=${i} id="item${i}" ${task.done ? 'checked' : ''} />
          <label for="item${i}">${task.text}</label>
        </li>
      `;
    }).join('');
    let todo = app.items.filter((task) => { return !task.done }).length;
    if (todo < 2) {
      return app.numberTodo.innerHTML = `${todo} tâche en cours`
    } else {
      return app.numberTodo.innerHTML = `${todo} tâches en cours`
    }
  },
  toggleDone: function (e) {
    if (!e.target.matches('input')) return;
    const el = e.target;
    const index = el.dataset.index;
    app.items[index].done = !app.items[index].done;
    localStorage.setItem('items', JSON.stringify(app.items));
    app.populateList(app.items, app.itemsList);
  },
  eraseList: function () {
    app.items = [];
    app.populateList(app.items, app.itemsList);
    localStorage.setItem('items', JSON.stringify(app.items));
  },
};


// Chargement du DOM
document.addEventListener('DOMContentLoaded', app.init);

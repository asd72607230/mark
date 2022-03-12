import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo';

  filter: "all" | "active" | "done" = "all";

  allItems = [
    { description: "eat", done: true },
    { description: "read", done: false },
    { description: "coding", done: false },
    { description: "sleep", done: false }
  ]

  get items() {
    if (this.filter === "all") {
      return this.allItems;
    }
    return this.allItems.filter(item => this.filter === "done" ? item.done : !item.done);
  }

  addItem(description) {
    this.allItems.unshift({
      description,
      done: false
    })
  }
}

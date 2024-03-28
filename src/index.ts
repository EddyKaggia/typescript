import { TodoItem } from "./todoItem.js";
import { TodoCollection } from "./todoCollection.js";
//inquirer library to create a command-line interface for interacting with the todo list application
import inquirer from "inquirer";

let todos: TodoItem[] = [
  new TodoItem(1, "Buy Flowers"),
  new TodoItem(2, "Get Shoes"),
  new TodoItem(3, "Collect Tickets"),
  new TodoItem(4, "Call Joe", true),
];

let collection: TodoCollection = new TodoCollection("Adam", todos);
let showCompleted = true;

function displayTodoList(): void {
  console.log(
    `${collection.userName}'s Todo List ` +
      `(${collection.getItemCounts().incomplete} items to do)`
  );
  collection.getTodoItems(showCompleted).forEach((item) => item.printDetails());
}

// "Enums" is short for "Enumerations." Enumerations in programming are a way to define a type consisting of a set of named constants, often referred to as enumerators or members. These constants represent a finite set of possible values that a variable of that type can have

// An enum Commands is declared with two members: Toggle and Quit. Each member is assigned a string value representing a command option for the todo list application.
enum Commands {
  Add = "Add New Task",
  Complete = "Complete Task",

  Toggle = "Show/Hide Completed",
  Purge = "Remove Completed Tasks",

  Quit = "Quit",
}

function promptAdd(): void {
  console.clear();
  inquirer
    .prompt({
      type: "input",
      name: "add",
      message: "Enter task: ",
    })
    .then((answers) => {
      if (answers["add"] !== "") {
        collection.addTodo(answers["add"]);
      }
      promptUser();
    });
}

function promptComplete(): void {
  console.clear();
  inquirer
    .prompt({
      type: "checkbox",
      name: "complete",
      message: "Mark Tasks Complete",
      choices: collection.getTodoItems(showCompleted).map((item) => ({
        name: item.task,
        value: item.id,
        checked: item.complete,
      })),
    })
    .then((answers) => {
      let completedTasks = answers["complete"] as number[];
      collection
        .getTodoItems(true)
        .forEach((item) =>
          collection.markComplete(
            item.id,
            completedTasks.find((id) => id === item.id) != undefined
          )
        );
      promptUser();
    });
}

function promptUser(): void {
  console.clear();
  displayTodoList();
  inquirer
    .prompt({
      type: "list",
      name: "command",
      message: "Choose option",
      choices: Object.values(Commands),
      //badProperty: true,
    })
    .then((answers) => {
      switch (answers["command"]) {
        case Commands.Toggle:
          showCompleted = !showCompleted;
          promptUser();
          break;
        case Commands.Add:
          promptAdd();
          break;
        case Commands.Complete:
          if (collection.getItemCounts().incomplete > 0) {
            promptComplete();
          } else {
            promptUser();
          }
          break;
        case Commands.Purge:
          collection.removeComplete();
          promptUser();
          break;
      }
    });
}

promptUser();

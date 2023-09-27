import Task from "./Task";

/**
 * 管理tasks的类
 */
export default class Schedule {
  private _tasks: { [taskName: Task["name"]]: Task } = {};

  constructor(tasks: Task | Task[] | undefined = undefined) {
    if (tasks === undefined) return;
    this.add(tasks as Task | Task[]);
  }

  /**
   * add task
   * @param {Task} add one tasktasks
   * @param {Task[]} add multiple tasks
   */
  add(tasks: Task | Task[]) {
    if (tasks instanceof Task) tasks = [tasks] as Task[];
    else tasks = tasks as Task[];

    tasks.forEach((task) => {
      this._tasks[task.name] = task;
    });
  }

  /**
   * remove task
   * @param {Task["name"]} remove one task
   * @param {Task["name"][]} remove multiple tasks
   * @param {undefined} remove all tasks
   */
  remove(taskNames: Task["name"] | Task["name"][] | undefined = undefined) {
    if (taskNames === undefined) taskNames = Object.keys(this._tasks);
    else if (typeof taskNames === Task["name"])
      taskNames = [taskNames as Task["name"]];
    else taskNames = taskNames as Task["name"][];

    taskNames.forEach((taskName) => {
      this._tasks[taskName].stop();
      delete this._tasks[taskName];
    });
  }

  /**
   * run task
   * @param {Task["name"]} run one task
   * @param {Task["name"][]} run multiple tasks
   * @param {undefined} run all tasks
   */
  run(taskNames: Task["name"] | Task["name"][] | undefined = undefined) {
    if (taskNames === undefined) taskNames = Object.keys(this._tasks);
    else if (typeof taskNames === Task["name"])
      taskNames = [taskNames as Task["name"]];
    else taskNames = taskNames as Task["name"][];

    taskNames.forEach((taskName) => {
      this._tasks[taskName].run();
    });
  }
}

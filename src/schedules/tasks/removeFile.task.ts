import Task from "../Task";
const name = "removeTask";
const time = "* 23 * * *"; // 每天23点执行一次
const action = () => {
  console.log("执行具体任务");
};
const removeFileTask = new Task(name, time, action);

export default removeFileTask;

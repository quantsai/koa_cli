import Schedule from "./Schedule";
import Task from "./Task";
import removeFileTask from "./tasks/removeFile.task";

// 需要添加的任务列表
const tasks = [removeFileTask];
const schedule = new Schedule(tasks);

export default schedule;

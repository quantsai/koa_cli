import { Job, scheduleJob } from "node-schedule";

/**
 * 任务的封装类，具体任务都是此类的实例
 */
export default class Task {
    name: string;
    private time: string;
    private action: () => void;
    private job: Job | null;

    constructor(name: string, time: string, action: () => void) {
        this.name = name;
        this.time = time;
        this.action = action;
        this.job = null;
    }

    public run(): void {
        if (this.job) {
            console.log("Task is already running");
            return;
        }

        this.job = scheduleJob(this.time, () => {
            console.log(`Running task: ${this.name}`);
            this.action();
        });

        console.log(`Task ${this.name} is scheduled to run at ${this.time}`);
    }

    public stop(): void {
        if (this.job) {
            this.job.cancel();
            this.job = null;
            console.log(`Task ${this.name} is stopped`);
        } else {
            console.log(`Task ${this.name} is not running`);
        }
    }
}

module.exports.apps = [
  {
    name: "production", //需与package.json里--only 后缀名相同
    script: "./dist/src/app.js",
    args: "one two",
    instances: 1,
    cron_restart: "0 03 * * *",
    autorestart: false,
    watch: false,
    min_uptime: "200s",
    max_restarts: 10,
    ignore_watch: ["node_modules", ".idea", "log"],
    max_memory_restart: "1G",
    restart_delay: "3000",
    env: { NODE_ENV: "production" },
  },

  {
    name: "test", //需与package.json里--only 后缀名相同
    script: "./dist/src/app.js",
    args: "one two",
    instances: 1,
    cron_restart: "0 03 * * *",
    autorestart: true,
    watch: true,
    ignore_watch: ["node_modules", ".idea", "log"],
    max_memory_restart: "300M",
    env: { NODE_ENV: "development" },
  },
];

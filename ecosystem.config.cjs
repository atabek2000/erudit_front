module.exports = {
  apps: [
    {
      name: "Erudit",
      port: 3000,
      exec_mode: "fork",
      instances: 1, // Or a number of instances
      script: "./.output/server/index.mjs",
      args: "start",
      env_file: "/var/www/erudit_front/.env", // Указание пути к .env файлу
    },
  ],
};

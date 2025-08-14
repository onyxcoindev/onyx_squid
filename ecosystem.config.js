module.exports = {
  apps: [
    {
      name: 'onyx-squid-processor',
      script: 'sqd process:prod',
      watch: false,
      max_memory_restart: '1G',
    },
    {
      name: 'onyx-squid-cron',
      script: 'sqd cron',
      watch: false,
      max_memory_restart: '1G',
    },
    {
      name: 'onyx-squid-server',
      script: 'sqd serve:prod',
      watch: false,
      max_memory_restart: '1G',
    },
  ],
};

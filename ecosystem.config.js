module.exports = {
  apps: [
    {
      name: 'chat-app',
      script: 'server/index.js',
      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      instances: 2,
      autorestart: false,
      watch: true,
      max_memory_restart: '1G',
      env: {
        PORT: 9000,
        NODE_ENV: 'development'
      },
      env_production: {
        PORT: 9001,
        NODE_ENV: 'production'
      }
    }
  ]

  /* deploy: {
    production: {
      user: 'node',
      host: '212.83.163.1',
      ref: 'origin/master',
      repo: 'pjb0811@github.com:repo.git',
      path: '/var/www/production',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production'
    }
  } */
};

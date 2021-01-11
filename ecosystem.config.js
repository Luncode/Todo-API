module.exports = {
  apps : [{
    name:'todo-api',
    instances:1,
    autostart:true,
    script: 'src/app.js',
    watch: false,
    env:{
      NODE_ENV:'development'
    },
    env_production:{
      NODE_ENV:'production'
    }
  }, {
    script: './service-worker/',
    watch: ['./service-worker']
  }],


};

module.exports = {
  apps : [{
    script: 'npm start'
  },

  deploy : {
    production : {
      user : 'lders',
      host : '182.253.47.91',
      ref  : 'origin/main',
      repo : 'https://github.com/Arch-Deus/ld-retail.git',
      path : '/home/lders',
      'pre-deploy-local': '',
      'post-deploy' : 'source ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh_options': 'ForwardAgent=yes'
    }
  }
};

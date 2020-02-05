const ghpages = require("gh-pages")

ghpages.publish('build', {
    branch: 'master',
    repo: 'https://github.com/LiamTormey/clippo-build.git'
}, (e)=>{
    console.log("this is callback haha", e)
});
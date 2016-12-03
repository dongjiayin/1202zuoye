function Animate(name,type){
	this.name=name;
	this.type=type;
}
Animate.prototype.say=function(){
	alert('我是:'+this.name);
}
console.log('这个是script2.js文件');
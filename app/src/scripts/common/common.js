module.exports={
	reader:function(str){
		var body=document.querySelectr('body');
		body.innerHTML=str+body.innerHTML;
	}	
}
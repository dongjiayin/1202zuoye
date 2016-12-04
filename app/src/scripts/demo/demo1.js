// var commonUtil = require('../common/common');
// console.log(commonUtil)

var myApp=angular.module('myApp',[]);
myApp.controller('demoCon',['$scope',function($scope){
	var user=[
		{
			name:'marry',
			email:'marry@163.com'
		},
		{
			name:'doe',
			email:'doe@xinlang.com'
		}
	]
	$scope.user=user;
	$scope.isShow=true;
	$scope.isHide=false;
	$scope.counter=0;
	$scope.add=function(){
		this.counter++;
	}
	$scope.items=[];
	$scope.addItem=function(event){
		if(event.keyCode == '13'){
			this.items.unshift(this.item)
			$scope.item='';
		}
	}
	$scope.books=[
		{
			name:'javaScript高级程序设计',
			publite:true,
			ishas:false,
			updated:1480592321726
		},
		{
			name:'Angular权威指南',
			publite:false,
			ishas:true,
			updated:1480512321336
		},
		{
			name:'Vue实战',
			publite:true,
			ishas:false,
			updated:1480591121726
		},
		{
			name:'Node全栈开发',
			publite:false,
			ishas:true,
			updated:1480521321726
		}
	]
	$scope.price=199.99;
	$scope.friends=[
		{
			name:'maryy',
			phone:'18010172436'
		},
		{
			name:'hello',
			phone:'18023412436'
		},
		{
			name:'dawei',
			phone:'18011234436'
		},
		{
			name:'Doy',
			phone:'18010171234'
		},
		{
			name:'key',
			phone:'18010123436'
		},
		{
			name:'ziex',
			phone:'18010323236'
		}
	]
	$scope.searchText='';
	$scope.search=function(obj){
		if($scope.searchText !=''){
			if(obj.name.toLowerCase().indexOf($scope.searchText.toLowerCase()) !=-1 || obj.phone.toLowerCase().indexOf($scope.searchText.toLowerCase()) !=-1){
				return true;
			}else{
				return false;
			}
		}else{
			return true;
		}
	}
}])
myApp.controller('demo2',['$scope',function($scope){
	$scope.works=[
		{
			first:'Keith',
			last:'jess',
			gen:'Female',
			salary:123335,
			salarys:123335,
			birthday:new Date('2007-07-11')
		},
		{
			first:'FANG',
			last:'vane',
			gen:'Male',
			salary:123335,
			salarys:123335,
			birthday:new Date('2007-07-11')
		},
		{
			first:'SARA',
			last:'rose',
			gen:'Female',
			salary:232342,
			salarys:232342,
			birthday:new Date('1997-02-03')
		},
		{
			first:'AAM',
			last:'hot',
			gen:'Male',
			salary:668805,
			salarys:668805,
			birthday:new Date('1986-03-22')
		},
		{
			first:'MARK',
			last:'bear',
			gen:'Female',
			salary:68000,
			salarys:68000,
			birthday:new Date('1968-03-22')
		}
	]
	$scope.sortColumn='name';
	$scope.sortReverse=false;
	$scope.setSort=function(column){
		$scope.sortColumn = column;
		$scope.sortReverse=$scope.sortColumn==column?!$scope.sortReverse:false;
	}
	$scope.getClass=function(column){
		if($scope.sortColumn==column){
			return $scope.sortReverse?'up':'down';
		}
	}
	$scope.firstText='';
	$scope.lastText='';
	$scope.give=function(obj){
		if($scope.firstText !=''){
			if(obj.first.toLowerCase().indexOf($scope.firstText.toLowerCase()) !=-1 || obj.last.toLowerCase().indexOf($scope.firstText.toLowerCase()) !=-1){
				return true;
			}else{
				return false;
			}
		}else if( $scope.lastText !='' ){
			if(obj.first.toLowerCase().indexOf($scope.lastText.toLowerCase()) !=-1 || obj.last.toLowerCase().indexOf($scope.lastText.toLowerCase()) !=-1){
				return true;
			}else{
				return false;
			}
		}else{
			return true;
		}


	}

}])

/*$.ajax('/mock/liveback.json')
.done(function(data){
	alert(data)
})
.fail(function(){
	alert('失败')
})*/

/*$.when($.ajax('/mock/liveback.json'),$.ajax('/mock/liveback.json'))
.done(function(){
	console.log('成功')
})
.fail(function(){
	console.log('失败')
})
.done(function(){
	console.log('done')
})*/

/*var dfd=$.Deferred();//创建一个新的的反而热点对象
var wait=function(dfd){
	var tast=function(){
		alert('hello');
		dfd.resolve();
	}
	setTimeout(tast,3000)
	return dfd.promise();
}
var d=wait(dfd);
$.when(d)
.done(function(){
	alert('ok')
})
.fail(function(){
	alert('error')
})*/
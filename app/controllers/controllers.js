
/*  Controllers */

var myApp = angular.module('myControllers', []);


myApp.controller('mainCtrl', ['$scope', '$filter', '$timeout',
	function ($scope, $filter, $timeout) {
		
		self = this;
		this.newTodo = {};

    	this.returnDateFromMs = function(ms) {
    		
    	    var options = {
    		    	year: 'numeric',
				    month: 'long',
				    day: 'numeric',
			      	hour: 'numeric',
			   		minute: 'numeric'
			   	};
			//console.log(new Date(+ms));
    		return (new Date(ms)).toLocaleString("en", options)  ;
    				
    	}
		function msInMin(min) {
			return Date.now() + min*60*1000;
		};
		
		self.newTodo.time = self.returnDateFromMs( msInMin(10) );
		

		this.storage = [
				{title: "learn angularjs", time: 1455188633000, priority: {name: "high", id: '1'}, done: false},
				{title: "wake up", time: 1461145633000, priority: {name: "normal", id: '2'}, done: true},
				{title: "write e-mail", time: 1454785633000, priority: {name: "low", id: '3'}, done: false},
				{title: "ride bicycle", time: 1464147633000, priority: {name: "low", id: '3'}, done: true},
				{title: "play football", time: 1454245633000, priority: {name: "normal", id: '2'}, done: false}];

		this.dataPriority = {availableOptions: [
      											{id: '1', name: 'high'},
      											{id: '2', name: 'normal'},
      											{id: '3', name: 'low'}],
    				 		selectedOption: {id: '2', name: 'normal'}
    	};		

    	this.increasePriority = function(priority) {
    		//console.log(priority);
    		
    		priority.id = (priority.id < 3 ) ? ++priority.id : 1;
    		if (priority.name === "high") {
    			priority.name = "normal"
    			} else if (priority.name === "normal") {
    				priority.name = "low" 
    				} else {
    					priority.name = "high"
    				};
    		
    		return priority;
    	}

	    this.remainingItems = function() {
      		var count = 0;
      		angular.forEach(self.storage, function(todo) {
        		count += todo.done ? 0 : 1;
      		});
      		return count;
    	};

    	this.leftItems = function() {
    		return self.storage.length
    	};

    	this.returnTimeLeft = function(ms) {
    		ms - Date.now();
    	}

    	var interval = setInterval(function() {
    		
    		self.timeNow = Date.now();
			//console.log(self.time3);
			
			$scope.$apply();
			
		}, 1000);
		
		
		this.add = function() {
			//console.log(todo.title.length);
			if ( self.newTodo.title !== undefined ) {
				
				self.newTodo.done = false;
				self.newTodo.priority = self.dataPriority.selectedOption;
				
				var date = self.newTodo.time;
				ms = Date.parse(date);
				//console.log(ms, date, typeof(ms));
				self.newTodo.time = ms;

				self.storage.push(self.newTodo);
				//console.log(typeof(self.newTodo.time));
				self.newTodo = {};
				self.newTodo.time = self.returnDateFromMs( msInMin(10) );

				//console.log(self.newTodo.time);
			}
		}

		this.delete = function(ind) {
			self.storage.splice(ind, 1);

		}

		this.options = { m1: null,
					opts : [
						{name: "by priority", val: 'priority.id'}, 
						{name: "by time", val: 'time'},
						{name: "first completed", val: '-done'},
						{name: "first active", val: 'done'}]

				};

		this.sortTasks = function(field) {
      		self.storage = $filter('orderBy')(self.storage, field);
	    };

	    
}]);

myApp.controller('timeController', ['$scope', '$timeout', 
	function($scope, $timeout) {
		timeCtrl = this;
	
		setInterval(function(){
			timeCtrl.timeNow = Date.now();
			$scope.apply;
		}, 1000);
	
		this.timer = function(ms) {
			var difference = ms - timeCtrl.timeNow;
			var t1 = (difference > -5000 && difference < 0) ? " It's time to start!" : "" ;
			var t2 = (difference > 0 && difference < 10000) ? Math.ceil(difference/1000) + " seconds left" : "" ;
			return t1+t2;
		};

		this.left = function(ms) {
			var difference = ms - timeCtrl.timeNow;
			var t1 = (difference > 0 && difference < 60000) ? Math.ceil(difference/1000) + " seconds" : "" ;
			var t2 = (difference > 60000 && difference < 60*60000) ? Math.ceil(difference/1000/60) + " minutes" : "" ;
			var t3 = (difference > 60*60000 && difference < 60*60*60000) ? Math.ceil(difference/1000/60/60) + " hours" : "" ;
			var t4 = (difference > 60*60*60000 && difference <365*60*60*60000) ? Math.ceil(difference/1000/60/60/24) + " days" : "" ;
			var t5 = (difference > 365*60*60*60000) ? "not so far" : "";
			return t1+t2+t3+t4+t5;
		}
	
}])


var appId="commentzxdsa";
var key="O+8b8H1/AGTC2eLh1GzXjw==";
var obj;
			
//Initializing CloudBoost App
CB.CloudApp.init(appId,key,{
	success: function(){
	
		//start listening to create event i.e. if there is new data in cmmnt table it will return an object 'cloudObj'of cmmnt table
		CB.CloudObject.on('cmmnt','created',function(cloudObj){
		
			//appending new data using 'cloudObj' 
			$("#commentlist").append("<p class='bg-info'><strong>"+cloudObj.get('name')+"</strong><br/>"+cloudObj.get('text')+"</p>");
			
		},
		{
			success : function(){ 
				console.log("CloudNotification.on executed");
			},
			error : function(err){
				console.log("error in CloudNotification.on");
			} 
		}); 
					
		//creating an object for cmmnt table 
		obj = new CB.CloudObject("cmmnt");
	
		//creating a query
		var query = new CB.CloudQuery("cmmnt"); 
		//fetching all data from table 'cmmnt'
		query.find({ 
			//query will return a list of objects.
			success: function(list){ 
				//extracting and appending data into html page from list of objects
				for (i = 0; i < list.length; i++) { 
					$("#commentlist").append("<p class='bg-info'><strong>"+list[i].get('name')+"</strong><br/>"+list[i].get('text')+"</p>");
				}	
			},
			error: function(err){ 
				console.log("error while executing query");
			} 
		});
					
					
	},
	error: function(response){
		console.log("failed to initialize cloudboost app");
	}
});
			
//saving comments submitted by the users to cmmnt table			
$("#commentForm").submit(function() {
		
	obj.set("name", $("#name").val());
	obj.set("text",$("#comment").val());
	//inserting record into cmmnt
	obj.save({ 
		success: function(obj) { 
		console.log('comment saved');
		},
		error: function(err) { 
			console.log("oops!! a problem occured while saving your comment.. please try again.");
		}
	});
	return false;
});
			
			
			 
			
			

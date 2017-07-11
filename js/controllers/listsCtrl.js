app.controller ('listsCtrl', function (listFactory, $http) {
	/*this.lists = listFactory.getLists ();

	this.addList = function () {
		listFactory.addList(this.listName);
		this.listName = '';
	}*/

	var self = this;
	$http.get ('http://localhost:3000/lists').success (function () {
		self.lists = listFactory.getLists ();
	});

	this.addList = function () {
		var uniq = _.uniqueId(Date.now());
		listFactory.addList(this.listName, uniq);
		this.lists.push ({"id": uniq, "listName": this.listName});
		this.listName = '';
	}
});
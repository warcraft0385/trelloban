app.factory ('listFactory', function ($http, cardFactory) {
	var service = {};

	/*var lists = [
	{
		id: 1,
		listName: 'Todo'
	},
    {
    	id: 2,
    	listName: 'Doing'
    },
    {
    	id: 3,
    	listName: 'Done'
    }
    ];

    service.getLists = function () {
    	return lists;
    }

    service.addList = function (listName) {
        lists.push({id: _.uniqueId('list_'), listName: listName});
    }

    service.removeList = function (list) {
        _.pull(lists, list);
    }*/

    $http.get ('http://localhost:3000/lists').success (function (result) {
        service.getLists = function () {
            return result;
        }

        service.removeList = function (list) {
            _.pull(result, list);
            $http.delete('http://localhost:3000/listDelete/'+list.id).success(function () {});
        }
    });

    service.addList = function (listName, id) {
        var listName = {id: id, "listName": listName};
        $http.post('http://localhost:3000/lists', listName).success(function () {});
    }

    return service;
});
app.controller ('listCtrl', function (listFactory, cardFactory, $http) {
	/*this.removeList = function (list) {
		listFactory.removeList (list);
	}

	this.getCards = function (list) {
		return cardFactory.getCards(list);
	}

	this.createCard = function (list) {
		cardFactory.createCard (list, this.cardDescription);
		this.cardDescription = '';
	}*/

	this.removeList = function (list) {
		listFactory.removeList (list);
	}

	var self = this;
	$http.get ('http://localhost:3000/cards').success (function (result) {
		self.getCards = function (list) {
			return cardFactory.getCards(list);
		}

		self.cards = result;
	});

	this.createCard = function (list) {
		var uniq = _.uniqueId(Date.now());
		cardFactory.createCard (uniq, list, this.cardDescription);
		this.cards.push ({"id": uniq, "description": this.cardDescription, "list_id": list.id});
		this.cardDescription = '';
	}
});
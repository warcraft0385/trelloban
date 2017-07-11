app.factory ('cardFactory', function ($http) {
	var service = {};

	/*var cards = [
	{
		id: 1,
		description: 'Fix bug in player',
		list_id: 1
	},
	{
		id: 2,
		description: 'Add feature with D3',
		list_id: 2
	},
	{
		id: 3,
		description: 'Learn AngularJS',
		list_id: 3
	}
	];

	service.getCards = function (list) {
		return _.filter (cards, {list_id: list.id});
	}

	service.createCard = function (list, cardDescription) {
		cards.push({id: _.uniqueId('card_'), description: cardDescription, list_id: list.id});
	}

	service.deleteCard = function (card) {
		return _.pull (cards, card);
	}

	service.updateCard = function (updatingCard) {
		var card = _.findWhere (cards, {id: updatingCard.id});
		card.description = updatingCard.description;
		card.list_id = updatingCard.list_id;
	}*/

	$http.get ('http://localhost:3000/cards').success (function (result) {
		service.getCards = function (list) {
			return _.filter (result, {list_id: list.id});
		}

		service.createCard = function (uniq, list, cardDescription) {
			result.push({id: uniq, description: cardDescription, list_id: list.id});

			var cardList = {id: uniq, description: cardDescription, list_id: list.id};
			$http.post('http://localhost:3000/cards', cardList).success(function () {});
		}

		service.deleteCard = function (card) {
			$http.delete('http://localhost:3000/cardDelete/'+card.id).success(function () {});
			return _.pull (result, card);
		}

		service.updateCard = function (updatingCard) {
			var card = _.findWhere (result, {id: updatingCard.id});
			card.description = updatingCard.description;
			card.list_id = updatingCard.list_id;
		
			var cardDesc = {description: updatingCard.description, list_id: updatingCard.list_id};
			$http.put('http://localhost:3000/cards/'+updatingCard.id, cardDesc).success(function () {});
		}
	});

	return service;
});
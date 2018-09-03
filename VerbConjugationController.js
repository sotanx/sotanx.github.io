(function () {
	'use strict';

	angular
	.module('app')
	.controller('VerbConjugationController', VerbConjugationController);

	VerbConjugationController.$inject = ['$rootScope', '$scope', '$modalInstance', '$modal', 'verb', 'tenses'];

	function VerbConjugationController($rootScope, $scope, $modalInstance, $modal, verb, tenses) {
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Fields 
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		$scope.verb = verb;
		$scope.tenses = tenses;

		$scope.conjugations = [];

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};

		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Initialization code
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		$scope.tenses.forEach(function (tense) {
			var display = {};

			display.name = tense.name;
			display.tenseData = [];
			display.tenseData.push("yo " + verb[tense.tag].yo[0]);
			display.tenseData.push("tu " + verb[tense.tag].tu[0]);
			display.tenseData.push("el/ella/usted " + verb[tense.tag].el[0]);
			display.tenseData.push("nosotros " + verb[tense.tag].ns[0]);
			display.tenseData.push("vosotros " + verb[tense.tag].vs[0]);
			display.tenseData.push("ellos/ellas/ustedes " + verb[tense.tag].ellos[0]);

			$scope.conjugations.push(display);
		});
	}
})();
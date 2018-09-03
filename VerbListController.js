(function () {
	'use strict';

	angular
	.module('app')
	.controller('VerbListController', VerbListController);

	VerbListController.$inject = ['$rootScope', '$scope', '$modalInstance', '$modal', 'verbs'];

	function VerbListController($rootScope, $scope, $modalInstance, $modal, verbs) {
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Fields 
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		$scope.filterVerb = "";
		$scope.verbs = verbs;

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};

		$scope.customFilter = function(item) {
			if ((item.inf.toLowerCase().indexOf($scope.filterVerb.toLowerCase()) != -1) || (item.inf_eng.toLowerCase().indexOf($scope.filterVerb.toLowerCase()) != -1)){
				return true;
			}
			return false;
		}

		$scope.showConjugation = function (verb) {
			var instance = $modal.open({
				templateUrl: 'VerbConjugation.html',
				controller: 'VerbConjugationController',
				scope: $scope,
				resolve: {
					verb: function () {
						return verb;
					},
					tenses: function () {
						return $scope.$parent.optionsTenseMenu;
					}
				}
			})
		}

		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Initialization code
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	}
})();
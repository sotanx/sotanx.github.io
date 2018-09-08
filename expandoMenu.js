angular
  .module('expando-menu-item', [])
  .directive('expandoMenuItem', expandoMenuItem);

angular
  .module('expando-menu', [])
  .directive('expandoMenu', expandoMenu);

function expandoMenu() {
  return {
    restrict: 'E',
    templateUrl: 'expando-menu.html',
    controller: ['$scope', function expandoMenuCtrl($scope) {
		$scope.isShowingMenu = true;
		$scope.closeMenu = function () {
			$scope.isShowingMenu = true;
		}
		$scope.openMenu = function () {
			$scope.isShowingMenu = false;
		}
    }],
    transclude: true,
    scope: {
    },
  };
}

function expandoMenuItem() {
  return {
    restrict: 'E',
    templateUrl: 'expando-menu-item.html',
    controller: ['$scope', function expandoMenuItemCtrl($scope) {
      $scope.isActive = true;
    }],
    transclude: true,
    scope: {
       title: '@',
       width: '@'
    },
  };
}

angular
  .module('expando-menu')
  .run(['$templateCache', function($templateCache) {
    $templateCache.put("expando-menu.html", [
		'<div>',
      '  <a class="expando-menu-button" ng-click="openMenu()" ng-show="isShowingMenu"></a>',
      '  <div class="expando-menu-content" ng-class="{active: !isShowingMenu}" ng-show="!isShowingMenu">',
      '    <a class="expando-menu-close-button" ng-click="closeMenu()"></a>',
      '    <table class="table" width="100%" height="95%" fixed-header>',
      '      <tbody ng-transclude>',
      '      </tbody>',
      '    </table>',        
      '  </div>',
      '</div>',
      '<div class="expando-backdrop" ng-class="{active: !isShowingMenu}" ng-click="closeMenu()"></div>'     
    ].join(''))
  }]);

angular
  .module('expando-menu-item')
  .run(['$templateCache', function($templateCache) {
    $templateCache.put("expando-menu-item.html", [
      '<div class="expandcollapse-item">',
      ' <div ng-click="isActive = !isActive" ng-class="{\'expandcollapse-heading-collapsed\': isActive, \'expandcollapse-heading-expanded\': !isActive}">',
      '   <p><label style="width: {{width}}">{{title}}</label><i class="arrow up" ng-hide="isActive"></i><i class="arrow down" ng-hide="!isActive"></i></p>',
      ' </div>',
      ' <div class="slideDown" ng-hide="isActive">',
      '   <div class="expand-collapse-content">',
      '     <tr>',
      '       <td>',
      '         <ng-transclude></ng-transclude>',
      '       </td>',
      '     </tr>',
      '  </div>',
      ' </div>',
      '</div>',     
    ].join(''))
  }]);
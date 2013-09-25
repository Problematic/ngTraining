(function (angular) {
    angular.module('TodontApp', [])
        .controller('MainCtrl', function ($scope) {
            var todonts = [];
            for (var i = 0; i < 10; i++) {
                todonts.push({ name: 'Todont ' + i, complete: false});
            }
            $scope.todos = todonts;
        })
        .value('foo', 5)
        .controller('OtherCtrl', function ($scope, foo) {
            console.log(foo);
            $scope.todos = [{
                name: 'foo',
                complete: true
            }];
        })
        .directive('todoList', function () {
            return {
                templateUrl: 'templates/todoList.html',
                replace: true,
                transclude: false,
                restrict: 'EA',
                controller: ['$scope', function ($scope) {
                    $scope.todoCount = 0;
                    $scope.$watchCollection('todos', function (todos) {
                        $scope.todoCount = todos.length;
                    });

                    var baseForm = {
                        name: '',
                        complete: false
                    };
                    $scope.form = angular.copy(baseForm);

                    $scope.createTodo = function () {
                        $scope.todos.push($scope.form);
                        $scope.form = angular.copy(baseForm);
                    };

                    $scope.rmTodo = function (todo) {
                        $scope.todos.splice($scope.todos.indexOf(todo), 1);
                    };
                }],
                link: function (scope, element, attrs, ctrl) {}
            };
        });
}(angular));

var angular = angular.module('my_app', ['ngRoute']);
angular.controller("my_control", ["$scope", "$http", "$routeParams", "countries", function (scope, http, routeParams, countries) {
    const url = "https://raw.githubusercontent.com/curran/screencasts/gh-pages/introToAngular/examples/snapshots/snapshot45/country_" + routeParams.id + ".json"

    scope.name = "hello gilbert";
    scope.country = "";

    console.log(routeParams)
    scope.param = routeParams;


    countries.list(function (responseSuccess) {

        scope.country = responseSuccess;

        // console.log(scope.countries)
    }, url)

}])

angular.controller("my_country", ["$scope", "$http", "countries", function (scope, http, countries) {
    scope.countries = "";
    const URL = "https://raw.githubusercontent.com/curran/screencasts/gh-pages/introToAngular/examples/snapshots/snapshot45/countries.json"

    countries.list(function (responseSuccess) {

        scope.countries = responseSuccess;
    }, URL)


}])


angular.factory("countries", ["$http", function (http) {

    function getData(callBack, URL) {
        // var cachedData = null;
        // if (cachedData) {
        //     callBack(cachedData);
        // } else {
        //     http.get(URL).then(function (responseSuccess) {
        //         cachedData = responseSuccess.data;
        //         callBack(cachedData);
        //     })
        // }

        http({
            method: 'GET',
            url: URL,
            cache: true
        }).then(function (responseSuccess) {
            var cachedData = responseSuccess.data;
            callBack(cachedData);
        })
    }

    return {
        list: function (callback, url) {
            getData(callback, url)
        },
        find: function (id, callback) {
            const url = "https://raw.githubusercontent.com/curran/screencasts/gh-pages/introToAngular/examples/snapshots/snapshot45/country_" + id + ".json"

            getData(function (data) {


                callback(data);

            },url)

        }
    }
}])

angular.config(function ($routeProvider, $locationProvider) {
    $routeProvider


        .when('/:id', {
            templateUrl: 'hello.html',
            controller: 'my_control'
        })


    // configure html5 to get links working on jsfiddle
//        $locationProvider.html5Mode(true);
});

angular.filter("space", function () {
    return window.encodeURI;
})


angular.directive("country", function () {
    return {
        restrict: 'A',
        template: '<a href="#/{{country.id |space}}"><img ng-src="{{flagURL}}" alt="" width="50">{{flagUrl}}{{country.name}}</a>',

        controller: function ($scope, countries) {
            $scope.flagURL = "";

           console.log($scope.country.id)
            countries.find($scope.country.id, function (country) {
                $scope.flagURL = country.flagURL

            })

        }
    }


})
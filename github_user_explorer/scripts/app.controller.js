app.controller("UserController", function($scope, $http) {
    $scope.users = [];
    $scope.searchUser = function() {
        if($scope.SearchForm.$valid) {
            var query = $scope.search_query;
            var existing = $scope.users.filter(function(user) {
                return user.login === query;
            });
            if(existing.length == 0) {
                $http({
                    url: "https://api.github.com/users/"+query.toLowerCase(),
                    method: "GET",
                })
                .then(function success(response) {
                        $scope.users.push(response.data);
                        console.dir(response.data);
                        $scope.search_query = '';
                    },
                    function failure(response) {
                        if(response.data.hasOwnProperty("message")) {
                            alert(response.data.message);
                        }
                        else {
                            console.dir(response.data);
                            alert("Error: Unable to connect, please try again");
                        }
                    }
                );
            }
        }
        else {
            console.log("User already exists in results");
        }
    };
    $scope.clearAll = function() {
        $scope.users = [];
    };
    $scope.navigate = function(userObj) {
        window.open(userObj.html_url, '_blank');
    }
});
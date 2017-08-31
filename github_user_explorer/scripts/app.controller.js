app.controller("UserController", function($scope, $http) {
    $scope.users = [];
    $scope.sortOrder = 'id';

    $scope.searchUser = function() {
        if($scope.SearchForm.$valid) {
            var query = $scope.search_query;
            $scope.addUser(query);
        }
    };

    $scope.clearAll = function() {
        $scope.users = [];
    };

    $scope.navigate = function(userObj) {
        window.open(userObj.html_url, '_blank');
    };
    
    $scope.getFollowerData = function(userObj) {

        var index = $scope.getIndex(userObj);
        if(index != null) {
            // check if already loaded
            if($scope.users[index].hasOwnProperty('follower_list') === false) {
                console.log("Getting follower data");
                $http({
                    url: $scope.users[index].followers_url,
                    method: "GET"
                })
                .then(function success(response) {
                    
                    $scope.users[index].follower_list = response.data;
                    
                    //debug
                    console.log("Success");
                    console.dir($scope.users[index]);

                }, function failure(response) {
                    console.log("Failure");
                    console.dir(response.data);
                });
            }
            $scope.toggleExpand(index);
        }
    };
    
    $scope.toggleExpand = function(index) {
        if(index < $scope.users.length)
            $scope.users[index].isExpanded = !$scope.users[i].isExpanded;
    };

    // return whether a user exists 
    $scope.userExists = function(login) {
        var exists = false;
        angular.forEach($scope.users, function(userObj) {
            if(userObj.login === login) {
                exists = true;
                return;
            }
        });
        console.log("User " + login + (exists ? "exists" : "doesn't exist") + "in list");
        return exists;
    };

    $scope.addUser = function(login) {
        var requestSuccess = false;
        if(!$scope.userExists(login)) {
            $http({
                url: "https://api.github.com/users/"+login.toLowerCase(),
                method: "GET",
            })
            .then(function success(response) {
                    $x = $scope.users.push(response.data);
                    $scope.users[$x-1].isExpanded = false;
                    console.dir(response.data);
                    requestSuccess = true;
                    if($scope.search_query === login)
                        $scope.search_query = "";
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
        else {
            console.log("User already exists in results");
        }
        return requestSuccess;
    };

    $scope.updateSort = function() {
        $scope.sortOrder = $scope.sort_order;
    };

    $scope.getIndex = function(userObj) {
        for(i=0; i<$scope.users.length; i++) {
            if($scope.users[i].hasOwnProperty('id') && $scope.users[i].id === userObj.id) {
                return i;
            }
        }
        return null;    // if not found 
    };
});
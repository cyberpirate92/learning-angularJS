var app = angular.module("SampleApp", []);
app.controller("SampleController", function($scope) {
    $scope.products = [];
    $scope.total_price = 0;
    $scope.maximum_price = 0;
    $scope.minimum_price = 0;
    $scope.average_price = 0;
    $scope.categories = [];

    $scope.addProduct = function() {
        if($scope.ProductAdditionForm.$valid) {
            $scope.products.push({
                name: $scope.product.name,
                price: $scope.product.price,
                category: $scope.product.category,
            });
            var product = $scope.product;
            if($scope.products.length == 1) {
                $scope.maximum_price = product.price;
                $scope.minimum_price = product.price;
                $scope.total_price = product.price;
                $scope.average_price = product.price;
            }
            else {
                if(product.price > $scope.maximum_price)
                    $scope.maximum_price = product.price;
                if(product.price < $scope.minimum_price)
                    $scope.minimum_price = product.price;
                $scope.updateTotal();
            }
            if($scope.categories.indexOf(product.category.toLowerCase()) == -1)
                $scope.categories.push(product.category.toLowerCase());
            
            $scope.product = {};
            document.getElementById("product_name").focus();
        }
        else {
            alert("Please provide all the details");
        }
    };
    $scope.clearProducts = function() {
        $scope.products = [];
        $scope.updateTotal();
    };
    $scope.updateTotal = function() {
        $scope.total_price = 0;
        angular.forEach($scope.products, function(product) {
            if(!isNaN(parseInt(product.price)))
                $scope.total_price += parseInt(product.price);
            else
                console.log(product.price + "is not a valid price");
        });
        $scope.average_price = $scope.total_price / $scope.products.length;
        console.log("Total: " + $scope.total_price);
    };
});
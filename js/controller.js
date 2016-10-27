angular.module('myApp')
.controller('homeController', function($scope, foodService){
    var random = Math.floor(Math.random() * (30 - 1) + 1);
    var recipeID= "";
    foodService.getRandom()
    .then(function(response){
        $scope.recipeTitle = response.data[random].title;
        $scope.recipeImg = response.data[random].image_url;
        recipeID += response.data[random].url_details;
        $scope.getID();
    });
    $scope.getID = function() { 
        foodService.getDescription(recipeID)
        .then(function(response){
            console.log(response);
            $scope.recipeDescription=response.data.recipe.description_text;
        });
    }
    $scope.expand=function(e){
        e.preventDefault();
    }

})
.controller('searchController', function($scope,$rootScope,foodService, $location){
    $scope.getRecipe=function(e){
        e.preventDefault();
        foodService.getNavSearch($scope.foodQuery)
        .then(function (response){
            console.log(response);
            $rootScope.recipes=response.data;
            console.log(response);
        })
        $location.path("/search")
    }
})
.controller('searchResults', function($scope,$rootScope,foodService){
    //console.log($rootScope.recipes[0])
    $scope.url_details = function( recipeUrl ){
        console.log(recipeUrl)
        foodService.getDescription(recipeUrl)
            .then(function (response){
                console.log(response);
            })
            $location.path("/detail")
    }
})
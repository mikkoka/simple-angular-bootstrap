MyApp.service("ApiService", function() {

  this.syncMethod = function() {
    return 0;
  }

  this.getThings = function() {
    return $http.get("/thing")
      .then(function (response) {
        return response.data;
      })
      .catch(function (err) {
        console.error("Error ApiService getThings ", err);
        return {};
      })
  }

})
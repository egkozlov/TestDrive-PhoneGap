$('#colloteral-load-btn').click(function(){
    loadColloteral();
});


function loadColloteral(){
    //TODO change find call
    var query = new Kinvey.Query();
    query.equalTo('mimeType','application/pdf');
    var promise = Kinvey.File.find(query);
    promise.then(function(files) {
        $scope.collaterals = files;
    }, function(err) {
        console.log("fetch collaterals error " + JSON.stringify(err));
        alert("Error: " + err.description);
    });
    promise.then(function(entities) {
        var colloteralList = $('#colloteral-list');
        colloteralList.empty();
        $.each(entities, function(i, row) {
            //colloteralList.append('<li data-id="' + row._id + '"><a href="#" onclick="window.open(/"' + row._downloadURL + '/",/"system/")">' + '<h3>' + row._filename + '</h3></li>');
            colloteralList.append('<li data-id="' + row._id + '"><a href="#" onclick="window.open(\'' + row._downloadURL +  '\', \'_system\');">' + '<h3>' + row._filename + '</h3></li>');
        });
        colloteralList.listview('refresh');
    }, function(err) {
        alert("Error: " + err.description);
        console.log("fetch partners error " + JSON.stringify(err));
    });
}
//<a href="#" onclick="window.open(" https:="" storage.googleapis.com="" 6b873645dacc4141a0d1540deeb323f8="" d294331d-e102-4c2e-bc1c-4bf11fc8e7e7="" test.pdf?googleaccessid="558440376631@developer.gserviceaccount.com&amp;Expires=1455550952&amp;Signature=DQ3ztQubqpcy2%2FPm6j7v6wWtVP9Ea%2BtN%2Fi7gw8mpw7j8Ai0AszuzkmUAwMJzrT%2FaCI4Lw%2B7wSwFd8kJRo7ATcDu%2FFRENaH7dQ3FV7u4TrLq1NIYMkdT5KudxBSo1VomGZWB3WVlJNHkCqXUJiUDYaD17uf2uFVXfy7XhbCZq2%2F4%3D&quot;,&quot;system&quot;);" class="ui-btn ui-btn-icon-right ui-icon-carat-r"><h3>test.pdf</h3></a>
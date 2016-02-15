$('#partners-load-btn').click(function(){
    loadPartners();
});


function loadPartners(query){
    //TODO change find call
    var promise = Kinvey.DataStore.find('partner', query);
    promise.then(function(entities) {
        var partnersList = $('#partners-list');
        partnersList.empty();
        $.each(entities, function(i, row) {
            partnersList.append('<li data-id="' + row._id + '"><a>' + '<h3>' + row.partnername + '</h3> ' +'<p>' + row.partnercompany + '</p>' + '</li>');
        });
        partnersList.listview('refresh');
    }, function(err) {
        alert("Error: " + err.description);
        console.log("fetch partners error " + JSON.stringify(err));
    });
}
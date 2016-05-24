QUnit.module("SoundCloud API", function() {
    test("SoundCloud Connection Test", function(assert) {
      expect(1);
      var done = timeout(assert, 5000, "Failed to connect in time");

      SC.initialize({
        client_id: 'be794de545fbcbe06a2445d38e7b408a'
      });

      var track_url = 'http://soundcloud.com/forss/flickermood';
      SC.oEmbed(track_url, { auto_play: false }).then(function(oEmbed) {
        ok(oEmbed !== "undefined", "Connection to SoundCloud is successful");
        done();
      });
    });
});

// Assert async test with timeout functionality
function timeout(assert,to,error){
  var done = assert.async();
  var a = setTimeout(function(){
    assert.equal(to,undefined,error);
    done();
  },to);
  return function(){
    done();
    clearTimeout(a);
  };
}

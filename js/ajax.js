var apiUrl='http://dsgurukul.org/ugitouch/app.php';
var saveContactsUrl = 'http://ugi.ac.in/ugitouch/savecontacts.php';
var isOnline=false;

function arrToString(arr)
{

	var str='';
	var strArr=[];
	for(var obj in arr)
	{
		strA=obj+'='+arr[obj];
		strArr.push(strA);
		
	}
	str=strArr.join("&");


	return str;
}

function apiCall(method,postddata)
{
	var params;
	
	params = arrToString(postddata);
	
	$.ajaxSetup({timeout: 45*1000});
	
	var uri = apiUrl+'?method='+method+'&'+params;
	
	console.log(uri);
	
	$.getJSON(uri,function(data)
			{
								
				console.log(data);
				
				switch(method)
				{
					case 'prospectus':
					
					if(data.result=='yes')
					{
						app.showAlert('Please Check, Prospectus Sent to Your Email');
						$("#prospectus_form")[0].reset()
                        $('#prospectus_btn').val('Submit').attr('disabled',false);						
					}					
					else
					{
						app.showAlert('Please Try Again');
						$('#prospectus_btn').val('Submit').attr('disabled',false);		
					}			        
					
					break;    

                    case 'contact':
					
					if(data.result=='yes')
					{
						app.showAlert('Your Query Submitted Succesfully, We will Contact you soon');
						$("#contact_form")[0].reset()
                        $('#contact_btn').val('Submit').attr('disabled',false);		
					}					
					else
					{
						app.showAlert('Please Try Again');
						$('#contact_btn').val('Submit').attr('disabled',false);
					}			        
					
					break;
					
					case 'enquiry':
					
					if(data.result=='yes')
					{
						app.showAlert('We have Received Your Query, We will Contact you soon');
						$("#enquiry_form")[0].reset()
                        $('#enquiry_btn').val('Submit').attr('disabled',false);		
					}					
					else
					{
						app.showAlert('Please Try Again');
						$('#enquiry_btn').val('Submit').attr('disabled',false);
					}			        
					
					break;
					
					
					case 'login_via_otp':
					
					if(data.result=='yes')
					{
						app.showAlert('OTP has sent to Your Mobile', 'UGI Touch');
						//$("#enquiry_form")[0].reset();
						$('#enter_mobile').hide(3000);
						$('#enter_otp').show(5000);
                        $('#login-with-otp-btn').val('Submit').attr('disabled',false);		
					}					
					else
					{
						app.showAlert('Please Try Again');
						$('#login-with-otp-btn').val('Submit').attr('disabled',false);
					}			        
					
					break;
					
					
					case 'check_otp':
					
					if(data.result=='yes')
					{
						//app.showAlert('Your Mobile No. is Verified', 'Congrats!!');
						
						$('body').html(new HomeView(self.store).render(HomeView.template).el);
						
						var user = JSON.parse(window.localStorage.getItem("userdetail"));
						
						var userdetail = {'user_phone': user.user_phone, 'user_status':'PhoneVerified'};
						
						window.localStorage.setItem("userdetail", JSON.stringify(userdetail));
						
						var data = {'method': 'updateUserPhone', 'device_uuid': device.uuid, 'user_phone': user.user_phone, 'user_status': 'PhoneVerified'};
						
						sendUserData(data);
							
					}					
					else
					{
						app.showAlert('OTP is Invalid or Expired After 5 Minutes !!', 'Invalid OTP');
						
						$('#check_otp').val('Submit').attr('disabled',false);
					}			        
					
					break;
				}
               

			})
			.fail(function( jqxhr, textStatus, error )
			{
			  
			  var err = textStatus + ", " + error ;
			  
			  console.log( "Request Failed: " + err + '--' +jqxhr.responseText + jqxhr.getAllResponseHeaders());
			  
			  //$('#login').text('Login').attr('disabled',false);
			  
			  app.showAlert("Application is Off-Line at the moment", "UGI Touch");

		    });

}

function sendUserData(datas)
{
	
   console.log(datas);
	
   $.ajax(
   {
	   url: saveContactsUrl,
	   
	   data: datas,

       dataType: 'json',	   
	   
	   type: 'POST',
	   
	   success: function(res)
	   {
		  console.log(res);
	   },
	   
	   error: function(error)
	   {
		  console.log(error);
	   }
	   
   });	
}


function scroll2Top()
{
	
		$('body').animate({ scrollTop: 0 }, "slow","linear", function()
		{
		     //console.log("scrolling  done");
		});      
		
}

function deviceIDGenerate()
{
    var devID = window.localStorage.getItem("BTappDeviceID");
	
	if($.isEmptyObject(devID))
	{
		d = new Date();
		
		var gID = d.getMonth()+1+'/'+d.getDate()+'/'+d.getFullYear()+' '+d.getHours() +':'+ d.getMinutes() +':'+ d.getSeconds()+' '+makeid();

		window.localStorage.setItem("BTappDeviceID",gID );
	};


	return  window.localStorage.getItem("BTappDeviceID");
}

function openBrowser()
{
	var ref = window.open('http://ugi.ac.in/paymentgateway.php', '_blank', 'location=yes');
}
var HomeView = function() {

    this.initialize = function() {
		home=this;

        // Define a div wrapper for the view. The div wrapper is used to attach events.
		 this.el = $('<div/>');
		 this.el.on('click', '.back', this.backlist);
		 //this.el.on('click', '#login', this.showList);
		 this.el.on('click', '#login-with-otp-btn', this.login_otp_btn);
 		 this.el.on('click', '#about', this.about);
		 this.el.on('click', '#institute', this.institute);
		 this.el.on('click', '#courses', this.courses);
		 this.el.on('click', '#enquiry', this.enquiry);
		 this.el.on('click', '#contact', this.contact);
		 this.el.on('click', '#achievements', this.achievements);
		 this.el.on('click', '#infra', this.infra);
		 this.el.on('click', '#admission', this.admission);
		 this.el.on('click', '#scholarship', this.scholarship);
		 this.el.on('click', '#placement', this.placement);
		 this.el.on('click', '#prospectus', this.prospectus);
		 this.el.on('click', '#prospectus_btn', this.prospectus_btn);
		 this.el.on('click', '#contact_btn', this.contact_btn);
		 this.el.on('click', '#enquiry_btn', this.enquiry_btn);
		 this.el.on('click', '#student_login', this.student_login);
		 this.el.on('click', '#quiz', this.quiz);
		 this.el.on('click', '#events', this.events);
		 this.el.on('click', '#gallery', this.gallery);
		 this.el.on('click', '#check_otp', this.check_otp);
		 this.el.on('click', '#video_gallery', this.video_gallery);
		 this.el.on('click', '#uniqe_ugi', this.uniqe_ugi);
		};
		
		
	this.uniqe_ugi = function()
	{
		
		$('body').html(new HomeView(self.store).render(HomeView.uniqe_ugi_tpl).el);
		
		$(".wrapper").css( { 'min-height': $(window).height() }, { queue: false, duration: 800 });
		
		return false;
		
	};
	
	this.video_gallery = function()
	{
		$('body').html(new HomeView(self.store).render(HomeView.video_gallery_tpl).el);
		
		$(".wrapper1").css( { 'min-height': $(window).height() }, { queue: false, duration: 800 });
		
		$('.row iframe').css('width', $('.row').width());
		
		$('.row iframe').css('height', '300px');
		
		$('#first_video').load(function(){
			
			$('#loadingMessage').css('display', 'none');
			
			$('#ugi_videos').show();
			
		});
		
		$("html, body").animate({ scrollTop: 0 }, 3000);
		
		return false;
		
	};
	
	this.check_otp = function()
	{
		
		var otp = $('#otp_data').val().trim();	
		
		if(!otp)
		{
			app.showAlert('Please Enter OTP Received on Your Mobile!!','Enter OTP!!');
			
			$('#otp_data').focus();
			
			return false;
		}
		
		var data = {'otp': otp};
		
		apiCall('check_otp',data);
		
		$('#check_otp').val('Checking OTP!!....').attr('disabled',true);
		
		return false;
	};
	
	this.login_otp_btn = function()
	{
		
		var phone_no = $('#phone_no').val().trim();	
		
		var regex = /^[789]\d{9}$/;
		
		var res = regex.test(phone_no);
		
		//swal.close();

        if(!phone_no)
		{
			app.showAlert('Please Enter Your Mobile No. Without 0 and 91', 'Enter Your Mobile No.');
			//swal('Enter Your Mobile No.',  'Mobile No. Should be Without 0 and 91',  'error');
			
			 /*
			
			 swal({
			  title: 'Enter Your Mobile No.',
			  text: 'Mobile No. Should be Without 0 and 91',
			  type: 'error',
			  allowOutsideClick: false,
			  allowEscapeKey: false
		    }).then(function ()
			{	
			   console.log('clicked on ok btn');
			   
			   jQuery('#phone_no').focus();
			},				
			function (dismiss)
			{
				// dismiss can be 'cancel', 'overlay',
				// 'close', and 'timer'
				console.log(dismiss);
				
                jQuery('#phone_no').focus();				
				
			});
			
			*/
            
			$('#phone_no').focus();			
			
			return false;
		}
		
		if(!res)
		{
			app.showAlert('Please Enter Valid Mobile No. Without 0 and 91', 'Enter Valid Mobile No.');
            
			/*
            swal({
			  title: 'Please Enter Valid Mobile No.',
			  text: 'Mobile No. Should be Without 0 and 91',
			  type: 'error',
			  allowOutsideClick: false,
			  allowEscapeKey: false
		    }).then(function ()
			{	
			   console.log('clicked on ok btn');
			   
			   jQuery('#phone_no').focus();
			},				
			function (dismiss)
			{
				// dismiss can be 'cancel', 'overlay',
				// 'close', and 'timer'
				console.log(dismiss);
				
                jQuery('#phone_no').focus();				
				
			});
			
			*/
			
			jQuery('#phone_no').focus();
			
			return false;
		}
		
		var data = {'mobile_no': phone_no};
		
		var user_detail = {'user_phone': phone_no, 'user_status': 'Not Verified'};
		
		window.localStorage.setItem("userdetail", JSON.stringify(user_detail));
		
		apiCall('login_via_otp',data);
		
		$('#login-with-otp-btn').val('Sending OTP....').attr('disabled',true);
		
		/*
		swal({
		  title: '<b>Sending An OTP to Your Mobile!!</b>',
		  text: 'Please Wait.....',
		  allowOutsideClick: false,
		  allowEscapeKey: false,
		  onOpen: function () {   swal.showLoading(); }
		});
		*/
		
		return false;
	};
	
	this.gallery = function()
	{
		
		//app.showAlert('Coming Soon.....', 'UGI Touch');
		
		$('body').html(new HomeView(self.store).render(HomeView.gallery_tpl).el);
		
		$(".wrapper1").css( { 'min-height': $(window).height() }, { queue: false, duration: 800 });
		
		$('.row a img').css('width', $('.row').width());
		
		$("html, body").animate({ scrollTop: 0 }, 3000);
		
		return false;
		
	};
	
	this.events = function()
	{
		
		app.showAlert('Coming Soon.....', 'UGI Touch');
		
		return false;
		
	};
	
	this.quiz = function()
	{
		
		app.showAlert('Coming Soon.....', 'UGI Touch');
		
		return false;
		
	};
	
	this.student_login = function()
	{
		
		app.showAlert('Coming Soon.....', 'UGI Touch');
		
		return false;
		
	};
	
	this.enquiry_btn= function()
	{
		
		var name = $('#name').val();
		
		var phone = $('#phone').val();
		
		var email = $('#email').val();
		
		var course = $('#course').val();
		
		var message = $('#message').val();	

        if(!name)
		{
			app.showAlert('Please Enter Your Name');
            $('#name').focus();			
			return false;
		}
		
		if(!phone)
		{
			app.showAlert('Please Enter Your Phone');
            $('#phone').focus();			
			return false;
		}
		
		if(!email)
		{
			app.showAlert('Please Enter Your Email');
            $('#email').focus();			
			return false;
		}
		
		if(!message)
		{
			app.showAlert('Please Enter Your Message');
            $('#message').focus();			
			return false;
		}		
		
		var data = {'name':name , 'phone':phone , 'email':email, 'course':course,'message':message};
		
		apiCall('enquiry',data);
		
		$('#enquiry_btn').val('Processing....').attr('disabled',true);
		
		return false;
		
	};
	
	this.contact_btn = function()
	{
		var name = $('#name').val();
		
		var phone = $('#phone').val();
		
		var email = $('#email').val();
		
		var course = $('#course').val();
		
		var message = $('#message').val();	

        if(!name)
		{
			app.showAlert('Please Enter Your Name');
            $('#name').focus();			
			return false;
		}
		
		if(!phone)
		{
			app.showAlert('Please Enter Your Phone');
            $('#phone').focus();			
			return false;
		}
		
		if(!email)
		{
			app.showAlert('Please Enter Your Email');
            $('#email').focus();			
			return false;
		}
		
		if(!message)
		{
			app.showAlert('Please Enter Your Message');
            $('#message').focus();			
			return false;
		}		
		
		var data = {'name':name , 'phone':phone , 'email':email, 'course':course,'message':message};
		
		apiCall('contact',data);
		
		$('#contact_btn').val('Processing....').attr('disabled',true);
		
		return false;
		
	};
	
	this.prospectus_btn = function()
	{
		var name = $('#name').val();
		
		var phone = $('#phone').val();
		
		var email = $('#email').val();
		
		var address = $('#address').val();
		
		if(!name)
		{
			app.showAlert('Please Enter Your Name');
            $('#name').focus();			
			return false;
		}
		
		if(!phone)
		{
			app.showAlert('Please Enter Your Phone');
            $('#phone').focus();			
			return false;
		}
		
		if(!email)
		{
			app.showAlert('Please Enter Your Email');
            $('#email').focus();			
			return false;
		}
		
		if(!address)
		{
			app.showAlert('Please Enter Your Address');
            $('#address').focus();			
			return false;
		}
		
		var data = {'name':name , 'phone':phone , 'email':email,'address':address};
		
		apiCall('prospectus',data);
		
		$('#prospectus_btn').val('Processing....').attr('disabled',true);
		
		return false;
	};
	
	this.prospectus = function()
	{
		$('body').html(new HomeView(self.store).render(HomeView.prospectus).el);
		$(".wrapper1").css( { 'min-height': $(window).height() }, { queue: false, duration: 800 });
	};
	
	this.placement =  function()
	{
		$('body').html(new HomeView(self.store).render(HomeView.placement).el);
		$(".wrapper").css( { 'min-height': $(window).height() }, { queue: false, duration: 800 });
	};
	
	this.scholarship = function()
	{
		$('body').html(new HomeView(self.store).render(HomeView.scholarship).el);
		$(".wrapper").css( { 'min-height': $(window).height() }, { queue: false, duration: 800 });
		$("#sch_img").css( { 'min-height': $(window).height()-$('.header-bar').height() }, { queue: false, duration: 800 });
	};
	
	this.admission = function()
	{
		$('body').html(new HomeView(self.store).render(HomeView.admission).el);
		$(".wrapper").css( { 'min-height': $(window).height() }, { queue: false, duration: 800 });
	};
	
	this.infra = function()
	{
		$('body').html(new HomeView(self.store).render(HomeView.infra).el);
		$(".wrapper").css( { 'min-height': $(window).height() }, { queue: false, duration: 800 });
	};
	
	this.achievements = function()
	{
		$('body').html(new HomeView(self.store).render(HomeView.achievements).el);
		$(".wrapper").css( { 'min-height': $(window).height() }, { queue: false, duration: 800 });
	};
	
	this.contact = function()
	{
		$('body').html(new HomeView(self.store).render(HomeView.contact).el);
	};
	
	this.enquiry = function()
	{	
		$('body').html(new HomeView(self.store).render(HomeView.enquiry).el);
		$(".wrapper1").css( { 'min-height': $(window).height() }, { queue: false, duration: 800 });
	};
	
	this.about = function() 
	{		
		$('body').html(new HomeView(self.store).render(HomeView.about).el);	
		$(".wrapper").css( { 'min-height': $(window).height() }, { queue: false, duration: 800 });
	};
	
	this.institute = function()
	{
		$('body').html(new HomeView(self.store).render(HomeView.institutions).el);
		$(".wrapper").css( { 'min-height': $(window).height() }, { queue: false, duration: 800 });
	};
	
	this.courses =  function()
	{
		$('body').html(new HomeView(self.store).render(HomeView.courses).el);
		$(".wrapper").css( { 'min-height': $(window).height() }, { queue: false, duration: 800 });
	};
	
	
    this.backlist =function()
    {
		 $('body').html(new HomeView(self.store).render(HomeView.template).el);
		 $(".wrapper").css( { 'min-height': $(window).height() }, { queue: false, duration: 800 });
    };
	
    this.logout = function()
    {
        var users = JSON.parse(window.localStorage.getItem("userdetail"));
        $('body').html(new HomeView(self.store).renderP(HomeView.template,users).el);
        $('body').removeClass('cbp-spmenu-push-toleft').css('transition','none');
    };	
	
		
	this.render = function(template)
	{
		this.el.html(template());
        return this;
    };
	
	this.renderP = function(template,param)
	{
		//console.log(template);
		// console.log(param);
        this.el.html(template(param));
        return this;
    };

    this.initialize();

}

HomeView.template = Handlebars.compile($("#login-tpl").html());
HomeView.about = Handlebars.compile($("#about-tpl").html());
HomeView.institutions = Handlebars.compile($("#institutions-tpl").html());
HomeView.courses = Handlebars.compile($("#courses-tpl").html());
HomeView.enquiry = Handlebars.compile($("#enquiry-tpl").html());
HomeView.contact = Handlebars.compile($("#contact-tpl").html());
HomeView.achievements = Handlebars.compile($("#achievements-tpl").html());
HomeView.infra = Handlebars.compile($("#infra-tpl").html());
HomeView.admission = Handlebars.compile($("#admission-tpl").html());
HomeView.scholarship = Handlebars.compile($("#scholarship-tpl").html());
HomeView.placement = Handlebars.compile($("#placement-tpl").html());
HomeView.prospectus = Handlebars.compile($("#prospectus-tpl").html());
HomeView.login_otp_tpl = Handlebars.compile($("#login-with-otp-tpl").html());
HomeView.gallery_tpl = Handlebars.compile($("#gallery-tpl").html());
HomeView.video_gallery_tpl = Handlebars.compile($("#video-gallery-tpl").html());
HomeView.uniqe_ugi_tpl = Handlebars.compile($("#uniqe-ugi-tpl").html());
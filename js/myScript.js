var currentSlide;
		var timesCalled;
		var delta;
		var scrollIntervalId;
	
		$( document ).ready(function() {
			currentSlide = 1;
			timesCalled = 0;
			
			for(var i = 0; i < $('#portfolio div').length; i++){
				$('#portfolio div')[i].id = (i+1).toString();
			}
			for(var j = 0; j < $('#img-container li').length; j++){
				$('#img-container li')[j].id = ('slide' + (j+1)).toString();

			}
			scrollIntervalId  = setInterval(function(){
				if(timesCalled > 0){
					if(delta < 0 && currentSlide < $('#img-container li').length){ 
						nextSlide();
					}
					else if(delta > 0 && currentSlide > 1){
						previousSlide();
					}
				}
				timesCalled = 0;
			},750);
		});
		
		$('img').each(function(){
			$(this).attr('draggable', false);
		});
		
		$("#img-container").on('mousedown', function(e) { 
		   if( e.which == 2 ) {
			  e.preventDefault();
		   }
		});
		
		//from https://jsbin.com/howojuq/edit?js,output
		$('#img-container').on( 'mousewheel DOMMouseScroll', function (e) { 		 
			var e0 = e.originalEvent;
			delta = e0.wheelDelta || -e0.detail;
			e.preventDefault();
			var oldCurrent = currentSlide;
			timesCalled += 1;
		});
		
		$(window).resize(function(){
			vh = $('#img-container').height();
			console.log('img-container height: ' + vh);
			$('#slide' + currentSlide).ScrollTo();
		});
	
		$('.panel').click(function(e){
			toggleMenu1();
			$('#slide' + this.id).ScrollTo();
			currentSlide = parseInt(this.id);
		});
		
		function previousSlide(){
			if(currentSlide > 1){
				currentSlide -= 1;
				$('#slide' + currentSlide).ScrollTo();
			}
		}
		
		function nextSlide(){
			if(currentSlide < $('#img-container li').length){
				currentSlide += 1;
				$('#slide' + currentSlide).ScrollTo();
			}
		}
	
		function toggleMenu1(){
			if(document.getElementById('menu-wrapper').className == "open"){ document.getElementById('menu-wrapper').className = "closed";}
			else if (document.getElementById('menu-wrapper').className == "closed"){ document.getElementById('menu-wrapper').className = "open";}
			else alert("Error in toggleMenu");
		}
		
		function toggleCaption(){
			var slides = [];
			var captions = [];
			slides = document.getElementsByClassName('slide');
			captions = document.getElementsByClassName('caption-container');
			if(captions[0].className == "caption-container caption-open"){ 
				for(var i = 0; i < slides.length; i++){
					slides[i].className = "slide full-width";
				}
				for(var i = 0; i < captions.length; i++){
					captions[i].className = "caption-container caption-closed";
				}
				$('#caption-image').attr("src","pics/toggleIconOff.png");
			}
			else if (captions[0].className == "caption-container caption-closed"){ 
				for(var i = 0; i < slides.length; i++){
					slides[i].className = "slide with-caption";
				}
				for(var i = 0; i < captions.length; i++){
					captions[i].className = "caption-container caption-open";
				}
				$('#caption-image').attr("src","pics/toggleIconOn.png");
			}
			else alert("Error in toggleCaption");
		}
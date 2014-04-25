/*
 * 2014.04.23 v.1.3
 * Display a countdown of the difference between a future date and now.
 *
 * in HTML file: <div id="clock-container"><p id="digits"></p><span id="line"></span></div>
 *
 */
 
function Clock($future_date) {
// Clock constructor

	var clock = this;
	this.finished = false;
	
	// "constants"
	this.ELEM	= $('#clock-container');
	this.DIGITS	= $('#digits');
	this.FUTURE	= new Date($future_date);
	
	this.run = function()
	{			
		this.now	= new Date();		
		this.diff 	= this.FUTURE - this.now;
		this.diff	= this.diff.toString();
				
		if ( this.diff <= 0 )
		{
			if( typeof window.timer != 'undefined' )
				clearInterval(window.timer);
				
			this.diff = '0';
			this.finished = true;
		}
		else
		{
			if( typeof window.timer == 'undefined' )
				window.timer = setInterval(function(){clock.run();}, 1000);				
		};
		
		this.mk_digits();
	};
	this.mk_digits = function()
	{		
		// keep same # of digits by padding w/ 0s, only for aesthetics
		while(this.diff.length < 11)
			this.diff = '0' + this.diff;

		this.elems 	= this.diff.split('');

		this.DIGITS.html('');	// clear digit contents in #digits

		this.dropmilis = this.elems.length - 3;
	
		for(var i = 0; i < this.dropmilis; i++)
		{
			var e = '<span class="digit">'+this.elems[i]+'</span>';
			this.DIGITS.append(e);
		};		
		if ( this.finished )
		{
			// at 0000... animate the digits to rotate
			$('#line').hide();
			this.DIGITS.addClass('transition translateAnimationClass');
		};
	};
	this.run();
};

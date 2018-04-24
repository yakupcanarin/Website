function spanHover(){
				document.getElementById('scroll-button').style.width = "50px";
				document.getElementById('scroll-button').style.height = "50px";
}

$(function() {
					$('a[href*=#]').on('click', function(e) {
						e.preventDefault();
						$('html, #container').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
					});
				});			

( function( $ ) {
	var _has3d = null;
	var has3d = function() {
		if ( _has3d !== null )
			return _has3d;

		if ( ! window.getComputedStyle ) {
			_has3d = false;
			return false;
		}

		var el = document.createElement( 'p' ),
				has3d,
				transforms = {
					'webkitTransform': 	'-webkit-transform',
					'OTransform': 			'-o-transform',
					'msTransform': 			'-ms-transform',
					'MozTransform': 		'-moz-transform',
					'transform': 				'transform'
				};

		document.body.insertBefore( el, null );

		for ( var t in transforms ) {
			if ( el.style[t] !== undefined ) {
				el.style[t] = "translate3d( 1px, 1px, 1px )";
				has3d = window.getComputedStyle( el ).getPropertyValue( transforms[t] );
			}
		}

		document.body.removeChild( el );

		_has3d = ( has3d !== undefined && has3d.length > 0 && has3d !== "none" ) ? true : false;
		return _has3d;
	};

	var _win = { width: 0, height: 0 },
		wrapper = { x: 0, y: 0 },
		$background,
		$text,
		rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function( callback ) { window.setTimeout( callback, 1000 / 60 ) };
	
	var resize_handler = function() {
		_win.width = $( window ).width();
		_win.height = $( window ).height();

		var diff = 0;
		if ( _win.width > _win.height ) {
			diff = _win.width - _win.height;
			wrapper.x = 100;
			wrapper.y = diff / 4 + 100;
		}
		else if ( _win.width < _win.height ) {
			diff = _win.height - _win.width;
			wrapper.x = diff / 4 + 100;
			wrapper.y = 100;
		}
		else {
			wrapper.x = 100;
			wrapper.y = 100;
		}

		var wrapper_css = {
			top: '-' + wrapper.y + 'px',
			right: '-' + wrapper.x + 'px',
			bottom: '-' + wrapper.y + 'px',
			left: '-' + wrapper.x + 'px'
		};
		
		$background.css( wrapper_css );
		$text.css( wrapper_css );
		
		$( document ).trigger( 'recalcmouse' );
	};
	
	var mouse = { x: 0, y: 0, lx: -1, ly: -1, cx: 0, cy: 0 };
	
	$( document ).on( 'mousemove', function( event ) {
		mouse.x = event.clientX || event.pageX;
		mouse.y = event.clientY || event.pageY;
	} );
	
	$( document ).on( 'recalcmouse', function( event ) {
		mouse.lx = mouse.ly = -1;
		mouse.cx = mouse.x = _win.width / 2;
		mouse.cy = mouse.y = _win.height / 2;
	} );

	var mouse_loop = function() {
		// Avoid calculations if not needed
		if ( mouse.x == mouse.lx && mouse.y == mouse.ly ) {
			rAF( mouse_loop );
			return false;
		}
		else {
			mouse.lx = mouse.x;
			mouse.ly = mouse.y;
		}

		$background.css( {
			'transform': 'translate( ' + ( ( mouse.cx - mouse.lx ) / _win.width * wrapper.x ) + 'px, ' + ( ( mouse.cy - mouse.ly ) / _win.height * wrapper.y ) + 'px ) ' + ( has3d() ? ' translateZ( 0 )' : '' )
		} );

		$text.css( {
			'transform': 'translate( ' + ( ( mouse.lx - mouse.cx ) / _win.width * wrapper.x * 0.5 ) + 'px, ' + ( ( mouse.ly - mouse.cy ) / _win.height * wrapper.y * 0.5 ) + 'px ) ' + ( has3d() ? ' translateZ( 0 )' : '' )
		} );

		rAF( mouse_loop );
	};
	
	$( document ).on( 'ready', function() {
		$background = $( '.background-wrapper' );
		$text = $( '.text-wrapper' );
		resize_handler();
		$( document ).on( 'resize', resize_handler );

		mouse_loop();
	} );
} ) ( jQuery )

console.clear();

canvasWidth = 1600;
canvasHeight = 200;

pCount = 0;


pCollection = new Array();

var puffs = 1;
var particlesPerPuff = 2000;
var img = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/85280/smoke2.png';

var smokeImage = new Image();
smokeImage.src = img;

for (var i1 = 0 ; i1 < puffs; i1++)
{
  var puffDelay = i1 * 1500; //300 ms between puffs

  for (var i2 = 0 ; i2 < particlesPerPuff; i2++)
  {
    addNewParticle((i2*50) + puffDelay);    
  }
}


draw(new Date().getTime(), 8000)



function addNewParticle(delay)
{

  var p = {};
  p.top = canvasHeight;
  p.left = randBetween(-200,800);

  p.start = new Date().getTime() + delay;
  p.life = 8000;
  p.speedUp = 30;


  p.speedRight = randBetween(0,20);

  p.rot = randBetween(-1,1);
  p.red = Math.floor(randBetween(0,255));
  p.blue = Math.floor(randBetween(0,255));
  p.green = Math.floor(randBetween(0,255));


  p.startOpacity = .3
  p.newTop = p.top;
  p.newLeft = p.left;
  p.size = 200;
  p.growth = 10;

  pCollection[pCount] = p;
  pCount++;


}

function draw(startT, totalT)
{
  //Timing
  var timeDelta = new Date().getTime() - startT;
  var stillAlive = false;

  //Grab and clear the canvas
  var c=document.getElementById("fogEffect");
  var ctx=c.getContext("2d");
  ctx.clearRect(0, 0, c.width, c.height);
  c.width = c.width;

  //Loop through particles
  for (var i= 0; i < pCount; i++)
  {    
    //Grab the particle
    var p = pCollection[i];

    //Timing
    var td = new Date().getTime() - p.start;
    var frac = td/p.life

    if (td > 0)
    {
      if (td <= p.life )
      { stillAlive = true; }

      //attributes that change over time
      var newTop = p.top - (p.speedUp * (td/1000));
      var newLeft = p.left + (p.speedRight * (td/1000));
      var newOpacity = Math.max(p.startOpacity * (1-frac),0);

      var newSize = p.size + (p.growth * (td/1000));
      p.newTop = newTop;
      p.newLeft = newLeft;

      //Draw!
      ctx.fillStyle = 'rgba(150,150,150,' + newOpacity + ')';      
      ctx.globalAlpha  = newOpacity;
      ctx.drawImage(smokeImage, newLeft, newTop, newSize, newSize);
    }
  }



  //Repeat if there's still a living particle
  if (stillAlive)
  {
    requestAnimationFrame(function(){draw(startT,totalT);}); 
  }
  else
  {
    clog(timeDelta + ": stopped");
  }
}

function randBetween(n1,n2)
{
  var r = (Math.random() * (n2 - n1)) + n1;
  return r;
}

function randOffset(n, variance)
{
  //e.g. variance could be 0.1 to go between 0.9 and 1.1
  var max = 1 + variance;
  var min = 1 - variance;
  var r = Math.random() * (max - min) + min;
  return n * r;
}

function clog(s)
{  
  console.log(s);
}
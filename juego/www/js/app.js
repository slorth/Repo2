
// This uses require.js to structure javascript:
// http://requirejs.org/docs/api.html#define

// A cross-browser requestAnimationFrame
// See https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
var requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

define(function(require) {
    // Zepto provides nice js and DOM methods (very similar to jQuery,
    // and a lot smaller):
    // http://zeptojs.com/
    var $ = require('zepto');

    // Need to verify receipts? This library is included by default.
    // https://github.com/mozilla/receiptverifier
    require('receiptverifier');

    // Want to install the app locally? This library hooks up the
    // installation button. See <button class="install-btn"> in
    // index.html
    require('./install-button');

    // Simple input library for our game
    var input = require('./input');

    // Create the canvas
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 300;
    document.body.appendChild(canvas);
	
	var posicion = {
		x:0;
		y:0;
		libre:false;
	}

	var escenario = {
		posiciones = new Array (1500);
	}
	
	var posicion_aux;
	for (i=0; i< 50;i++){
		for (j=0; j<30;j++){
			var pos=posicion;
			pos.x=i;
			pos.y=j;
			pos.libre=false
			escenario.posiciones[posicion_aux]=pos;
			posicion_aux=posicion_aux+1;
		}
	}
	
	alert(posiciones(2).x);
    // The player's state
    var player = {
        x: 0,
        y: 0,
        sizeX: 50,
        sizeY: 50
    };
	
	var img = new Image();
	img.src = 'dib1.png';
	
	var fondo = new Image();
	fondo.src='fondo.jpg';

    // Reset game to original state
    function reset() {
        player.x = 0;
        player.y = 0;
    };

    // Pause and unpause
    function pause() {
        running = false;
    }

    function unpause() {
        running = true;
        then = Date.now();
        main();
    }

    // Update game objects
    function update(dt) {
        // Speed in pixels per second
        var playerSpeed = 100;

        if(input.isDown('DOWN')) {
            // dt is the number of seconds passed, so multiplying by
            // the speed gives u the number of pixels to move
            player.y += playerSpeed * dt;
        }

        if(input.isDown('UP')) {
            player.y -= playerSpeed * dt;
        }

        if(input.isDown('LEFT')) {
            player.x -= playerSpeed * dt;
        }

        if(input.isDown('RIGHT')) {
            if (player.x<40 && player.y>0 && player.y <200 ){
				
				player.x += playerSpeed * dt;
			}
			
			
        }
    };

    // Draw everything
    function render() {
        //ctx.fillStyle = 'white';
        //ctx.fillRect(0, 0, );
		ctx.drawImage(fondo,0,0,canvas.width, canvas.height);
        //ctx.fillStyle = 'yellow';
        //ctx.fillRect(player.x, player.y, player.sizeX, player.sizeY);
		//ctx.drawImage('dib1.jpg',player.sizeX, player.sizeY);
		ctx.drawImage(img, player.x, player.y);
    };

    // The main game loop
    function main() {
        if(!running) {
            return;
        }

        var now = Date.now();
        var dt = (now - then) / 1000.0;

        update(dt);
        render();

        then = now;
        requestAnimFrame(main);
    };

    // Don't run the game when the tab isn't visible
    window.addEventListener('focus', function() {
        unpause();
    });

    window.addEventListener('blur', function() {
        pause();
    });

    // Let's play this game!
    reset();
    var then = Date.now();
    var running = true;
    main();
});
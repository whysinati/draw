var draw = (function() {

    //Get the height and width of the main we will use this set canvas to the full
    //size of the main element.
    var mWidth = document.querySelector('main').offsetWidth,
      mHeight = document.querySelector('main').offsetHeight,
  
      //Create the canvas
      canvas = document.createElement("canvas"),
  
      //Create the context
      ctx = canvas.getContext("2d"),
  
      //Create the initial bounding rectangle
      rect = canvas.getBoundingClientRect(),
  
      //current x,y position
    //   x=0,
    //   y=0;
  //current x,y
        x=0,
        y=0,

        //starting x,y
        x1=0,
        y1=0,

        //ending x,y
        // x2=0,
        // y2=0;

        //ending x,y
        x2=0,
        y2=0,

        //Tracks the last x,y state (for drawing the path)
        lx = false,
        ly = false,

        //What shape are we drawing?
        shape='',

        // To draw or not to draw (a path)
        isDrawing=false;


    return {
        //Sets the shape to be drawn
        setShape: function(shp) {
            shape = shp;
        },
        // to support mousemove listener if a path is chosen to be drawn
        getShape: function() {
          return shape;
        },
        // Setter and getter for the to draw or not to draw path
        setIsDrawing: function(bool) {
          isDrawing = bool;
        },
        
        getIsDrawing: function() {
          return isDrawing;
        },

        setStart: function() {
            x1=x;
            y1=y;
          },
          
        setEnd: function() {
          x2=x;
          y2=y;
        },

      //Set the x,y coords based on current event data
      setXY: function(evt) {

        //Track the last x,y position before setting the current position.
        lx=x;
        ly=y;

        x = (evt.clientX - rect.left) - canvas.offsetLeft;
        y = (evt.clientY - rect.top) - canvas.offsetTop;
      },
  
      //Write the x,y coods to the target div
      writeXY: function() {
        document.getElementById('trackX').innerHTML = 'X: ' + x;
        document.getElementById('trackY').innerHTML = 'Y: ' + y;
      },
  
      draw: function() {
        ctx.restore();
        if(shape==='rectangle')
        {
          this.drawRect();
        } else if(shape==='line') {
          this.drawLine();
        } else if(shape==='circle') {
          this.drawCircle();
        } else if(shape==='path') {
          this.drawPath();
        } else {
          alert('Please choose a shape');
        }
        ctx.save();
      },

      //Draw a rectangle
      drawRect: function() {
        //Draw some sample rectangles
    //     ctx.fillStyle = "rgb(200,0,0)";
    //     ctx.fillRect (10, 10, 55, 50);
    //   },

    //   drawRect: function(x,y,h,w) { //error in training material to pass these 4 variables

        //Start by using random fill colors.
        ctx.fillStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
      
        ctx.fillRect (x1,y1,(x2-x1),(y2-y1));
      
      },

      //Draw a line
      drawLine: function() {
        //Start by using random fill colors.
        ctx.strokeStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      },

      //Draw a circle
      drawCircle: function() {
        //Start by using random fill colors.
        ctx.strokeStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
        ctx.fillStyle = '#'+Math.floor(Math.random()*16777215).toString(16);

        let a = (x1-x2)
        let b = (y1-y2)
        let radius = Math.sqrt( a*a + b*b );

        ctx.beginPath();
        ctx.arc(x1, y1, radius, 0, 2*Math.PI);
        ctx.stroke();
        ctx.fill();
        // alert('Circle functionality under construction');
      },

      // Draw a Path (squiggly?)
      drawPath: function() {
        // alert('Path functionality under construction');
        //Start by using random fill colors.
        ctx.strokeStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
        ctx.beginPath();
        ctx.moveTo(lx, ly);
        ctx.lineTo(x, y);
        ctx.stroke();
      },



      // so we have access to the canvas 
      //outside the function "getter" 
      //then we can use in the listener later
      getCanvas: function(){
        return canvas;
      },
  
      //Initialize the object, this must be called before anything else
      init: function() {
        canvas.width = mWidth;
        canvas.height = mHeight;
        document.querySelector('main').appendChild(canvas);
  
      }
    };
  
  })();
  
  //Initialize draw
  draw.init();
  
  //Add a mousemove listener to the canvas
  //When the mouse reports a change of position use the event data to
  //set and report the x,y position on the mouse.
  draw.getCanvas().addEventListener('mousemove', function(evt) {
    draw.setXY(evt);
    draw.writeXY();
    if(draw.getShape()=='path' && draw.getIsDrawing()===true) {
      draw.draw();
    }
  }, false);
  
//Set the starting position
  draw.getCanvas().addEventListener('mousedown', function() {
    draw.setStart();
    draw.setIsDrawing(true);
  }, false);

//   draw.getCanvas().addEventListener('mouseup', function() {
//     draw.setEnd();
    // draw.drawRect();
    draw.getCanvas().addEventListener('mouseup', function() {
        draw.setEnd();
        draw.draw();
        draw.setIsDrawing(false);
      }, false);
//   }, false);

  document.getElementById('btnRect').addEventListener('click',function(){
    draw.setShape('rectangle');
  }, false);
  //draw a sample rectangle
//   draw.drawRect();

  document.getElementById('btnLine').addEventListener('click',function(){
    draw.setShape('line');
  }, false);

  document.getElementById('btnCircle').addEventListener('click',function(){
    draw.setShape('circle');
  }, false);

  document.getElementById('btnPath').addEventListener('click', function(){
    draw.setShape('path');
  }, false);
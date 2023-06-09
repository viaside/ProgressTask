# ProgressTask
GitHub pages - https://viaside.github.io/ProgressTask/

## Features 
The block has an API for managing its state.
-  Blocks are designed to be easily reused in other applications.
-  States:
   -  Normal - the base state in which, by setting the Value, you can control
  the size of an arc that reflects some parameter or the progress of a process. Start
  the arc corresponds to 12 o'clock, the end of the arc when the Value parameter is increased
  moves in a clockwise direction and reaches the start at a value of 100.
   - Animated – an independent state in which the block or its elements begin to rotate clockwise with a certain period.
   - Hidden – a state that hides a block from the page.
-  The application adapts to the screen orientation.

## Usage
   ```bash
   //index.html
   <script type="module">
      import ProgressElement from './src/ProgressElement.js';
   </script>

   <script>
   customElements.define("progress-element", ProgressElement);

   // configure progress element
   const progressElement = document.createElement("progress-element");
   progressElement.size = "your size";

   // add on body
   document.body.appendChild(progressElement); 
   </script>
   ```

   
- there is an example of usage in the index.html.
## Method
   + `.size()` - set Value.
   + `.size` - get size.
   + `.hide()`- set hidden.
   + `.animate()` - set animated;
   + `.states` - get states;
   + `.SetProgressValue` - set pregress value;
   + `.getprogressValue` - get progress value;

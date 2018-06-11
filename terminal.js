var commandHistory = [];

$('#terminal').append(`
<div class="terminal-output nopadding">
<pre id="name">
          :::        :::    :::        :::        ::::::::       :::    ::: 
       :+: :+:      :+:   :+:       :+: :+:     :+:    :+:      :+:    :+:  
     +:+   +:+     +:+  +:+       +:+   +:+    +:+             +:+    +:+   
   +#++:++#++:    +#++:++       +#++:++#++:   +#++:++#++      +#++:++#++    
  +#+     +#+    +#+  +#+      +#+     +#+          +#+      +#+    +#+     
 #+#     #+#    #+#   #+#     #+#     #+#   #+#    #+#      #+#    #+#      
###     ###    ###    ###    ###     ###    ########       ###    ###        
</pre>
</div>
<div class="terminal-output nopadding">&nbsp;&nbsp;&gt;&gt;&gt; type <strong>help</strong> for help</div>
<div id="terminalinput" contenteditable spellcheck="false"><span id="dollar" class="greentext">root@<strong>arjndr&nbsp;&dollar;</strong>&nbsp;</span><span id="cursor"></span></div>`)

$(window).on('click', function(){
  $('div#terminalinput').removeClass('active');
});

$(window).on('contextmenu', function (e) {
  e.preventDefault();
});

$('body').on('click', 'div#terminalinput', function (e) {
  e.stopPropagation();
  $('div#terminalinput').addClass('active');
});

$(window).on('keypress', function(e){
  if ($('div#terminalinput').hasClass('active')) {
    if (e.keyCode === 13) {
      e.preventDefault();
      processCommand($("#terminalinput").text().replace(/root@arjndr\s\$\s/, ''));
    } else {
      e.preventDefault(); // Firefox fix
      $('<span>' + e.key + '</span>').insertBefore("span#cursor");
    }
  }
});

$(window).on('keydown', function (e) {
  if ($('div#terminalinput').hasClass('active')) {
    if (e.keyCode === 8) {
      e.preventDefault(); // Firefox fix
      if (! $('span#cursor').prev().attr('id')) {
        $('span#cursor').prev().remove();
      }
    }
  }
});

function processCommand(command) {
  $(`
  <div class="terminal-output nopadding">
  <pre class="showcommand"><span class="purpletext">root@arjndr&nbsp;&dollar;</span>&nbsp;<span class="whitetext light">${command}</span></pre>
  </div>
  `).insertBefore("div#terminalinput");
  
  switch (command) {
    case 'help':
      console.log('show help plz');
      appendHelp();
      break;
    case 'about':
      console.log('show about plz');
      appendAbout();
      break;
    case 'contact':
      console.log('show contact plz');
      appendContact();
      break;
    case 'projects':
      console.log('show projex plz');
      appendProjects();
      break;
    case 'cls':
    case 'clear':
      console.log('clear terminal');
      $('.terminal-output').remove()
      break;
    case '':
      console.log('empty');
      break;
    case 'exit':
      window.close()
      break;
    default:
      console.log('unknown command :(')
      $(`
      <div class="terminal-output">
      <span class="red light">command not found</span>
      </div>
      `).insertBefore("div#terminalinput");
  }
  clearInputBox();
  $("#terminal").animate({ scrollTop: $(document).height() });
}

function appendHelp() {
  $(`
  <div class="terminal-output">
  <p><strong>You can use the following commands</strong></p>
  <p><span class="greentext">about</span>&nbsp;&mdash;&nbsp;Stuff you want to know about me</p>
  <p><span class="greentext">contact</span>&nbsp;&mdash;&nbsp;Different ways to contact me</p>
  <p><span class="greentext">projects</span>&nbsp;&mdash;&nbsp;Show my projects</p>
  <p><span class="greentext">clear</span>&nbsp;&mdash;&nbsp;Clear terminal</p>
  <p><span class="greentext">exit</span>&nbsp;&mdash;&nbsp;Close this page</p></div>
  `).insertBefore("div#terminalinput");
}

function appendAbout(){
  $(`
  <div class="terminal-output">
  <pre class="aboutme">
  About Me

  I'm <span class="greentext">Akash Rajendra</span>, I'm 18 and my skills are :

  &bull; HTML
  &bull; CSS
  &bull; JavaScript
  &bull; TypeScript
  &bull; Node.js
  &bull; ElectronJS
  &bull; Python
  &bull; C++ and some more</pre>
  </div>
  `).insertBefore("div#terminalinput");
}

function appendContact() {
  $(`
  <div class="terminal-output">
  <p>Contact me on: </p>
  <p><a href="https://instagram.com/_akashrajendra" target="_blank">instagram</a></p>
  <p><a href="https://facebook.com/akashrajendra0" target="_blank">facebook</a></p>
  <p><a href="https://akashrajendra.deviantart.com/" target="_blank">deviantart</a></p>
  <p><a href="https://github.com/arjndr" target="_blank">github</a></p>
  <p><a href="mailto:akash0rajendra@gmail.com">email</a></p>
  </div>
  `).insertBefore("div#terminalinput");
}

function appendProjects() {
  $(`
  <div class="terminal-output">
    <div class="projects-container">
      <div class="project">
        <div class="project-image" style="background-image: url('images/pdfmergejs.png');"></div>
        <div class="project-info">
          <p><a href="https://www.npmjs.com/package/pdfmerge" target="_blank">PDFMerge</a></p>
          <p><i>Description</i>: <strong>Merge multiple PDF files into one using Node.js and Python</strong></p>
          <p><i>Features</i>: <br>&bull; <strong>Promise based</strong><br>&bull; <strong>Good error handling</strong></p>
        </div>
      </div>

      <div class="project">
        <div class="project-image" style="background-image: url('images/shrt.png');"></div>
        <div class="project-info">
          <p><a href="https://github.com/arjndr/shortcuts.js" target="_blank">ShortcutsJS</a></p>
          <p><i>Description</i>: <strong>Simple and small keyboard shortcuts library in JS</strong></p>
          <p><i>Browser Compatibility</i>: <br>&bull; <strong>Chrome 16+</strong><br>&bull; <strong>Firefox 11+</strong></p>
        </div>
      </div>

      <p>And more <a href="https://github.com/arjndr" target="_blank">here</a></p>
    </div>
  </div>
  `).insertBefore("div#terminalinput");
}

function clearInputBox() {
  $('div#terminalinput').children().each(function () {
    if (! $(this).attr('id')) {
      $(this).remove()
    }
  });
}

// Other stuff, nvm this :)

var browserData = bowser._detect(navigator.userAgent);

switch (browserData.name) {
  case 'Chrome':
    if (!bowser.check({ chrome: "41" }, window.navigator.userAgent)) {
      window.alert("Your browser is incompatible.")
      window.close()
    }
    break;
  case 'Firefox':
    if (!bowser.check({ firefox: "34" }, window.navigator.userAgent)) {
      window.alert("Your browser is incompatible.")
      window.close()
    }
    break;
  case 'Opera':
    if (!bowser.check({ opera: "29" }, window.navigator.userAgent)) {
      window.alert("Your browser is incompatible.")
      window.close()
    }
    break;
  default:
    break;
}

var dropzone = document.getElementById('dropzone');
var fileInput = document.getElementById('fileInput');
var uploadView = document.getElementById('uploadView');
var chatView = document.getElementById('chatView');
var fileChip = document.getElementById('fileChip');
var fileNameEl = document.getElementById('fileName');
var changeBtn = document.getElementById('changeBtn');
var chatScroll = document.getElementById('chatScroll');
var chatInput = document.getElementById('chatInput');
var sendBtn = document.getElementById('sendBtn');

dropzone.addEventListener('click', function(){
  fileInput.click();
});

fileInput.addEventListener('change', function(){
  if(fileInput.files && fileInput.files[0]){
    handleFile(fileInput.files[0]);
  }
});

dropzone.addEventListener('dragover', function(e){
  e.preventDefault();
  dropzone.classList.add('drag');
});

dropzone.addEventListener('dragleave', function(){
  dropzone.classList.remove('drag');
});

dropzone.addEventListener('drop', function(e){
  e.preventDefault();
  dropzone.classList.remove('drag');
  if(e.dataTransfer.files && e.dataTransfer.files[0]){
    handleFile(e.dataTransfer.files[0]);
  }
});

changeBtn.addEventListener('click', function(){
  resetToUpload();
});

chatInput.addEventListener('keydown', function(e){
  if(e.key === 'Enter'){
    sendMessage();
  }
});

sendBtn.addEventListener('click', sendMessage);

function handleFile(file){
  fileNameEl.textContent = file.name;
  fileChip.hidden = false;
  uploadView.hidden = true;
  chatView.hidden = false;

  chatScroll.innerHTML = '';
  addMessage('assistant', 'Loaded **' + file.name + '**. Ask me about grading, exam dates, attendance, or your GPA.');
  chatInput.focus();

  uploadSyllabus(file);
}

function resetToUpload(){
  chatView.hidden = true;
  fileChip.hidden = true;
  uploadView.hidden = false;
  fileInput.value = '';
  chatScroll.innerHTML = '';
}

function sendMessage(){
  var text = chatInput.value.trim();
  if(text === ''){
    return;
  }

  addMessage('user', text);
  chatInput.value = '';
  sendBtn.disabled = true;

  var pending = document.createElement('div');
  pending.className = 'msg assistant pending';
  pending.innerHTML = '<div class="msg-label">Assistant</div><div class="msg-bubble"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>';
  chatScroll.appendChild(pending);
  chatScroll.scrollTop = chatScroll.scrollHeight;

  getBotReply(text, function(answer){
    pending.remove();
    addMessage('assistant', answer);
    sendBtn.disabled = false;
    chatInput.focus();
  });
}

function addMessage(role, content){
  var wrap = document.createElement('div');
  wrap.className = 'msg ' + role;

  var label = document.createElement('div');
  label.className = 'msg-label';
  label.textContent = role === 'user' ? 'You' : 'Assistant';

  var bubble = document.createElement('div');
  bubble.className = 'msg-bubble';
  bubble.innerHTML = formatContent(content);

  wrap.appendChild(label);
  wrap.appendChild(bubble);
  chatScroll.appendChild(wrap);
  chatScroll.scrollTop = chatScroll.scrollHeight;
}

function formatContent(text){
  var lines = text.split('\n');
  var html = '';
  var inList = false;

  lines.forEach(function(line){
    var trimmed = line.trim();
    if(trimmed.indexOf('- ') === 0){
      if(!inList){
        html += '<ul>';
        inList = true;
      }
      html += '<li>' + inlineFormat(trimmed.substring(2)) + '</li>';
    } else {
      if(inList){
        html += '</ul>';
        inList = false;
      }
      if(trimmed !== ''){
        html += '<p>' + inlineFormat(trimmed) + '</p>';
      }
    }
  });

  if(inList){
    html += '</ul>';
  }

  return html;
}

function inlineFormat(str){
  return str.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
}

function uploadSyllabus(file){
  return;
}

function getBotReply(question, callback){
  setTimeout(function(){
    callback('This is a placeholder answer. Replace the body of getBotReply in app.js with a fetch call to the FastAPI /chat endpoint, sending the question and the uploaded syllabus, and returning the real grounded answer.');
  }, 700);
}
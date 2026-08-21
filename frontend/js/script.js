var chatInput = document.getElementById('chatInput');
var chatMessages = document.getElementById('chatMessages');
var chatSend = document.getElementById('chatSend');

if(chatInput){
  chatInput.addEventListener('keydown', function(e){
    if(e.key === 'Enter'){
      sendMessage();
    }
  });
}

function sendMessage(){
  var text = chatInput.value.trim();
  if(text === ''){
    return;
  }

  addBubble(text, 'user');
  chatInput.value = '';
  chatSend.disabled = true;

  var pending = document.createElement('div');
  pending.className = 'bubble ai pending';
  pending.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
  chatMessages.appendChild(pending);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  getBotReply(text, function(answer){
    pending.remove();
    addBubble(answer, 'ai');
    chatSend.disabled = false;
    chatInput.focus();
  });
}

function addBubble(text, role){
  var bubble = document.createElement('div');
  bubble.className = 'bubble ' + role;
  bubble.textContent = text;
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotReply(question, callback){
  setTimeout(function(){
    callback("This is a placeholder answer. Connect this function to the /chat endpoint on the FastAPI backend to return a real, grounded answer from the uploaded syllabus.");
  }, 700);
}

function calcGpa(){
  var curGpa = parseFloat(document.getElementById('curGpa').value);
  var curCredits = parseFloat(document.getElementById('curCredits').value);
  var courseCredits = parseFloat(document.getElementById('courseCredits').value);
  var expectedGrade = parseFloat(document.getElementById('expectedGrade').value);

  var totalPoints = (curGpa * curCredits) + (expectedGrade * courseCredits);
  var totalCredits = curCredits + courseCredits;
  var newGpa = totalPoints / totalCredits;

  var box = document.getElementById('gpaResult');
  var diff = newGpa - curGpa;
  var sign = diff >= 0 ? '+' : '';
  document.getElementById('gpaBig').textContent = newGpa.toFixed(2);
  document.getElementById('gpaTiny').textContent = 'New cumulative GPA (' + sign + diff.toFixed(2) + ')';
  box.classList.add('visible');
}

function genSchedule(){
  var topicsRaw = document.getElementById('topics').value;
  var topics = topicsRaw.split(',').map(function(t){return t.trim();}).filter(Boolean);
  var days = parseInt(document.getElementById('daysLeft').value);
  var hours = parseInt(document.getElementById('hoursDay').value);

  var body = document.getElementById('schedBody');
  body.innerHTML = '';

  var perDay = Math.ceil(topics.length / Math.max(days - 1, 1));
  var idx = 0;

  for(var d = 1; d <= days; d++){
    var row = document.createElement('tr');
    var focus;
    if(d === days){
      focus = 'Final revision';
    } else if(idx < topics.length){
      var slice = topics.slice(idx, idx + perDay);
      focus = slice.join(' + ');
      idx += perDay;
    } else {
      focus = 'Practice & review';
    }
    row.innerHTML = '<td>Day ' + d + '</td><td>' + focus + '</td><td>' + hours + 'h</td>';
    body.appendChild(row);
  }

  document.getElementById('schedResult').classList.add('visible');
}
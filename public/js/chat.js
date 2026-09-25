const form = document.getElementById("chatForm");
const input = document.getElementById("messageInput");
const messages = document.getElementById("messages");
const micButton = document.getElementById("chatMic");

/* Add message */

function addMessage(type, text) {

  const message = document.createElement("div");

  message.className = `msg ${type}`;

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = type === "you" ? "●" : "Z";

  const bubble = document.createElement("div");
  bubble.className = "bubble";

  const sender = document.createElement("div");
  sender.className = "sender";
  sender.textContent = type === "you" ? "you" : "zoro";

  const messageText = document.createElement("div");
  messageText.className = "message-text";
  messageText.textContent = text;

  const time = document.createElement("div");
  time.className = "message-time";

  time.textContent =
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });

  bubble.appendChild(sender);
  bubble.appendChild(messageText);
  bubble.appendChild(time);

  message.appendChild(avatar);
  message.appendChild(bubble);

  messages.appendChild(message);

  messages.scrollTop = messages.scrollHeight;
}


/* Send message */

form.addEventListener("submit", function(event){

  event.preventDefault();

  const text = input.value.trim();

  if(!text){
    return;
  }

  addMessage("you", text);

  input.value = "";

  /*
    Temporary local response.
    Later actual ZORO AI API will be connected here.
  */

  setTimeout(() => {

    addMessage(
      "zoro",
      "I'm here. How can I help you?"
    );

  }, 600);

});


/* Enter key */

input.addEventListener("keydown", function(event){

  if(event.key === "Enter"){

    event.preventDefault();

    form.requestSubmit();

  }

});


/* Voice button */

micButton.addEventListener("click", function(){

  /*
    Real voice recognition will be connected later.
  */

  addMessage(
    "zoro",
    "voice input will be connected soon."
  );

});

const form = document.getElementById("chatForm");
const input = document.getElementById("messageInput");
const messages = document.getElementById("messages");
const micButton = document.getElementById("chatMic");


/* =========================
   ZORO SESSION
========================= */

let zoroSessionId =
  localStorage.getItem("zoroSessionId") || "";


/* =========================
   ADD MESSAGE
========================= */

function addMessage(type, text) {

  const message = document.createElement("div");

  message.className = `msg ${type}`;

  const avatar = document.createElement("div");

  avatar.className = "avatar";

  avatar.textContent =
    type === "you" ? "●" : "Z";


  const bubble = document.createElement("div");

  bubble.className = "bubble";


  const sender = document.createElement("div");

  sender.className = "sender";

  sender.textContent =
    type === "you" ? "you" : "zoro";


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

  messages.scrollTop =
    messages.scrollHeight;
}


/* =========================
   SEND MESSAGE TO ZORO
========================= */

form.addEventListener(
  "submit",
  async function(event) {

    event.preventDefault();

    const text =
      input.value.trim();

    if (!text) {
      return;
    }


    /* Show user's message */

    addMessage(
      "you",
      text
    );

    input.value = "";


    /* Disable input while ZORO thinks */

    input.disabled = true;


    try {

      const headers = {
        "Content-Type":
          "application/json"
      };


      /* Send existing session */

      if (zoroSessionId) {

        headers[
          "X-Zoro-Session"
        ] = zoroSessionId;

      }


      const response =
        await fetch(
          "/api/chat",
          {
            method: "POST",
            headers,
            body: JSON.stringify({
              message: text
            })
          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.error ||
          "ZORO could not respond."
        );

      }


      /* Save private session */

      if (data.sessionId) {

        zoroSessionId =
          data.sessionId;

        localStorage.setItem(
          "zoroSessionId",
          zoroSessionId
        );

      }


      /* Show real ZORO response */

      addMessage(
        "zoro",
        data.reply ||
        "I couldn't generate a response."
      );


    } catch (error) {

      console.error(
        "ZORO CHAT ERROR:",
        error
      );


      addMessage(
        "zoro",
        "Sorry, I couldn't connect right now."
      );

    } finally {

      input.disabled = false;

      input.focus();

    }

  }
);


/* =========================
   ENTER KEY
========================= */

input.addEventListener(
  "keydown",
  function(event) {

    if (event.key === "Enter") {

      event.preventDefault();

      form.requestSubmit();

    }

  }
);


/* =========================
   VOICE BUTTON
========================= */

micButton.addEventListener(
  "click",
  function() {

    /*
      Real voice recognition
      will be connected later.
    */

    addMessage(
      "zoro",
      "Voice input will be connected soon."
    );

  }
);

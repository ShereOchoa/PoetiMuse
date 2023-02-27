console.log("si estoy cargandome");

//Poem creation function

function createPoem() {
  const theme = document.getElementById("theme");
  const mood = document.getElementById("mood");
  const lenght = document.getElementById("lenght");
  const style = document.getElementById("style");
  const otherStyle = document.getElementById("other-style");
  const negative = document.getElementById("negative");
  const result = document.getElementById("result");
  //craft prompt string from inputs adding the theme and mood values from the inputs
  let promptString =
    "create a poem about " +
    theme.value +
    " with a " +
    mood.value +
    " mood and with a ";

  //add the style, depending if chose from dropdown or prefered to use other
  if (style.value == "other") {
    promptString += otherStyle.value + " style that is ";
  } else {
    promptString += style.value + " style that is ";
  }
  // add the lenght of the poem
  promptString += lenght.value + " lines long";
  // add the words to be excluded in case they were written
  if (!negative.value == "") {
    promptString += " but does not include the words " + negative.value;
  }

  console.log(promptString);

  //API request data (to be placed in the body of the request)
  data = {
    model: "text-davinci-003",
    prompt: promptString,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };

  let url = "https://api.openai.com/v1/completions";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer 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          ",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);

      if (data["error"]) {
        //in case they respond with an error
        console.log(data["error"]["message"]);

        result.innerText = data["error"]["message"];
      } else {
        console.log(data["choices"][0]["text"]);
        result.innerText = data["choices"][0]["text"];
        result.scrollIntoView();
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function copyText() {
  let div = document.getElementById("result");
  let text = div.innerText;
  let textArea = document.createElement("textarea");
  textArea.width = "1px";
  textArea.height = "1px";
  textArea.background = "transparents";
  textArea.value = text;
  document.body.append(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);

  /*
  // Get the text field
  var copyText = document.getElementById("result");

  // Select the text field
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);

  // Alert the copied text
  alert("Copied the text: " + copyText.value);*/
}

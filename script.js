//Poem creation function

function createPoem() {
  const theme = document.getElementById("theme");
  const mood = document.getElementById("mood");
  const lenght = document.getElementById("lenght");
  const style = document.getElementById("style");
  const result = document.getElementById("result");
  //craft prompt string from inputs adding the theme and mood values from the inputs
  let promptString =
    "create a poem about " +
    theme.value +
    " with a " +
    mood.value +
    " mood and with a ";

  //add style
  promptString += style.value + " style that is ";
  // add the lenght of the poem
  promptString += lenght.value + " lines long";

  //console.log(promptString);
  result.scrollIntoView();
  result.innerText = "Your poem will be ready shortly...";

  let url = "https://hellopm-3fflh6psqq-nn.a.run.app/";

  fetch(url, {
    method: "POST",
    body: promptString,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);

      if (data["error"]) {
        //in case they respond with an error
        console.log(data["error"]["message"]);

        result.innerText = data["error"]["message"];
      } else {
        console.log(data["result"]);
        result.innerText = data["result"];
        
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

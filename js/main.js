const lyrics = {
    15: { lyric: "I'm gonna fight 'em off", font: "ProtestGuerrilla" },
    18: { lyric: "A seven nation army couldn't hold me back", font: "ProtestRevolution" },
    22: { lyric: "They're gonna rip it off", font: "ProtestGuerrilla" },
    25: { lyric: "Taking their time right behind my back", font: "Roboto" },
    30: { lyric: "And I'm talking to myself at night", font: "Roboto" },
    33: { lyric: "Because I can't forget", font: "Roboto" },
    38: { lyric: "Back and forth through my mind", font: "Roboto" },
    41: { lyric: "Behind a cigarette", font: "ProtestGuerrilla" },
    43: { lyric: "[Pre-Chorus 1]", font: "Roboto" },
    46: { lyric: "And the message coming from my eyes", font: "ProtestRevolution" },
    49: { lyric: "Says Leave it alone", font: "ProtestRevolution" },
    52: { lyric: "[Instrumental Chorus]", font: "Roboto" },
    85: { lyric: "[Verse 2]", font: "Roboto" },
    86: { lyric: "Don't want to hear about it", font: "Roboto" },
    89: { lyric: "Every single one's got a story to tell", font: "Roboto" },
    92: { lyric: "Everyone knows about it", font: "Roboto" },
    96: { lyric: "From the Queen of England to the Hounds of Hell", font: "ProtestGuerrilla" },
    102: { lyric: "And if I catch it coming back my way", font: "ProtestRevolution" },
    104: { lyric: "I'm gonna serve it to you", font: "ProtestRevolution" },
    108: { lyric: "And that ain't what you want to hear", font: "Roboto" },
    112: { lyric: "But that's what I'll do", font: "Roboto" },
    116: { lyric: "[Pre-Chorus 1]", font: "Roboto" },
    117: { lyric: "And the message coming from my bones", font: "ProtestRevolution" },
    119: { lyric: "Says Find a home", font: "ProtestRevolution" },
    121: { lyric: "[Instrumental Chorus]", font: "ProtestGuerrilla" },
    130: { lyric: "[Guitar Solo]", font: "ProtestGuerrilla" },
    170: { lyric: "[Verse 3]", font: "Roboto" },
    172: { lyric: "I'm going to Wichita", font: "ProtestGuerrilla" },
    174: { lyric: "Far from this opera forevermore", font: "ProtestRevolution" },
    179: { lyric: "I'm gonna work the straw", font: "ProtestGuerrilla" },
    182: { lyric: "Make the sweat drip out of every pore", font: "ProtestRevolution" },
    187: { lyric: "And I'm bleeding, and I'm bleeding, and I'm bleeding", font: "ProtestGuerrilla" },
    190: { lyric: "Right before the Lord", font: "Roboto" },
    194: { lyric: "All the words are gonna bleed from me", font: "ProtestGuerrilla" },
    198: { lyric: "And I will sing no more", font: "ProtestRevolution" },
    201: { lyric: "[Pre-Chorus 3]", font: "Roboto" },
    203: { lyric: "And the stains coming from my blood", font: "ProtestRevolution" },
    206: { lyric: "Tell me Go back home", font: "ProtestRevolution" },
};

var audio = document.getElementById("myAudio");
var currentTimeDisplay = document.getElementById("currentTime");

const lyric =  document.getElementById("currentLyrics");
const verse = document.getElementById("verse");
const keys = Object.keys(lyrics);
const container = document.getElementById("lyricsContainer");
console.log(keys);

var previousLyric= "";
var previousKey = null;
function writeLyrics()
{
            // Iterate through the keys of the lyrics object
            Object.keys(lyrics).forEach(key => {
                // Create a new span element
                const span = document.createElement("span");
                // Set the id attribute of the span to the key
                span.id ="_"+key;
                // Set the text content of the span to the lyrics
                span.textContent = lyrics[key].lyric;
                span.style.fontFamily = lyrics[key].font;
                // Append the span to the container
                container.appendChild(span);
                // Add a line break after each span
                container.appendChild(document.createElement("br"));
            });
}
function playAudio() {
  audio.play();
}

function pauseAudio() {
  audio.pause();
}

function retrieveLyric(seconds)
{
    var currentlyric = lyrics[seconds].lyric;
    return currentlyric;
}

function retrieveFont(seconds)
{
    var currentFont = lyrics[seconds].font;
    return currentFont;
}

document.getElementById("myPlayButton").addEventListener('click', function() {
   playAudio();
  });

  document.getElementById("myStopButton").addEventListener('click', function() {
    pauseAudio();
  });



  audio.addEventListener("timeupdate", function() {
    var currentMinutes = Math.floor(audio.currentTime / 60);
    var currentSeconds = Math.floor(audio.currentTime % 60);
    var formattedTime = currentMinutes + ":" + (currentSeconds < 10 ? "0" : "") + currentSeconds;
    currentTimeDisplay.textContent = formattedTime;
    
    // Retrieve the current index based on the current time
    var currentIndex = Math.floor(audio.currentTime);
    
    // Retrieve the current lyric using the currentIndex
    var currentLyric = retrieveLyric(currentIndex);
    var currentFont = retrieveFont(currentIndex);

    
    if (currentLyric != null && previousLyric != currentLyric && previousKey != currentIndex) {
        if (currentLyric.startsWith("[")) {
            verse.textContent = currentLyric;
            if (previousKey !== null && document.getElementById("_"+previousKey)) {
                document.getElementById("_"+previousKey).style.color = ""; // Restore previous lyric color
            }

            // Highlight the current lyric
            if (document.getElementById("_"+currentIndex)) {
                document.getElementById("_"+currentIndex).style.color = "white"; // Highlight current lyric
            }

        } else {
            // If previousKey is not null and the element exists, restore its color
            if (previousKey !== null && document.getElementById("_"+previousKey)) {
                var PreviousElement = document.getElementById("_"+previousKey).style.color = ""; // Restore previous lyric color
            }

            // Highlight the current lyric
            if (document.getElementById("_"+currentIndex)) {
                document.getElementById("_"+currentIndex).style.color = "white"; // Highlight current lyric
            }

            lyric.textContent = currentLyric;
            lyric.style.fontFamily = currentFont;
            lyric.className = "_"+currentIndex;

        }
        previousLyric = currentLyric;
        previousKey = currentIndex;
    }
});

  writeLyrics();

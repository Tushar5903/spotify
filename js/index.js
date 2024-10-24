let currentsongs = new Audio();
let songs;
let currfolder;

function convertSecondsToMinutesSeconds(totalSeconds) {
    if (typeof totalSeconds !== 'number' || totalSeconds < 0) {
        return '00:00';
    }

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

const totalTimeInSeconds = 125;
const formattedTime = convertSecondsToMinutesSeconds(totalTimeInSeconds);



// this is to get the access of the data from the url

async function getsongs(folder) {
    currfolder = folder;
    let a = await fetch(`http://127.0.0.1:5500/${folder}/`);
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1])
        }
    }

    let songurl = document.querySelector(".songlist").getElementsByTagName("ul")[1]
    songurl.innerHTML = ""
    for (const song of songs) {
        songurl.innerHTML = songurl.innerHTML + `<li>
                            <img class="reverce" src="images/music.svg" alt="">
                            <div class="info">
                                <div>${song.replaceAll("20%", " ")}</div>
                                <div>unknow</div>
                            </div>
                            <div class="playnow">
                                <div class=" playbutton">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                        <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" fill="#000" stroke-width="1.5"
                                            stroke-linejoin="round" transform="scale(0.6) translate(8, 7)" />
                                    </svg>
                                </div>
                            </div>
                        </li>`;

    }

    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })

    })
    return songs

}

// this is to play the music

const playmusic = (track, pause = false) => {
    currentsongs.src = `/${currfolder}/` + track
    if (!pause) {
        currentsongs.play()
        play.src = "images/pause.svg"
    }

    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songduration").innerHTML = "00:00 / 00:00"

}

async function albums() {
    let a = await fetch(`http://127.0.0.1:5500/songs/`)
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let information = div.getElementsByTagName("a")
    let cardcontainer = document.querySelector(".cardcontainer")
    let array = Array.from(information)
    for (let index = 0; index < array.length; index++) {
        const e = array[index];
        if (e.href.includes(`/songs/`)) {
            let folder = (e.href.split("/").slice(-1)[0])
            let a = await fetch(`/songs/${folder}/info.json`)
            let response = await a.json();
            cardcontainer.innerHTML = cardcontainer.innerHTML + `
                    <div data-folder="${folder}" class="cards">
                        <div class="play playbutton">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" fill="#000" stroke-width="1.5"
                                    stroke-linejoin="round" transform="scale(0.6) translate(8, 7)" />
                            </svg>
                        </div>
                        <img src="/songs/${folder}/cover.jpg"
                            alt="">
                        <h2>${response.title}</h2>
                        <p>${response.description}</p>
                    </div>`
        }
    }

    Array.from(document.getElementsByClassName("cards")).forEach(e => {
        e.addEventListener("click", async item => {
            console.log("Fetching Songs")
            songs = await getsongs(`songs/${item.currentTarget.dataset.folder}`)
            playmusic(songs[0])
        })
    })

}



async function main() {
    songs = await getsongs("songs/chill")
    playmusic(songs[0], true)

    await albums()



    play.addEventListener("click", () => {
        if (currentsongs.paused) {
            currentsongs.play()
            play.src = "/images/pause.svg"
        }
        else {
            currentsongs.pause()
            play.src = "/images/play.svg"
        }
    })

    // ye dono work nhi kr raha ha dekh liyo yaar ek baar isma jo issue aa raha ha vo index value ka ha vo index value change nhi ho rahi ha mane check kiya tha index value baar baar -1 aa rahi ha 

    previous.addEventListener("click", () => {
        let index = songs.indexOf(currentsongs.src.split("/").slice(-1)[0])
        if ((index - 1) >= 0) {
            playmusic(songs[index - 1])
        }
    })

    next.addEventListener("click", () => {
        let index = songs.indexOf(currentsongs.src.split("/").slice(-1)[0])
        if ((index + 1) < songs.length) {
            playmusic(songs[index + 1])
        }
    })



    // add event listner to move the sneekbar according time automatically

    currentsongs.addEventListener("timeupdate", () => {
        document.querySelector(".songduration").innerHTML = `${convertSecondsToMinutesSeconds(currentsongs.currentTime)}/${convertSecondsToMinutesSeconds(currentsongs.duration)}`
        document.querySelector(".circle").style.left = (currentsongs.currentTime / currentsongs.duration) * 100 + "%";
    })

    // add event listner to move the sneekbar through click

    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentsongs.currentTime = ((currentsongs.duration) * percent) / 100
    })

    //  add event listner to display the left side during mobile representation

    document.querySelector(".mobile").addEventListener("click", e => {
        document.querySelector(".left").style.left = 0
    })

    // add elements listner to close the left side during the mobile representation

    document.querySelector(".close").addEventListener("click", e => {
        document.querySelector(".left").style.left = -120 + "%"
    })

    // add elements for the volume range working

    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        currentsongs.volume = parseInt(e.target.value) / 100
    })

    // add mute button over volume button
    document.querySelector(".volume>img").addEventListener("click", e => {
        if (e.target.src.includes("/images/volume.svg")) {
            e.target.src = e.target.src.replaceAll("/images/volume.svg", "/images/muted.svg")
            currentsongs.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0
        }
        else {
            e.target.src = e.target.src.replaceAll("/images/muted.svg", "/images/volume.svg")
            currentsongs.volume = .50;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 50
        }

    })

}

main()

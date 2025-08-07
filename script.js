console.log("script is running");

async function getsongs() {
  let a = await fetch("http://127.0.0.1:3000/songs/")
  let response = await a.text();
  console.log(response);
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  let songs = []
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("/songs/")[1]);
    }
  }
  return songs;

}

const playMusic=(track)=>{
  let audio=new Audio("/songs/"+track)
  audio.play()
}

async function main() {

  let currentsongs;

  //get list of songs
  let songs = await getsongs();
  console.log(songs);
  let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0];

  for (const song of songs) {
    songul.innerHTML = songul.innerHTML + `<li> 
    
    <div class="songinfo">
                                <img class="invert" src="music-svgrepo-com.svg" alt="">
                                
                                <div style="width: 180px;" >${song.replaceAll("%20"," ")}</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img style="height: 30px" class="invert" src="play.svg" alt="">
    
    </li>`;
  }

  Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
    e.addEventListener("click",element=>{
      console.log(e.querySelector(".info").firstElementChild.innerHTML);
      playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
    })
  })
}

main();
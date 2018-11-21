var currentSong;
document.addEventListener('DOMContentLoaded', function () {
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    if (id == null || id.length == 0) {
        return;
    }
    loadSong(id);
});

function loadSong(id) {
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var song = JSON.parse(this.responseText);
            var content = '';
            content += '<div class="song-item">';
            content += '<div class="song-thumbnail">';
            content += '<img src="' + song.thumbnail + '" alt="">';
            content += '</div>';
            content += '<div class="song-infor">';
            content += '<div class="song-name">' + song.name + '</div>';
            content += '<div class="song-singer">' + song.singer + '</div>';
            content += '<div class="song-control" onclick="shareSong();">Share</div>';
            content += '</div>';
            content += '</div>';

            document.getElementById('list-song').innerHTML = content;
            updateDetail(song);
        }
    }
    xmlHttpRequest.open('GET', SONG_DETAIL_API + '?id=' + id, true);
    xmlHttpRequest.send();
}

function updateDetail(song) {
    document.getElementById('current-play-title').innerHTML = 'Current playing: ' + song.name + " - " + song.singer;
    var player = document.getElementById('my-mp3');
    player.src = song.link;
    player.play();
    currentSong = song;
}

function shareSong() {
    if(currentSong == null){
        return;
    }
    shareOverrideOGMeta('https://tooeasy2get2points.herokuapp.com/song-detail.html?id=' + currentSong.id, currentSong.name + ' || Song I Like', currentSong.description, currentSong.thumbnail);
}




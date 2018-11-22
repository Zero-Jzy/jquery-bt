// document.addEventListener('DOMContentLoaded', function () {
//     loadSongs();
// });
//
// function loadSongs() {
//     var xmlHttpRequest = new XMLHttpRequest();
//     xmlHttpRequest.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             var listSong = JSON.parse(this.responseText);
//             var content = '';
//             for (var i = 0; i < listSong.length; i++) {
//                 content += '<div class="song-item">';
//                 content += '<div class="song-index">' + (i + 1) + '</div>';
//                 content += '<div class="song-thumbnail">';
//                 content += '<img src="' + listSong[i].thumbnail + '" alt="">';
//                 content += '</div>';
//                 content += '<div class="song-infor">';
//                 content += '<div class="song-name">' + listSong[i].name + '</div>';
//                 content += '<div class="song-singer">' + listSong[i].singer + '</div>';
//                 content += '</div>';
//                 content += '<div class="song-control" onclick="playSong(\'' + listSong[i].link + '\', \'' + listSong[i].name + '\', \'' + listSong[i].singer + '\')">Play</div>';
//                 content += '<div class="song-control"><a href="song-detail.html?id=' + listSong[i].id + '">Detail</a></div>';
//                 content += '</div>';
//             }
//             document.getElementById('list-song').innerHTML = content;
//         }
//     }
//     xmlHttpRequest.open('GET', LIST_SONG_API, true);
//     xmlHttpRequest.send();
// }
//
// function playSong(link, name, singer) {
//     document.getElementById('my-mp3').src = link;
//     document.getElementById('current-play-title').innerHTML = 'Current playing: ' + name + " - " + singer;
// }

function playSong(link, name, singer) {
    // document.getElementById('my-mp3').src = link;
    $('#my-mp3').attr('src',link);
    $('#current-play-title').html('Current playing: ' + name + ' - ' + singer);
}
$(document).ready(function(){

        $.ajax({
            url: LIST_SONG_API,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                console.log(data);
                var listSong = data;
            var content = '';
            for (var i = 0; i < listSong.length; i++) {
                content += '<div class="song-item row border rounded p-2 m-2 shadow-sm">';
                content += '<div class="d-flex align-items-center h3 col-1">' + (i + 1) + '</div>';
                content += '<div class="song-thumbnail col-2">';
                content += '<img class="w-100" src="' + listSong[i].thumbnail + '" alt="">';
                content += '</div>';
                content += '<div class="song-infor  col-4">';
                content += '<div class="song-name">' + listSong[i].name + '</div>';
                content += '<div class="song-singer">' + listSong[i].singer + '</div>';
                content += '</div>';
                content += '<div class="song-control d-flex align-items-center col-3" onclick="playSong(\'' + listSong[i].link + '\', \'' + listSong[i].name + '\', \'' + listSong[i].singer + '\')"><button class="btn btn-outline-dark rounded-circle"><i class="fa fa-play" aria-hidden="true"></i></button></div>';
                content += '<div class="song-control d-flex align-items-center col-2"><a href="song-detail.html?id=' + listSong[i].id + '">Detail</a></div>';
                content += '</div>';
            }
            $('#list-song').html(content);
            },
            error: function (jqXHR) {
                alert(data.token);
                if (Object.keys(jqXHR.responseJSON.error).length > 0) {

                    $('#summary')
                        .text(`please fix ${Object.keys(jqXHR.responseJSON.error).length} below!`);
                    validater.showErrors(jqXHR.responseJSON.error);
                    console.log(jqXHR.responseJSON.error);
                    console.log(jqXHR)
                }

            }
        });
        return false;

});



// document.addEventListener('DOMContentLoaded', function () {
//     var songForm = document.forms['song-form'];
//     if (songForm == null || songForm['btn-submit'] == null) {
//         alert('Vui lòng thử lại!');
//         return;
//     }
//     songForm['btn-submit'].onclick = function () {
//         var txtName = songForm['name'];
//         var txtDescription = songForm['description'];
//         var txtSinger = songForm['singer'];
//         var txtAuthor = songForm['author'];
//         var txtThumbnail = songForm['thumbnail'];
//         var txtLink = songForm['link'];
//         if (txtName == null
//             || txtDescription == null
//             || txtSinger == null
//             || txtAuthor == null
//             || txtThumbnail == null
//             || txtLink == null) {
//             alert('Vui lòng thử lại!');
//             return;
//         }
//
//         var jsSong = {
//             name: txtName.value,
//             description: txtDescription.value,
//             singer: txtSinger.value,
//             author: txtAuthor.value,
//             thumbnail: txtThumbnail.value,
//             link: txtLink.value
//         }
//         createSong(jsSong);
//     }
// });
//
// function createSong(jsSong) {
//     var xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 201) {
//             var song = JSON.parse(this.responseText);
//             alert(`Lưu thành công bài hát ${song.name}`);
//         } else if (this.readyState == 4 && (this.status == 401 || this.status == 403)) {
//             alert('This action required logged in to continue!')
//             window.location.href = "login.html";
//         }
//     }
//     xhr.open('POST', CREATE_SONG_API, true);
//     xhr.setRequestHeader("Content-type", "application/json");
//     xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem('token-key'));
//     xhr.send(JSON.stringify(jsSong));
// }
//
//
//
var validater = $('#song-form').validate({
    rules: {
        name: {
            required: true,
            minlength: 1,
            maxlength: 15
        },
        singer: {
            required: true,
            minlength: 1,
            maxlength: 15
        },
        description: {
            required: true,
            minlength: 1,
        },
        author: {
            required: true,
            minlength: 1,
        },
        thumbnail: {
            required: true,
            minlength: 1,
        },
        link: {
            required: true,
            minlength: 1,

        },
    },
    messages: {
        name: {
            required: '..',
            minlength: 'Tên quá ngắn, vui lòng nhập ít nhất {0} ký tự',
            maxlength: 'Tên quá dài, vui lòng nhập nhiều nhất {0} ký tự',
        },
        singer: {
            required: 'Vui lòng nhập họ của bạn.',
            minlength: 'Họ quá ngắn, vui lòng nhập ít nhất {0} ký tự',
            maxlength: 'Họ quá dài, vui lòng nhập nhiều nhất {0} ký tự',
        },
        description: {
            required: '..',
            minlength: 'Tên quá ngắn, vui lòng nhập ít nhất {0} ký tự',
        },
        author: {
            required: '..',
            minlength: 'Tên quá ngắn, vui lòng nhập ít nhất {0} ký tự',
        },
        thumbnail: {
            required: '..',
            minlength: 'Tên quá ngắn, vui lòng nhập ít nhất {0} ký tự',
        },

        link: {
            required: '..',
            minlength: 'Tên quá ngắn, vui lòng nhập ít nhất {0} ký tự',
        },
    },
    submitHandler: function (form, event) {
        event.preventDefault();
        var senderObject = {
            name: $(form['name']).val(),
            singer: $(form['singer']).val(),
            description: $(form['description']).val(),
            author: $(form['author']).val(),
            thumbnail: $(form['thumbnail']).val(),
            link: $(form['link']).val(),
        };
        $.ajax({
            url: CREATE_SONG_API,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(senderObject),
            headers: { 'authorization': "Basic "+localStorage.getItem('my-token') },
            success: function (data, textStatus, jqXHR) {
                alert(`Lưu thành công bài hát ${data.name}`);
            },
            error: function (jqXHR, textStatus, errorThrown) {
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
    }
});

function formatDate(date) {
    var d = new Date(date),
        month = ' ' + (d.getMonth() + 1),
        day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
}

var validater = $('#login-form').validate({
    rules: {
        email: {
            required: true,
            email: true
        },
        password: {
            required: true,
            minlength: 2,
            maxlength: 15
        }
    },
    messages: {
        email: {
            required: 'Vui lòng email của bạn.',
            email: 'Vui lòng nhập email đúng định dạng'
        },
        password: {
            required: 'Vui lòng nhập password.',
            minlength: 'Password quá ngắn, vui lòng nhập ít nhất {0} ký tự',
            maxlength: 'Password quá dài, vui lòng nhập nhiều nhất {0} ký tự',
        }
    },
    submitHandler: function (form, event) {
        event.preventDefault();
        var senderObject = {
            password: $(form['password']).val(),
            email: $(form['email']).val(),
        };
        $.ajax({
            url: LOGIN_API,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(senderObject),
            success: function (data) {
                alert(data.token);
               localStorage.setItem('my-token',data.token)
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
    }
});

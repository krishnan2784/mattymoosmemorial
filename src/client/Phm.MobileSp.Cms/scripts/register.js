$('.regstration-form').submit(e => {
    e.preventDefault();
    $('.registration-message').remove();
    var form = $('.regstration-form');

    if ($('.password').val() == '')
        return;
    var p1 = $('.password').val();
    var p2 = $('.password-confirmation').val();
    if (p1 != p2) {
        $('<div class="registration-message error clearfix center pass-error">The passwords you entered do not match. Please enter them again.</div>').insertAfter('.password-confirmation');
        return;
    }

    $.post($(form).attr('action'), $(form).serialize()).done((data) => {
        $('<div class="registration-message clearfix center">' + data.message + '</div>').insertAfter('.login-form');
        if (data.success) {
            $('.login-form, .welcome-message').remove();
            $('.registration-message').addClass('success');
        } else
            $('.registration-message').addClass('error');
    });
});
function doPasswordsMatch() {
    var p1 = $('.password').val();
    var p2 = $('.password-confirmation').val();
    if (p1 == '' || p1 != p2)
        return false;
    $('.pass-error').remove();
    return true;
}
$('.password').on("input", doPasswordsMatch());
$('.password-confirmation').on("input", doPasswordsMatch());
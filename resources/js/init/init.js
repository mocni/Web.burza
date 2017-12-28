var $heroHeight = $('.section__hero').outerHeight(true),
    $header = $('.header'),
    heroClass = 'header__fixed',
    $body = $('body, html'),
    $href = 'a[href^="#"]',
    $form = $('form'),
    url = "script.php",
    $success = "<p class='message message__success'>Uspješno ste poslali poruku.</p>",
    $error = "<p class='message message__error'>Došli je do greške.</p>";

scrollAnimation();

function scrollAnimation() {
    $(window).scroll(function () {
        $(this).scrollTop() > $heroHeight ? $header.addClass(heroClass) : $header.removeClass(heroClass);
    });
}

function goToId(newId) {
    var id = newId.attr('href'),
        pos = $(id).offset().top - $header.height();

    $body.animate({
        scrollTop: pos
    });
}


$(document).on('click', $href, function (event) {
    event.preventDefault();
    goToId($(this));
});

function submitForm() {
    $.ajax({
        type: "POST",
        url: url,
        data: $form.serialize(),
        success: function (data) {
            $form.append($success);
        },
        error: function (data) {
            $form.append($error);
        }
    });
}

$form.submit(function (event) {
    event.preventDefault();
    submitForm();
});
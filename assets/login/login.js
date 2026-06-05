$(function() {
    $('.radio-inline').click(function() {
        $('.choice>span').removeClass("checked");
        $('.choice>span', $(this)).addClass("checked");

        $('input[type="radio"]').prop('checked', false);
        $('input[type="radio"]', $(this)).prop('checked', true);
    });
});
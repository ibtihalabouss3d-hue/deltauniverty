CKEDITOR.plugins.add('photouploader', {

    init: function(editor) {
        var pluginName = 'photouploader';
        editor.ui.addButton('Photo', {
            label: 'Upload Image File',
            command: 'UploadPhoto',
            icon: CKEDITOR.plugins.getPath('photouploader') + 'photo.png'
        });
        var cmd = editor.addCommand('UploadPhoto', {
            exec: uploadPhoto
        });
    }
});

function uploadPhoto(e) {
    document.getElementById("flPhoto").value = "";
    $('#dvtxt').html("Please select a file to start uploading it..");
    $('#dvicon, #message').removeAttr('class');
    $('#message').attr("class", "MessageLoading");
    $('#dvicon').html('');
    $('#percentage').html('');
    $('.progress-bar').width('0%');
    var GetIdByClass = document.getElementsByClassName(e.id);
    $("#StoreId").val(GetIdByClass[0].id);
    $('#Modal-UploadFile').modal("show");
    $('#Modal-UploadFile').attr('data-type', 'photo').find('.modal-title').text('Upload Image File');
    $('#Modal-UploadFile').find('.media-size').show();
}
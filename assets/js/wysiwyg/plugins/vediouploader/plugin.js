CKEDITOR.plugins.add('vediouploader', {
    init: function(editor) {
        var pluginName = 'vediouploader';
        editor.ui.addButton('Vedio', {
            label: 'Upload Vedio File',
            command: 'UploadVedio',
            icon: CKEDITOR.plugins.getPath('vediouploader') + 'movie.png'
        });
        var cmd = editor.addCommand('UploadVedio', {
            exec: uploadVedio
        });
    }
});

function uploadVedio(e) {
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
    $('#Modal-UploadFile').attr('data-type', 'vedio').find('.modal-title').text('Upload Vedio File');
    $('#Modal-UploadFile').find('.media-size').show();
}
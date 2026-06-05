CKEDITOR.plugins.add('fileuploader', {

    init: function(editor) {
        var pluginName = 'fileuploader';
        editor.ui.addButton('File', {
            label: 'Upload File',
            command: 'UploadFile',
            icon: CKEDITOR.plugins.getPath('fileuploader') + 'file.png'
        });
        var cmd = editor.addCommand('UploadFile', {
            exec: uploadFile
        });
    }
});

function uploadFile(e) {
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
    $('#Modal-UploadFile').attr('data-type', 'file').find('.modal-title').text('Upload File');
    $('#Modal-UploadFile').find('.media-size').hide();
}
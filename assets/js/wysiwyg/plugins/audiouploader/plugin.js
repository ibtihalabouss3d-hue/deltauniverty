CKEDITOR.plugins.add('audiouploader', {
    init: function(editor) {
        var pluginName = 'audiouploader';
        editor.ui.addButton('Audio', {
            label: 'Upload Audio File',
            command: 'UploadAudio',
            icon: CKEDITOR.plugins.getPath('audiouploader') + 'audio.png'
        });
        var cmd = editor.addCommand('UploadAudio', {
            exec: uploadAudio
        });
    }
});

function uploadAudio(e) {
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
    $('#Modal-UploadFile').attr('data-type', 'audio').find('.modal-title').text('Upload Audio File');
    $('#Modal-UploadFile').find('.media-size').hide();
}
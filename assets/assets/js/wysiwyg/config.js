/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function(config) {
    // Define changes to default configuration here. For example:
    // config.language = 'fr';
    // config.uiColor = '#AADC6E';

    // Toolbar configuration generated automatically by the editor based on config.toolbarGroups.
    config.extraPlugins = ['vediouploader', 'photouploader', 'audiouploader', 'fileuploader', 'ckeditor_wiris', 'youtube', 'eqneditor', 'dialog', 'dialogui'];
    config.allowedContent = true;
    config.extraAllowedContent = 'video [*]{*}(*); source [*]{*}(*);';
    config.toolbar = [{
            name: 'document',
            groups: ['mode', 'document', 'doctools'],
            items: ['Source', '-', 'NewPage', 'Preview', '-', 'Templates']
        },
        {
            name: 'clipboard',
            groups: ['clipboard', 'undo'],
            items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo']
        },
        {
            name: 'editing',
            groups: ['find', 'selection', 'spellchecker'],
            items: ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt']
        },
        {
            name: 'basicstyles',
            groups: ['basicstyles', 'cleanup'],
            items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat', 'youtube']
        },
        {
            name: 'paragraph',
            groups: ['list', 'indent', 'blocks', 'align', 'bidi'],
            items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language']
        },
        {
            name: 'links',
            items: ['Link', 'Unlink', 'Anchor']
        },
        {
            name: 'insert',
            items: ['Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe', 'Youtube', 'EqnEditor']
        },
        {
            name: 'styles',
            items: ['Styles', 'Format', 'Font', 'FontSize']
        },
        {
            name: 'colors',
            items: ['TextColor', 'BGColor']
        },
        {
            name: 'tools',
            items: ['Maximize', 'ShowBlocks']
        },
        {
            name: 'others',
            items: ['-']
        },
        {
            name: 'media',
            items: ['Photo', 'Vedio', 'Audio', 'File'],
        }
    ];
    config.removePlugins = 'elementspath';
    config.resize_enabled = false;
    config.height = 70;
    config.title = false;
};
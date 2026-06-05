var WeekDay = new Array(7);
var ShortWeekDay = new Array(7);
var doneTypingInterval = 1000;
var typingTimer;

$(function() {

    WeekDay[0] = "Sunday";
    WeekDay[1] = "Monday";
    WeekDay[2] = "Tuesday";
    WeekDay[3] = "Wednesday";
    WeekDay[4] = "Thursday";
    WeekDay[5] = "Friday";
    WeekDay[6] = "Saturday";
    ShortWeekDay[0] = "Sun,";
    ShortWeekDay[1] = "Mon,";
    ShortWeekDay[2] = "Tue,";
    ShortWeekDay[3] = "Wed,";
    ShortWeekDay[4] = "Thu,";
    ShortWeekDay[5] = "Fri,";
    ShortWeekDay[6] = "Sat,";

    $(document).tooltip();
});

///////////////////////////////////////////////////////// sidebar search ///////////////////////////////////////////////////////////////////////
$sideSearchElementId = '';
$(document).on('click', '.input-side-search>.btn-search', function(e) {
    searchelement = $(this);
    if ($sideSearchElementId != searchelement.parent().attr("data-id"))
        clearSideSearch();
    if (!$('#side-search').is(':visible'))
        $('#side-search').toggle('slide', {
            direction: "right"
        });
    $sideSearchElementId = searchelement.parent().attr("data-id");
    $('#side-search').find('input[type="text"]').focus();
});
$(document).on('click', '.input-side-search>.div-search', function(e) {
    searchelement = $(this);
    if ($sideSearchElementId != searchelement.parent().attr("data-id"))
        clearSideSearch();
    if (!$('#side-search').is(':visible'))
        $('#side-search').toggle('slide', {
            direction: "right"
        });
    $sideSearchElementId = searchelement.parent().attr("data-id");
    $('#side-search').find('input[type="text"]').focus();
});
$(document).on('focus', '.input-side-search>.txt-search', function(e) {
    searchelement = $(this);
    if ($sideSearchElementId != searchelement.parent().attr("data-id"))
        clearSideSearch();
    if (!$('#side-search').is(':visible'))
        $('#side-search').toggle('slide', {
            direction: "right"
        });
    $sideSearchElementId = searchelement.parent().attr("data-id");
    $('#side-search').find('input[type="text"]').focus();
});
$(document).on('keyup', '#side-search input[type="text"]', function(e) {
    if (e.keyCode == 27 /*ESC btn*/ ) {
        $('#side-search .footer button').trigger('click');
    } else {
        if ($(this).val() == '') {
            $('#side-search .search-status').html('<i class="fa fa-search fa-2x"></i>');
            $('#side-search .list-group').html('<li class="padder-v-xs">' +
                '<div class="text-center text-muted message m-t-lg">' +
                '<i class="fa fa-folder-open fa-3x text-light"></i>' +
                '<span class="m-t-xs block">The search results will apears here after loading,<br /> And you can select from it.</span>' +
                '</div>' +
                '</li>');
            $('#side-search .more-load').html('');
        } else {
            if (search_value != $(this).val() || e.keyCode == 13 /*Enter btn*/ ) {
                search_value = $(this).val();
                $('#side-search .search-status').html('<img src="../assets/img/Preloader_3.gif" class="x24" >');
                if ($('#side-search .body>.lock').length == 0)
                    $('#side-search .body').append('<div class="lock"></div>');
                clearTimeout(typingTimer);
                typingTimer = setTimeout(function() {
                    loadMoreDataSideSearch(false);
                }, doneTypingInterval);
            }
        }
    }
});
$(document).on('mousedown', '#side-search .list-group-item', function(evt) {
    $(document).on('mouseup mousemove', '#side-search .list-group-item', function handler(evt) {
        if (evt.type === 'mouseup' && evt.button === 0) {
            var $me = $(this);
            if (searchelement.parent().hasClass('multiple')) {
                if (searchelement.find('.label[data-id=' + $me.attr('data-id') + ']').length == 0) {
                    var $item = $('<span data-id=' + $me.attr('data-id') + ' class="label label-default" ><div class="pull-right">' + CropLongText($me.find('.name').text(), 30, "") + '</div><span class="multiple-delete"><i class="fa fa-times"></i></span></span>');
                    searchelement.append($item);
                }
            } else {
                searchelement.val($me.find('.name').text()).attr('data-id', $me.attr('data-id')).attr('data-type', $me.attr('data-type'));
                searchelement.parent().find('.delete').show();
            }

            var $excutefun = searchelement.parent().data("excutefun");
            if (typeof $excutefun != 'undefined' && $excutefun != null) {
                var paramsobj = jQuery.parseJSON($me.attr("data-obj"));
                executeFunction(window, $excutefun, searchelement, paramsobj);
            }

            if ($('#side-search').is(':visible'))
                $('#side-search').toggle('slide', {
                    direction: "right"
                });
        }
        $(document).off('mouseup mousemove', handler);
    });
});
$(document).on('click', '.input-side-search>.delete', function() {
    $('input[type="text"]', $(this).parent()).val('').removeAttr('data-id');
    var $excutefun = $(this).data("excutefun");
    if (typeof $excutefun != 'undefined' && $excutefun != null)
        executeFunction(window, $excutefun, searchelement, null);
    $(this).hide();
});
$(document).on('click', '.input-side-search .multiple-delete', function(e) {
    e.stopPropagation();
    var $me = $(this);
    $me.parent().remove();
});
$(document).on('click', '#side-search .footer button', function(e) {
    if ($('#side-search').is(':visible'))
        $('#side-search').toggle('slide', {
            direction: "right"
        });
});

function scrollSideSearch(o) {
    if (o.offsetHeight + o.scrollTop - 1 == o.scrollHeight) {
        $('#side-search .more-load').html('<img src="../assets/img/Preloader_3.gif" class="x17" >Loading More Results. Please Wait...');
        $('#side-search .body').append('<div class="lock"></div>');
        $('#side-search input[type="text"]').prop("disabled", true);
        loadMoreDataSideSearch(true);
    }
}

function loadMoreDataSideSearch($isScroll) {
    debugger;
    var $searchValue = $('#side-search input[type="text"]').val();
    var $searchtype = searchelement.parent().data('type');
    var $statusids = searchelement.parent().data('status');
    var $statusids_tr = searchelement.parent().data('status_tr');
    var $lastOne = ($isScroll ? $('.list-group-item:last', '#side-search .list-group').attr('data-index') : 0);
    var $function, $params;

    if ($searchtype == 'applicants') { // applicants
        $function = "SearchApplicants";
        $params = JSON.stringify({
            SearchValue: $searchValue,
            StatusesIds: $statusids,
            StatusesIds_Tr: $statusids_tr,
            LastNum: $lastOne,
            CurrentAdded: ''
        });
    } else if ($searchtype == 'students') { // students
        $function = "SearchStudents";
        $params = JSON.stringify({
            SearchValue: $searchValue,
            FacultyId: -1,
            SemesterId: -1,
            AcademicStatusesIds: searchelement.parent().data('status'),
            LastNum: $lastOne,
            CurrentAdded: ""
        })
    } else if ($searchtype == 'withdrawapplicants') { // withdrawapplicants
        $function = "SearchWithdrawApplicants";
        $params = JSON.stringify({
            SearchValue: $searchValue,
            StatusesIds: $statusids,
            StatusesIds_Tr: $statusids_tr,
            LastNum: $lastOne,
            CurrentAdded: ''
        });

    }
    debugger;
    $.ajax({
        type: "POST",
        url: "/Financial/" + $function,
        data: $params,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(response) {
            $('#side-search .body>.lock').remove();
            $('#side-search .more-load').html('');
            $('#side-search input[type="text"]').prop("disabled", false);
            if (response["ResultType"] == 'Success') {
                var $searchObj = response["ResultMessage"];
                if ($searchObj.length == 0) {
                    if (!$isScroll) {
                        $('#side-search .search-status').html('<strong class="text-info" style="line-height:28px;">0 Results</strong>');
                        $('#side-search .list-group').html('<li class="padder-v-xs">' +
                            '<div class="text-center text-muted message m-t-lg">' +
                            '<i class="fa fa-folder-open fa-3x text-light"></i>' +
                            '<span class="m-t-xs block">No results obtained</span>' +
                            '</div>' +
                            '</li>');
                    } else {
                        $('#side-search .more-load').html('<i class="fa fa-folder-open"></i>No More Results');
                    }
                } else {
                    if (!$isScroll) {
                        $('#side-search .search-status').html('<strong class="text-info" style="line-height:28px;">' + $searchObj[0]["SearchResultCount"] + ' Results</strong>');
                        $('#side-search .list-group').empty().scrollTop();
                    }
                    if ($searchtype == 'applicants') // applicants
                    {
                        for (var i = 0; i < $searchObj.length; i++) {
                            $item = '<li class="list-group-item" data-obj=\'' + JSON.stringify($searchObj[i]) + '\' data-id="' + $searchObj[i]["RequestId"] + '" data-type="' + $searchObj[i]["ApplicantType"] + '" data-index="' + (parseInt($lastOne) + i + 1) + '">' +
                                '<div class="media">' +
                                '<div class="pull-left">' + ($searchObj[i]["FilteringStatus"] == "1" ? '<span class="text-warning">Candidate<i class="fa fa-filter"></i></span>' : $searchObj[i]["FilteringStatus"] == "2" ? '<span class="text-success">' + $searchObj[i]["StudentCode"] + '<i class="fa fa-check"></i></span>' : $searchObj[i]["FilteringStatus"] == "3" ? '<span class="text-danger">Blocked<i class="fa fa-lock"></i></span>' : $searchObj[i]["FilteringStatus"] == "4" ? '<span class="text-info">Withdrawn<i class="fa fa-mail-reply-all"></i></span>' : '') + '</div>' +
                                '<div class="arabic name">' + $searchObj[i]["NameAr"] + '</div><div class="text-muted arabic m-t-xs">' + $searchObj[i]["CertificateName"] + '</div>' +
                                '</div>' +
                                '</li>';
                            $($item).appendTo($('#side-search .list-group'));
                        }
                    } else if ($searchtype == 'students') // students
                    {
                        for (var i = 0; i < $searchObj.length; i++) {
                            $item = '<li class="list-group-item" data-obj=\'' + JSON.stringify($searchObj[i]) + '\' data-id="' + $searchObj[i]["StudentId"] + '" data-index="' + (parseInt($lastOne) + i + 1) + '">' +
                                '<div class="media">' +
                                '<div class="pull-left"><span style="color:' + $searchObj[i]["StatusColor"] + '">' + $searchObj[i]["StatusName"] + '<i class="fa fa-circle"></i></span></div>' +
                                '<div class="arabic name">' + $searchObj[i]["NameAr"] + '</div><div class="text-muted m-t-xs"><span class="code">' + $searchObj[i]["StudentId"] + "</span> -- Faculty of " + $searchObj[i]["Faculty"] + '</div>' +
                                '</div>' +
                                '</li>';
                            $($item).appendTo($('#side-search .list-group'));
                        }
                    } else if ($searchtype == 'withdrawapplicants') // applicants
                    {
                        for (var i = 0; i < $searchObj.length; i++) {
                            $item = '<li class="list-group-item" data-obj=\'' + JSON.stringify($searchObj[i]) + '\' data-id="' + $searchObj[i]["RequestId"] + '" data-type="' + $searchObj[i]["ApplicantType"] + '" data-index="' + (parseInt($lastOne) + i + 1) + '">' +
                                '<div class="media">' +
                                '<div class="pull-left">' + ($searchObj[i]["FilteringStatus"] == "1" ? '<span class="text-warning">Candidate<i class="fa fa-filter"></i></span>' : $searchObj[i]["FilteringStatus"] == "2" ? '<span class="text-success">' + $searchObj[i]["StudentCode"] + '<i class="fa fa-check"></i></span>' : $searchObj[i]["FilteringStatus"] == "3" ? '<span class="text-danger">Blocked<i class="fa fa-lock"></i></span>' : $searchObj[i]["FilteringStatus"] == "4" ? '<span class="text-info">Withdrawn<i class="fa fa-mail-reply-all"></i></span>' : '') + '</div>' +
                                '<div class="arabic name">' + $searchObj[i]["NameAr"] + '</div><div class="text-muted arabic m-t-xs">' + $searchObj[i]["CertificateName"] + '</div>' +
                                '</div>' +
                                '</li>';
                            $($item).appendTo($('#side-search .list-group'));
                        }
                    }
                    highlightSideSearch();
                }
            } else if (response["ResultType"] == 'SessionError') {
                $('#side-search .search-status').html('<i class="fa fa-search fa-2x"></i>');
                SessionDied();
            } else if (response["ResultType"] == 'KnownError') {
                $('#side-search .search-status').html('<i class="fa fa-search fa-2x"></i>');
                $('#side-search .list-group').html('<li class="padder-v-xs">' +
                    '<div class="text-center text-danger message m-t-lg">' +
                    '<i class="fa fa-warning fa-3x text-light"></i>' +
                    '<span class="m-t-xs block">' + response["ResultMessage"] + '</span>' +
                    '</div>' +
                    '</li>');
            }
        },
        error: function(request, status, error) {
            if (request.status == 302) {
                SessionDied();
            } else {
                $('#side-search .search-status').html('<i class="fa fa-search fa-2x"></i>');
                $('#side-search .body>.lock').remove();
                $('#side-search .more-load').html('');
                $('#side-search input[type="text"]').prop("disabled", false);
                $('#side-search .list-group').html('<li class="padder-v-xs">' +
                    '<div class="text-center text-danger message m-t-lg">' +
                    '<i class="fa fa-warning fa-3x text-light"></i>' +
                    '<span class="m-t-xs block">Unknown error, Can not preform this operation<br />Please call technical support</span>' +
                    '</div>' +
                    '</li>');
            }

        }
    });
}

function clearSideSearch() {
    search_value = '';
    $('#side-search input[Type="text"]').val('');
    $('#side-search .search-status').html('<i class="fa fa-search fa-2x"></i>');
    $('#side-search .list-group').html('<li class="padder-v-xs">' +
        '<div class="text-center text-muted message m-t-lg">' +
        '<i class="fa fa-folder-open fa-3x text-light"></i>' +
        '<span class="m-t-xs block">The search results will apears here after loading,<br /> And you can select from it.</span>' +
        '</div>' +
        '</li>');
    $('#side-search .more-load').html('');
}

function highlightSideSearch() {
    var input = $('#side-search input').val().toLowerCase();
    if (isNaN(parseInt(input)) || $("#side-search .list-group-item").find('.code').length < 1) {
        var arr = input.replace(/أ/g, 'ا').replace(/آ/g, 'ا').replace(/إ/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').split(' ');
        $("#side-search .list-group-item").each(function() {
            $name = $(this).find('.name');
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] != "") {
                    $index = $name.html().toLowerCase().replace(/أ/g, 'ا').replace(/آ/g, 'ا').replace(/إ/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').indexOf(arr[i])
                    $lenth = arr[i].length
                    if ($index >= 0)
                        $name.html($name.html().slice(0, $index) + '<span class="text-danger">' + $name.html().slice($index, $index + $lenth) + "</span>" + $name.html().slice($index + $lenth));
                }
                //$name.html($name.html().replace(new RegExp(arr[i], 'g'), '<span class="text-danger">' + arr[i] + '</span>'));
            }
        });
    } else {
        $("#side-search .list-group-item").each(function() {
            $code = $(this).find('.code');
            $index = $code.html().indexOf(input)
            $lenth = input.length
            $code.html($code.html().slice(0, $index) + '<span class="text-danger">' + $code.html().slice($index, $index + $lenth) + "</span>" + $code.html().slice($index + $lenth));
        });
    }
}

////////////////////////////////////////////////////////// page search ///////////////////////////////////////////////////////////////////////
$(document).on('keyup', '.search-table input[type="text"]', function() {
    var $me = $(this);
    var $tbl = $me.closest('.panel').find('.dataTable');
    $me.parent().find('.search-table-load').html('<img src="../assets/img/Preloader_3.gif" class="x17" >');
    clearTimeout(typingTimer);
    typingTimer = setTimeout(function() {
        var searchvalue = $me.val().toLowerCase();
        // get indexes of search columns 
        var arr = [];
        $('.search-table input[type="checkbox"]').each(function() {
            if ($(this).is(':checked'))
                arr.push($(this).data("index"));
        });

        // start search
        var index = 1;
        $tbl.find("tbody tr").each(function() {
            var $me = $(this);
            var text = '';
            for (var i = 0; i < arr.length; i++) {
                if (parseInt(arr[i]) != -1) {
                    text += ((typeof $me.children('td').eq(arr[i]).attr("title") == 'undefined') ? $me.children('td').eq(arr[i]).text().toLowerCase() + ' ' : $me.children('td').eq(arr[i]).attr("title").toLowerCase() + ' ');
                }
            }
            if (text.indexOf(searchvalue) == -1)
                $me.hide();
            else
                $me.show().children('td').eq(0).text(index++);
        });

        // re-initlize some controls
        //$('.table').find('input[type=checkbox]').prop('indeterminate', false).prop('checked', false);
        //$('.table td').css("background-color", "");
        //if ($('.table-body tr:visible').length > 0)
        //    $('.table thead input[type=checkbox]').prop("disabled", false);
        //else
        //    $('.table thead input[type=checkbox]').prop("disabled", true);

        // totals 
        $me.closest('.panel').find('.table-total').text($tbl.find("tbody tr:visible").length + " ");

        $me.parent().find('.search-table-load').empty();

        // execute more code
        var excutefun = $me.parent().data("excutefun");
        if (typeof excutefun != 'undefined' && excutefun != null)
            executeFunction(window, excutefun, null /*, params here*/ );
    }, doneTypingInterval);
});

$(document).on('keyup', '.search-items input[type="text"]', function() {
    var $me = $(this);
    $me.parent().find('.search-items-load').html('<img src="../assets/img/Preloader_3.gif" class="x17" >');
    clearTimeout(typingTimer);
    typingTimer = setTimeout(function() {
        var searchvalue = $me.val().toLowerCase();

        $('.search-items input[type="checkbox"]:not(:first)').each(function() {
            $('.' + $(this).data("class")).removeHighlight();
            if ($(this).is(':checked'))
                $('.' + $(this).data("class")).highlight(searchvalue);
        });

        $me.parent().find('.search-items-load').empty();

        // execute more code
        var excutefun = $me.parent().data("excutefun");
        if (typeof excutefun != 'undefined' && excutefun != null)
            executeFunction(window, excutefun, null /*, params here*/ );
    }, doneTypingInterval);
});

jQuery.fn.highlight = function(pat) {
    function innerHighlight(node, pat) {
        var skip = 0;
        if (node.nodeType == 3) {
            var pos = node.data.toUpperCase().indexOf(pat);
            pos -= (node.data.substr(0, pos).toUpperCase().length - node.data.substr(0, pos).length);
            if (pos >= 0) {
                var spannode = document.createElement('span');
                spannode.className = 'highlight';
                var middlebit = node.splitText(pos);
                var endbit = middlebit.splitText(pat.length);
                var middleclone = middlebit.cloneNode(true);
                spannode.appendChild(middleclone);
                middlebit.parentNode.replaceChild(spannode, middlebit);
                skip = 1;
            }
        } else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
            for (var i = 0; i < node.childNodes.length; ++i) {
                i += innerHighlight(node.childNodes[i], pat);
            }
        }
        return skip;
    }
    return this.length && pat && pat.length ? this.each(function() {
        innerHighlight(this, pat.toUpperCase());
    }) : this;
};

jQuery.fn.removeHighlight = function() {
    return this.find("span.highlight").each(function() {
        this.parentNode.firstChild.nodeName;
        with(this.parentNode) {
            replaceChild(this.firstChild, this);
            normalize();
        }
    }).end();
};



////////////////////////////////////////////////////////// dropdownlist search ///////////////////////////////////////////////////////////////////////
$(document).on('click', '.dropdown-search button', function() {
    $(this).parent().find('input[type=text]').focus();
});
$(document).on('click', '.dropdown-search .dropdown-input, .dropdown-search ul>div', function(e) {
    e.stopPropagation();
});
$(document).on('click', '.dropdown-search li', function() {
    var $me = $(this);
    $me.closest('.dropdown-search').find('li.selected').removeClass('selected');
    $me.addClass('selected');
    $me.closest('.dropdown-search').removeClass('open').find('.dropdown-label').text($me.text());

    // execute more code
    var excutefun = $me.closest('.dropdown-search').data("excutefun");
    if (typeof excutefun != 'undefined' && excutefun != null) {
        executeFunction(window, excutefun, null, null);
    }
});
$(document).on('keyup', '.dropdown-search input[type="text"]', function() {
    var $val = $(this).val().toLowerCase();
    $(this).closest('.dropdown-search').find('.dropdown-list').find("li").each(function() {
        var $me = $(this);
        ($me.text().toLowerCase().indexOf($val) == -1) ? $me.hide(): $me.show();
    });
});

/////////////////////////////////////////////////////////// sorting //////////////////////////////////////////////////////////////////////

$(document).on('click', '.sortable', function() {
    var $me = $(this);
    var $table = $me.closest('table');
    if ($table.find("tbody > tr").length > 0) {
        var dir;
        if ($me.find('.fa-caret-up').hasClass('inactive') == true) {
            $me.parent().find('i').addClass('inactive');
            $me.find('.fa-caret-up').removeClass('inactive');
            dir = 1;
        } else {
            $me.parent().find('i').addClass('inactive');
            $me.find('.fa-caret-down').removeClass('inactive');
            dir = -1;
        }
        var col = $me.prevAll().length;

        var excutefun = $table.data("excutefun");
        if (typeof excutefun != 'undefined' && excutefun != null)
            executeFunction(window, excutefun, $table, null);
        else
            sortTable($table, dir, col);
    }
});

function sortTable($table, dir, col) {
    var rows = $table.find('tbody > tr').get();
    rows.sort(function(a, b) {

        //var A = ((typeof $(a).children('td').eq(col).attr("title") == 'undefined') ? $(a).children('td').eq(col).text().toUpperCase() : $(a).children('td').eq(col).attr("title"));
        //var B = ((typeof $(b).children('td').eq(col).attr("title") == 'undefined') ? $(b).children('td').eq(col).text().toUpperCase() : $(b).children('td').eq(col).attr("title"));

        var A = $(a).children('td').eq(col).text().toUpperCase()
        var B = $(b).children('td').eq(col).text().toUpperCase()

        if (A < B) {
            return -1 * dir;
        }
        if (A > B) {
            return 1 * dir;
        }
        return 0;
    });

    var index2 = 1
    $.each(rows, function(index, row) {
        $table.children('tbody').append(row);
        if ($(row).is(":visible"))
            $(row).children('td').eq(0).text(index2++);
    });
}

////////////////////////////////////////////////////////// selecting ///////////////////////////////////////////////////////////////////////

$(document).on('change', 'table thead [type="checkbox"]', function(e) {
    e && e.preventDefault();
    var $table = $(e.target).closest('table'),
        $checked = $(e.target).is(':checked');
    $('tbody tr:visible [type="checkbox"]', $table).prop('checked', $checked);
    $('tbody tr:visible [type="checkbox"]', $table).closest('tr').find('td').css("background-color", $checked ? "#e4f5e7" : "")
    var excutefun = $(this).data("excutefun");
    if (typeof excutefun != 'undefined' && excutefun != null)
        executeFunction(window, excutefun, $table, null);
});

$(document).on('change', 'table tbody [type="checkbox"]', function() {
    var $me = $(this);
    if ($me.prop("checked") == true)
        $me.closest('tr').find('td').css("background-color", "#e4f5e7")
    else
        $me.closest('tr').find('td').css("background-color", "")

    var $table = $me.closest('table')
    var totalrows = $('tbody tr:visible', $table).length;
    var checkedrows = $('tbody [type="checkbox"]:checked', $table).length;
    if (checkedrows == 0) {
        $('thead [type=checkbox]', $table).prop('indeterminate', false).prop('checked', false);
    } else if (checkedrows == totalrows) {
        $('thead [type=checkbox]', $table).prop('indeterminate', false).prop('checked', true);
    } else {
        $('thead [type=checkbox]', $table).prop('indeterminate', true);
    }

    var excutefun = $('thead [type="checkbox"]', $table).data("excutefun");
    if (typeof excutefun != 'undefined' && excutefun != null)
        executeFunction(window, excutefun, $table, null);
});

//////////////////////////////////////////////// lock //////////////////////////////////////////////////////////////////

$(document).on('click', '.btn-lock', function() {
    $.ajax({
        type: "GET",
        url: "/Login/Lock",
        contentType: 'application/json; charset=utf-8',
        dataType: 'JSON',
        success: function(data) {
            if (data.Status == 1) {
                $('.lock-modal').fadeIn();
                $('#txt_psw_lock').focus();
            }
        },
        error: function(data) {}
    });
});
$(document).on('click', '.btn-continue-lock', function() {
    var $me = $(this);
    var u_name = $('#username').html();
    var u_pass = $('#txt_psw_lock').val();
    var u_type = $('#LoginType').val();
    $me.attr('disabled', true).html('<img class="x17" src="../assets/img/Preloader_3.gif" />');
    $.ajax({
        type: "POST",
        url: "/Login/UnLockScreen",
        data: JSON.stringify({
            Username: u_name,
            Password: u_pass,
            Type: u_type
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(response) {
            $me.attr('disabled', false).html('<i class="fa fa-arrow-right"></i>');
            if (response.Status == 0) {
                $("#message-lock").html('Wrong password !!');
                $("#message-lock").css('color', '#b72e06');
                $("#txt_psw_lock").css({
                    'box-shadow': 'inset 0 0 5px rgba(241, 15, 15, 0.8)',
                    'border-color': '#bd5031'
                });
                $("#message-lock").fadeIn(600);
            } else {
                $('.lock-modal').fadeOut();
                $('#txt_psw_lock').val('');
            }
            $('#txt_psw_lock').focus();
        },
        error: function() {
            $me.attr('disabled', false).html('<i class="fa fa-arrow-right"></i>');
        }
    });
});
$(document).on('click', '.btn-continue-deid', function() {
    var $me = $(this);
    var u_name = $('#username').html();
    var u_pass = $('#txt_psw_deid').val();
    var u_type = $('#LoginType').val();
    $me.attr('disabled', true).html('<img class="x17" src="../assets/img/Preloader_3.gif" />');
    $.ajax({
        type: "POST",
        url: "/Login/UnLockScreen",
        data: JSON.stringify({
            Username: u_name,
            Password: u_pass,
            Type: u_type
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(response) {
            $me.attr('disabled', false).html('<i class="fa fa-arrow-right"></i>');
            if (response.Status == 0) {
                $("#message_died").html('Wrong password !!');
                $("#message_died").css('color', '#b72e06');
                $("#txt_psw_deid").css({
                    'border-color': '#bd5031'
                });
                $("#message_died").fadeIn(600);
            } else {
                $('.session-relogin').fadeOut();
                $('#txt_psw_deid').val('');
            }
            $('#txt_psw_deid').focus();
        },
        error: function() {
            $me.attr('disabled', false).html('<i class="fa fa-arrow-right"></i>');
        }
    });
});

function SessionDied() {
    $('#txt_psw_lock').val('');
    $('.session-relogin').fadeIn();
    $('#txt_psw_deid').focus();
}
var locktimer;

//function resetLockTimer() {
//    clearTimeout(locktimer);
//    locktimer = setTimeout($('.btn-lock').trigger('click'), 3600000);  // time is in milliseconds
//}

////////////////////////////////////////////////////////  result message ///////////////////////////////////////////////////////////////////////////////////

function ShowResultPopup(message_class, message_text) {
    var element = $('<div hoverTimer="" class="results-view ' + message_class + '"><button class="destroy close hover-action">&times;</button><div class="note-name"><i class="fa"></i><strong></strong></div><div class="note-desc">' + message_text + '</div></div>');
    $(element).hide().appendTo($('.results-area')).fadeIn(1000);
    $(element).attr('hoverTimer', (setTimeout(function() {
        $(element).fadeTo(1000, 0.00, function() {
            $(this).slideUp(300, function() {
                $(this).remove();
            });
        });
    }, donehoverInterval)));

    //if (message_class == "results-success")
    //    proxy.server.notifyMyParents();
}

var donehoverInterval = 7000;
$(document).on('mouseenter', '.results-view, .noti-view', function() {
    var element = $(this);
    var hoverTimer = element.attr('hoverTimer');
    if (hoverTimer !== null) {
        element.stop().animate({
            opacity: 1
        }, 500);
        clearTimeout(hoverTimer);
    }
});
$(document).on('mouseleave', '.results-view, .noti-view', function() {
    var element = $(this);
    element.attr('hoverTimer', (setTimeout(function() {
        $(element).fadeTo(1000, 0.00, function() {
            $(this).slideUp(300, function() {
                $(this).remove();
            });
        });
    }, donehoverInterval)));
});
$(document).on('click', '.results-view .close, .noti-view .close', function() {
    $(this).parent().remove();
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function executeFunction(context, functionName, element, args) {
    var args = [].slice.call(arguments).splice(2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for (var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }
    return context[func].apply(element, args);
}

function BindDate(datetext) {
    if (datetext == '') {
        return '<small class="text-muted c-p u-l">Have no account.</small>';
    } else {
        var datearr = datetext.split('&');
        if (datearr.length < 2) {
            return '<small class="text-muted c-p u-l">' + datetext + '</small>';
        } else
            return '<small class="text-muted c-p u-l" title="' + datearr[0] + '">' + datearr[1] + '</small>'
    }
}



function CropLongText(text, length, classes) {
    if (text.length <= length)
        return '<span class="' + classes + '">' + text + '</span>';
    else
        return '<span class="c-h ' + classes + '" title="' + text + '" >' + text.trim().substring(0, length) + '...</span>';
}

function CropLongText_NoTitle(text, length) {
    if (text.length <= length)
        return text;
    else
        return text.trim().substring(0, length) + '...';
}

function isEmpty(el) {
    return !$.trim(el.html())
}

$(document).on('focus', '.datepicker', function() {
    $(this).datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
        yearRange: "-90:+10",
        monthNames: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        monthNamesShort: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
    });
});

function imagecheck(UserId_By, Stud_ImagePath, type) {
    if (type == 1) {
        image_path = "https://dep.deltauniv.edu.eg" + Stud_ImagePath;
    } else {
        image_path = "https://dep.deltauniv.edu.eg/photos/users/" + UserId_By + "/avatar/thum.jpg";
    }
    return image_path;
}
//function imagecheck(UserId_By, Gender, type) {
//    //var image_path;
//    //var tt = UrlExists(image_path);
//    //if (tt == false) {
//    //    if (Gender == "M") {
//    //        image_path = "https://dep.deltauniv.edu.eg/photos/thum_m.png";
//    //    }
//    //    else {
//    //        image_path = "https://dep.deltauniv.edu.eg/photos/thum_f.png";
//    //    }

//    //}
//    //else {
//        if (type == 1) {
//            image_path = "https://dep.deltauniv.edu.eg/photos/students/" + UserId_By + "/avatar/thum.jpg";
//        }
//        else {
//            image_path = "https://dep.deltauniv.edu.eg/photos/users/" + UserId_By + "/avatar/thum.jpg";

//        }
//    //}
//    return image_path;
//}
//function UrlExists(url) {
//    var http = new XMLHttpRequest();
//    http.open('HEAD', url, false);
//    http.send();
//    return http.status != 404;
//}
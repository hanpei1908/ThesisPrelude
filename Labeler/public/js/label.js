/**
 * Created by wangyc on 15-3-2.
 */

function submit() {
  var threadID = $('.ui.threaded.comments').attr('id');
  var _keyword = $.cookie('keyword');
  var _username = $.cookie('username');
  var labelRecords = {};

  $('.comment').each(function () {
    var _number = $(this).attr('id').toString();
    labelRecords[_number] = $(this).find('input:radio:checked').val();
  });
  var _labels = JSON.stringify(labelRecords);
  console.log(_labels);

  $.ajax({
    url: '/label',
    type: 'POST',
    dataType: 'json',
    data: {'id': threadID, 'keyword': _keyword, 'username': _username, 'labels': _labels, 'trash': 0},
    success: function (result) {
      if (result.status == 0) {
        alert(result.msg);
      } else {
        alert('标注成功！');
        $('.ui.radio.checkbox').checkbox('disable');
        $('#next').removeClass('disabled');
        $('#submit').addClass('disabled');
        $('#trash').addClass('disabled');
        var labelCount = parseInt($('#labelCount').text());
        $('#labelCount').text(labelCount + 1);
      }
    }
  });
}

$(function () {
  $('#submit').click(function () {
    var complete = true;
    $('.ui.form').each(function () {
      var val = $(this).find('input:radio:checked').val();
      if (val == null) {
        alert('请不要漏标哦~');
        complete = false;
        return false;
      }
    });
    if (complete) {
      submit();
    }
  });

});

$(function () {
  $('#next').click(function () {
    window.location.reload();
  })
});

function trash() {
  var threadID = $('.ui.threaded.comments').attr('id');
  var _keyword = $.cookie('keyword');
  var _username = $.cookie('username');

  $.ajax({
    url: '/label',
    type: 'POST',
    dataType: 'json',
    data: {'id': threadID, 'keyword': _keyword, 'username': _username, 'trash': 1},
    success: function (result) {
      if (result.status == 0) {
        alert(result.msg);
      } else {
        $('.ui.radio.checkbox').checkbox('disable');
        $('#next').removeClass('disabled');
        $('#submit').addClass('disabled');
        $('#trash').addClass('disabled');
      }
    }
  });
}

function confirm_trash()
{
  var r = confirm("你确定该数据无法标注？");
  if (r == true) {
    trash()
  }
}

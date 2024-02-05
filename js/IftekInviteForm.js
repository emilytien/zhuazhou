function formcheck() {
    var message = document.form1.memName.value === '' ? '請輸入中文姓名' : document.form1.memMobile.value === '' ? '請輸入手機號碼' : document.form1.memMobile.value.length < 10 ? '您輸入的手機號可能是錯的喔，請重新確認' : document.form1.visitDate.value === '' ? '請選擇您期望抓周的日期?' : null;
    return message ? alert(message) : true
}
$(function() {
    $('#btnSubmit').click(function(e) {
        if (formcheck()) {
            var fixField = {
                subject: [window.location.host + ' 與我聯絡'],
                sourceUrl: [window.location.host],
                comId: ['53743179'],
                brandNum: ['1']
            };
            var requestData = JSON.stringify(getQueryData(fixField, $('#iftekPanelFrom').serializeArray()));
            $.ajax({
                type: 'POST',
                url: 'https://wms.iftek.com.tw/sys/inviteForm/feedback/json',
                data: requestData,
                contentType: 'application/json; charset=utf-8',
                success: function(result) {
                    if (result.code === 'Success') {
                        alert('回函已成功寄出');
                        $('#iftekPanelFrom').find(':text,textarea').each(function() {
                            $(this).val('')
                        });
                        $('#iftekPanelFrom').find(':radio,checkbox').each(function() {
                            $(this).attr('checked', false)
                        });
                        $("input[type='checkbox']").attr('checked', false);
                        fbq('track', 'Lead');
                        $('body').append('<img height="1" width="1" style="border-style:none;" alt="" src="//www.googleadservices.com/pagead/conversion/972404863/?value=10000.00&amp;currency_code=TWD&amp;label=gqBOCNKQ2FwQ__DWzwM&amp;guid=ON&amp;script=0"/>');
                        location.href = 'https://baobababyphoto.sisco.com.tw/baoba/contactSuccess.html';
                    } else if (result.code === 'Error') {
                        alert('回函寄出失敗');
                    }
                },
                error: null
            })
        }
    })
});
var getQueryData = function(fixField, array) {
    $.each(array, function(i, field) {
        if (fixField.hasOwnProperty(field.name)) {
            fixField[field.name].push(field.value);
        } else {
            fixField[field.name] = [field.value];
        }
    });
    return fixField
};
$(function() {
    if (getHostName(document.referrer) !== getHostName(window.location.href)) {
        Cookies.set('refererUrl', document.referrer);
        Cookies.set('targetUrl', window.location.href);
        $.get('https://jsonip.com/', function(result) {
            $.ajax({
                type: "POST",
                url: 'https://wms.iftek.com.tw/mars/traffic/log',
                data: JSON.stringify({
                    refererUrl: document.referrer,
                    targetUrl: window.location.href,
                    ip: result.ip
                }),
                contentType: "application/json; charset=utf-8",
                success: function(result) {},
                error: null
            });
        });
    }

    function getHostName(url) {
        const host = url.match(/:\/\/(.[^/]+)/);
        return host ? host[1] : null;
    }
})
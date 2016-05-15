// 查看密码
var checkBtn = document.getElementById('checkBtn');
var inputPlateNumber = document.getElementById('plateNumber');
checkBtn.addEventListener('click', function() {
    if (inputPlateNumber.value.length != 5 || isNaN(inputPlateNumber.value)) {
        alert('车牌输入错误');
    } else {
        $.post("/search", {
            plateNumber: inputPlateNumber.value
        }, function(result) {
            if (result.success != 1) {
                $('.check-box').addClass('sr-only');
                $('.success-box').addClass('sr-only');
                $('.failure-box').removeClass('sr-only');
            } else {
                $(".code").html(result.code);
            }
        });
    }
})


// 保存密码
var saveBtn = document.getElementById('saveBtn');
var plateNumberSave = document.getElementById('plateNumberSave');
var codeSave = document.getElementById('codeSave');
saveBtn.addEventListener('click', function() {
    if (plateNumberSave.value.length != 5 || isNaN(plateNumberSave.value)) {
        alert('车牌输入错误');
    } else if (codeSave.value.length != 4 || isNaN(codeSave.value)) {
        alert('密码格式有误');
    } else {
        $.post("/save", {
            codeSave: codeSave.value,
            plateNumberSave: plateNumberSave.value,
        }, function(result) {
            if (result.success = 1) {
                alert('感谢你的帮助，数据库里又多了一条记录。下次使用说不定会有惊喜喔！😄');
                location.reload();
            } else {
                alert('保存失败,在来一发？');
            }
        });
    }

})

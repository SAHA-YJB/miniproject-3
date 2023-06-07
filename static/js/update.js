function update_btn(e) {
    // const parent = $(e).parent();
    $('#choose').removeAttr('id');
    let gran_parent = $(e).parent().parent();
    gran_parent.attr('id', 'choose');
    let temp_html = `
    <input
    id="comment-update"
    type="text"
    placeholder="수정을 입력해 주세요."
/>
                            `;
    $('#choose .update-input-box').append(temp_html);
}

function update_cancle() {
    $('#choose').removeAttr('id');
}

function update_scc(a) {
    update_cancle();

    console.log(a);
    let num = a;
    let ucomment = $('#comment-update').val();

    console.log(num, ucomment);

    let formData = new FormData();
    formData.append('id_give', num);
    formData.append('ucomment_give', ucomment);

    fetch('/update', { method: 'POST', body: formData })
        .then((response) => response.json())
        .then((data) => {
            alert(data['msg']);
            window.location.reload();
        });
}

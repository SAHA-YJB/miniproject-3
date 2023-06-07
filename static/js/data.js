$(document).ready(function () {
    listing();
});

function listing() {
    fetch('/guestbook')
        .then((res) => res.json())
        .then((data) => {
            let rows = data['result'];
            $('#comments-box').empty();
            rows.forEach((a) => {
                let num = a['id'];
                let name = a['name'];
                let comment = a['comment'];
                let date = a['date'];

                let temp_html = `
                                <tr>
                                    <td>${num}</td>
                                    <td>${name}</td>
                                    <td>${comment}</td>
                                    <td>${date}</td>
                                </tr>
                            `;
                $('#comments-box').append(temp_html);
            });
        });
}

function save_comment() {
    let name = $('#name-box').val();
    let comment = $('#comment-box').val();

    let formData = new FormData();
    formData.append('name_give', name);
    formData.append('comment_give', comment);
    fetch('/guestbook', { method: 'POST', body: formData })
        .then((response) => response.json())
        .then((data) => {
            alert(data['msg']);
            window.location.reload();
        });
}

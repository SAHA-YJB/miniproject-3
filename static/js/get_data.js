$(document).ready(function () {
    listing();
});

function listing() {
    fetch('/comment')
        .then((res) => res.json())
        .then((data) => {
            let rows = data['result'];
            $('#comments-box').empty();
            rows.forEach((a) => {
                let num = a['num'];
                let name = a['name'];
                let comment = a['comment'];
                let date = a['date'];

                let temp_html = `
                                <tr>
                                    <td>${num}</td>
                                    <td>${name}</td>
                                    <td>${comment}잘 보고 갑니다.</td>
                                    <td>${date}</td>
                                </tr>
                            `;
                $('#comments-box').append(temp_html);
            });
        });
}

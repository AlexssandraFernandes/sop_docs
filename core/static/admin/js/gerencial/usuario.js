$(document).ready(function () {
    let previousRole = $('input[name="papel"]:checked').attr('id');

    $('input[name="papel"]').change(function () {
        const newRole = $(this).attr('id');
        const userId = $(this).data('id');

        const tornarUrl = `/tornar-${newRole.split('-')[1]}/`;

        $.ajax({
            url: tornarUrl,
            method: 'POST',
            data: { 'user_id': userId },
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (response) {
                if (!response.success) {
                    alert(response.message || 'Erro ao tornar novo papel.');
                } else {
                    previousRole = newRole;
                }
            }
        });
    });
});

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        document.cookie.split(';').forEach(cookie => {
            const trimmed = cookie.trim();
            if (trimmed.startsWith(name + '=')) {
                cookieValue = decodeURIComponent(trimmed.substring(name.length + 1));
            }
        });
    }
    return cookieValue;
}

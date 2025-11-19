// Chama um modal de confirmação de deleção de item e uma barra de progresso caso comfimada a ação!
document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.btn-delete-banner');
    const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

    let selectedBannerId = null;
    let selectedDeleteUrl = null;
    let selectedCard = null;

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            selectedBannerId = this.getAttribute('data-id');
            selectedDeleteUrl = this.getAttribute('data-url');
            selectedCard = this.closest('.card');

            modal.show();
        });
    });

    confirmDeleteBtn.addEventListener('click', function () {
        const progressWrapper = selectedCard.querySelector('.progress-wrapper');
        const progressBar = progressWrapper.querySelector('.progress-bar');
        const progressText = progressWrapper.querySelector('.progress-percent');

        modal.hide();
        progressWrapper.style.display = 'block';
        progressBar.style.width = '10%';
        progressText.textContent = '10%';

        let progress = 10;
        const interval = setInterval(() => {
            progress += 10;
            if (progress >= 95) {
                clearInterval(interval);
            } else {
                progressBar.style.width = `${progress}%`;
                progressText.textContent = `${progress}%`;
            }
        }, 100);

        fetch(selectedDeleteUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: new URLSearchParams({ banner_id: selectedBannerId })
        })
            .then(response => response.json())
            .then(data => {
                progressBar.style.width = `100%`;
                progressText.textContent = `100%`;

                setTimeout(() => {
                    if (data.success) {
                        location.reload();
                    } else {
                        alert("Erro: " + data.error);
                        progressWrapper.style.display = 'none';
                    }
                }, 500);
            })
            .catch(error => {
                console.error('Erro:', error);
                alert("Erro ao deletar banner.");
                progressWrapper.style.display = 'none';
            });
    });

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
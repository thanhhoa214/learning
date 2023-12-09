$('#meaningModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    const word = JSON.parse(localStorage.getItem('currentWord'));
    var meaningStatus = button.data('meaning'); // Extract info from data-* attributes
    var modal = $(this)
    modal.find('.modal-title').text(word.eng);
    if (meaningStatus === "en") modal.find('.modal-body').html(word.oxfordHtml);
    else modal.find('.modal-body').html(word.covietHtml);
})
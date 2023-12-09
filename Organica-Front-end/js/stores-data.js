let storeNames = ["Organica Nguyen Thai Hoc", "Organica Nguyen Dinh Chieu", "Organica Phu Nhuan", "Organica Da Nang", "Organica Hanoi"];
let storeAddresses = ["117 Nguyen Thai Hoc Street, Cau Ong Lanh Ward, District 1<br>Tel: 028 2253 0602 | 088 677 6116<br> Open time: 7:30 - 19:30", "130 Nguyen Dinh Chieu Street, Ward 6, District 3<br>Tel: 028 6673 3350 | 0902 686 292<br> Open time: 7:30 - 19:30", "54 Hoang Van Thu Street, Ward 9, Phu Nhuan District<br>Tel: 028 6685 0532 | 0901 81 81 84<br> Open time: 7:30 - 19:30", "90 Hai Phong Street, Hai Chau Ward<br> Tel: 0236 366 4646<br> Open time: 7:30 - 19:30", "5A1, Alley 192 Thai Thinh Street, Dong Da District<br>Tel: 0243 687 8899 | 0996 211 899<br> Open time: 7:30 - 19:30"]
let storeLocations = [
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5708375947247!2d106.69541!3d10.767521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ2JzAzLjEiTiAxMDbCsDQxJzQzLjUiRQ!5e0!3m2!1svi!2s!4v1541220769758",
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3556881916634!2d106.6947907!3d10.784046199999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ3JzAyLjYiTiAxMDbCsDQxJzQxLjMiRQ!5e0!3m2!1svi!2s!4v1541220513364",
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.1547343223856!2d106.67801449999999!3d10.7994585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ3JzU4LjEiTiAxMDbCsDQwJzQwLjkiRQ!5e0!3m2!1svi!2s!4v1541220674621",
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.8670780001394!2d108.21764900000001!3d16.072385999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDA0JzIwLjYiTiAxMDjCsDEzJzAzLjUiRQ!5e0!3m2!1svi!2s!4v1541220706942",
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.474247599792!2d105.815913!3d21.013702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDAwJzQ5LjMiTiAxMDXCsDQ4JzU3LjMiRQ!5e0!3m2!1svi!2s!4v1541220738118"
];
let fadeInAnimation = ['Left', 'Right']
let storeImages = ["../images/stores/nguyenthaihoc.jpg", "../images/stores/nguyendinhchieu.jpg", "../images/stores/phunhuan.jpg", "../images/stores/danang.png", "../images/stores/hanoi.jpg"];
function loadContentPage() {
    let fullHTML = '<div class="mt-5"></div>';
    for (let i = 0; i < storeNames.length; i++) {
        fullHTML += '<div class="jumbotron row bg-light wow fadeIn' + fadeInAnimation[i % 2] + '" data-wow-duration="2s">';
        fullHTML += '<div class="col-6">'
        fullHTML += '<img src="' + storeImages[i] + '" style="max-width: 100%;" class="rounded mt-1">'
        fullHTML += '</div><div class="col-6">'
        fullHTML += '<h2 class="display-6 font-weight-bold">' + storeNames[i] + '</h2>';
        fullHTML += '<p class="lead" style="font-size: 18px">' + storeAddresses[i] + '</p>'
        fullHTML += '<a class="btn btn-primary btn-md text-light" data-location="' + storeLocations[i] + '"target="_blank" role="button" data-toggle="modal" data-target="#exampleModalCenter">View Location</a>'
        fullHTML += '</div></div>'
    }
    $('#contentPage').html(fullHTML);
}
loadContentPage();
$('.jumbotron a').click(function () {
    $(this).each(function () {
        $('#locationFrame').attr('src', $(this).attr('data-location'));
    });
})

// Login Register exchange
$('#btnRegister').click(() => {
    let inputName = `<input type="text" name="userName" id="userName" pattern="[^0-9~!@#$%^&*()_+{[\\]}()\\-=]+" required="required"
            oninvalid="this.setCustomValidity('Username cannot contain special character and number !')"
            onchange="this.setCustomValidity('')" placeholder="Full Name" autocomplete>`;
    let inputPhone = `<input type="phone" name="userPhone" id="userPhone" pattern="[\\d\\s+]{10,}" required="required" onchange="this.setCustomValidity('')"
            placeholder="Phone" oninvalid="this.setCustomValidity('Phone number must contain only numbers !')">`;
    let inputPass = `<input type = "password" name = "userPass" id = "userPass" pattern = ".{8,}" required = "required" oninvalid = "this.setCustomValidity('Password must be longer than 8 !')"
    onchange = "this.setCustomValidity('')" placeholder = "Password" >`;
    let inputEmail = `<input type = "email" name = "userEmail" id = "userEmail" pattern = "[\\w\\d]+[@]fpt[.]edu[.]vn" required = "required"
    oninvalid = "this.setCustomValidity('Email must be ****@fpt.edu.vn !')" onchange = "this.setCustomValidity('')"
    placeholder = "Email Address" >`;
    $('#btnRegister').children('i').removeClass('d-none');
    $('#btnLogin').children('i').addClass('d-none');
    $('#contentForm').html('');
    $('#contentForm').append(inputName);
    $('#contentForm').append(inputPhone);
    $('#contentForm').append(inputPass);
    $('#contentForm').append(inputEmail);
});
$('#btnLogin').click(() => {
    $('#btnLogin').children('i').removeClass('d-none');
    $('#btnRegister').children('i').addClass('d-none');
    $('#userName').remove();
    $('#userEmail').remove();
});

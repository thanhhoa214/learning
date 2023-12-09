let lovedList = [];
let currentCart = [];
let productItems = [];

// Start Banner
{
    let slideIndex = 0;
    carousel();
    function plusDivs(n) {
        showDivs(slideIndex += n);
    }

    function currentDiv(n) {
        showDivs(slideIndex = n);
    }

    function showDivs(n) {
        var i;
        var x = document.getElementsByClassName("mySlides");
        var dots = document.getElementsByClassName("demo");
        if (n > x.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = x.length }
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" w3-gray", "");
        }
        x[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " w3-gray";
    }
    function carousel() {
        var i;
        var x = document.getElementsByClassName("mySlides");
        var dots = document.getElementsByClassName("demo");
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > x.length) { slideIndex = 1 }
        x[slideIndex - 1].style.display = "block";
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" w3-gray", "");
        }
        dots[slideIndex - 1].className += " w3-gray";
        setTimeout(carousel, 2000); // Change image every 2 seconds
    }
}
// End Banner

// Start navigation
$(window).bind('mousewheel DOMMouseScroll', function (event) {
    let nav = document.getElementsByTagName('nav')[0];
    let logo = document.getElementById('logo');
    if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
    }
    else {
        nav.style = 'position: fixed; z-index: 1000; top: 0; left: 0;';
        logo.style.width = '90px';
        logo.style.marginLeft = '20px';
    }
});
var distance = $('header').offset().top;
$(window).scroll(function () {
    if ($(this).scrollTop() <= distance) {
        let nav = document.getElementsByTagName('nav')[0];
        let logo = document.getElementById('logo');
        nav.style.clear;
        logo.style.clear;
        nav.style = 'width: 100%;height: 60px;background-color: #fff;border-bottom: 1px solid rgba(8, 165, 79, 0.918);margin-bottom: 10px;font-size: 18px;';
        logo.style = 'display: block;position: absolute;left: 43%;top: 5px;z-index: 1000;margin: 10px auto;'
    };
});
// End Navigation

// Start ProductItem
$('.liked').click(function () {
    // isIncluded always return false >> find the way to compare element and "this"
    let isIncluded = (target) => {
        lovedList.forEach(element => {
            if (element == target) {
                return true;
            }
        });
        return false;
    }
    if (!isIncluded(this)) {
        this.childNodes[0].style.color = 'rgba(199, 93, 6, 0.918)';
        lovedList.push($(this).parent().parent().children('a').children('h5')[0].innerHTML);
    } 
    $('#numberOfPro').html(lovedList.length)
})
// End ProductItem
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

// LovedList show
function showLovedList() {
    let fullHTML = 'Current Loved List:\n';
    for(let i=0; i<lovedList.length; i++){
        fullHTML += (i+1) + '. '+ lovedList[i] + '\n';
    }
    alert(fullHTML);
}


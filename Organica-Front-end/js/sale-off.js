let brands = ['ORGANICA', 'RABENHORST', 'HEALTH PARADISE', 'HOA SUA', 'VI HAO', 'COCOVIE', 'ORFARM', 'ECODOO'];
function renderRadioBrands() {
    let fullHTML = '';
    let leng = brands.length;
    for (let i = 0; i < leng; i++) {
        fullHTML += `<div class="custom-control custom-radio">
        <input type="radio" class="custom-control-input" id="brand${i + 1}" name="radioBrands" required>
        <label class="custom-control-label" for="brand${i + 1}">${brands[i]}</label>
        </div>`
    }
    $('#brandContent').html(fullHTML);
}
renderRadioBrands();
$('[name="radioBrands"]').click(function () {
    renderProducts($(this).attr('id'), 'attr0');
})

let attributes = ["USDA Organic Certification", "EU Organic Certification", "Organically Grown", "Sugar-free", "Vegan", "Vegetarian", "Gluten-free", "Dairy-free", "Wild-caught", "Pasture-raised"];
function renderRadioAttrs() {
    let fullHTML = '';
    for (let i = 0; i < attributes.length; i++) {
        fullHTML += `<div class="custom-control custom-radio">
        <input type="radio" class="custom-control-input" id="attr${i + 1}" name="radioAttrs" required>
        <label class="custom-control-label" for="attr${i + 1}">${attributes[i]}</label>
        </div>`
    }
    $('#attrContent').html(fullHTML);
}
renderRadioAttrs();
$('[name="radioAttrs"]').click(function () {
    renderProducts('brand0', $(this).attr('id'));
})

let productsJSON = [{ "linkImg": "https://file.organica.vn/uploads/filecloud/2018/May/29/414-543721527569200-1527569200--188x188.jpg", "name": " POMEGRANATE VINEGAR", "price": 12375 }, { "linkImg": "https://file.organica.vn/uploads/filecloud/2018/May/30/468-315321527661265-1527661265--188x188.jpg", "name": " ROASTED SALTED CASHEWS 200G", "price": 157500 }, { "linkImg": "https://file.organica.vn/uploads/filecloud/2018/June/4/630-882891528108978-1528108978--188x188.jpg", "name": " ROASTED SALTED CASHEWS 500G", "price": 373500 }, { "linkImg": "https://file.organica.vn/uploads/filecloud/2018/June/1/552-285431527849548-1527849548--188x188.jpg", "name": " GINGER POWDER", "price": 73500 }, { "linkImg": "https://file.organica.vn/uploads/filecloud/2018/May/29/418-882981527579509-1527579509--188x188.png", "name": " PALM VINEGAR", "price": 134250 }, { "linkImg": "https://file.organica.vn/uploads/filecloud/2018/May/23/303-213551527072883-1527072883--188x188.png", "name": " HATCHO MISO", "price": 213750 }, { "linkImg": "https://file.organica.vn/uploads/filecloud/2018/May/23/301-985161527054986-1527054986--188x188.jpg", "name": " GENMAI MISO", "price": 213750 }];
function renderProducts(brandId = 'brand0', attrId = 'attr0') {
    let fullHTML = '';
    let i = 0;
    let lengBrand = productsJSON.length;
    let lengAttr = productsJSON.length;
    switch (brandId) {
        case 'brand0':
            break;
        case 'brand1':
            {
                lengBrand = 2;
                break;
            }
        case 'brand2':
            {
                i = 2;
                lengBrand = 4;
                break;
            }
        case 'brand3':
            {
                i = 4;
                lengBrand = 5;
                break;
            }
        case 'brand4':
            {
                i = 5
                lengBrand = 6;
                break;
            }
        case 'brand5':
            {
                i = 6
                lengBrand = 7;
                break;
            }
        default:
            {
                lengBrand = 7;
                break;
            }
    }
    switch (attrId) {
        case 'attr0':
            break;
        case 'attr1':
            {
                lengAttr = 1;
                break;
            }
        case 'attr2':
            {
                i = 1;
                lengAttr = 2;
                break;
            }
        case 'attr3':
            {
                i = 2
                lengAttr = 4;
                break;
            }
        case 'attr4':
            {
                i = 4
                lengAttr = 6;
                break;
            }
        case 'attr5':
            {
                i = 6
                lengAttr = 7;
                break;
            }
        default: break;
    }
    for (i; i < lengBrand && i < lengAttr; i++) {
        fullHTML += `<div class="productItem bg-light">
    <a data-toggle="modal" data-target="#exampleModalCenter">
        <img src="${productsJSON[i].linkImg}">
        <h5>${productsJSON[i].name}</h5>
        <span class="price ml-4">${productsJSON[i].price}<sup>đ</sup></span>
        <div class="middle">
            <span class="liked"><i class="fas fa-heart"></i></span>
            <span class="bought">BUY</span>
        </div>
        <span class="discount">${productsJSON[i].price * 4 / 3}</span>
        <span class="saleOff">25%</span>
    </a>
</div>`
    }
    $('#productContent').html('');
    $('#productContent').html(fullHTML);
}
renderProducts('brand0', 'attr0');

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

// LovedList show
function showLovedList() {
    let fullHTML = 'Current Loved List:\n';
    for(let i=0; i<lovedList.length; i++){
        fullHTML += (i+1) + '. '+ lovedList[i] + '\n';
    }
    alert(fullHTML);
}
// Login Register exchange
$('#btnRegister').click(() => {
    let inputName = `<input type="text" name="userName" id="userName" pattern="[^0-9~!@#$%^&*()_+{[\]}()\-=]+" required="required"
            oninvalid="this.setCustomValidity('Username cannot contain special character and number !')"
            onchange="this.setCustomValidity('')" placeholder="Full Name" autocomplete>`;
    let inputPhone = `<input type="phone" name="userPhone" id="userPhone" pattern="[\d\s+]{10,}" required="required" onchange="this.setCustomValidity('')"
            placeholder="Phone" oninvalid="this.setCustomValidity('Phone number must contain only numbers !')">`;
    let inputPass = `<input type = "password" name = "userPass" id = "userPass" pattern = ".{8,}" required = "required" oninvalid = "this.setCustomValidity('Password must be longer than 8 !')"
    onchange = "this.setCustomValidity('')" placeholder = "Password" >`;
    let inputEmail = `<input type = "email" name = "userEmail" id = "userEmail" pattern = "[\w\d]+[@]fpt[.]edu[.]vn" required = "required"
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

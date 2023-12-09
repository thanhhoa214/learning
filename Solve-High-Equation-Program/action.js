
function hideValue() {
   document.getElementById('data').value = '';
}

function showChecked() {
   let regex = RegExp('^(\\s+)?((-?\\d+[.]?(\\d+)?)(\\s+)?)+$', 'gm');
   let input = document.getElementById('data').value;
   if (!regex.test(input)) {
      document.getElementById('status').style.color = 'red';
      document.getElementById('status').innerHTML = 'Something\'s wrong. Please check again';
      return false;
   } else {
      document.getElementById('status').style.color = '#86b300';
      document.getElementById('status').innerHTML = 'It\'s good';
      return true;
   }
}

function showResult() {
   if (showChecked()) {
      let exp1 = new Expression(document.getElementById('data').value);
      exp1.findRoot();
      document.getElementById('show').innerHTML = exp1.printExp() + exp1.printRoot();
   }
}


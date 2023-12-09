class Expression {
   constructor(input) {
      this._num = input.trim().split(new RegExp('\\s+', 'gm'));
      this.parseToNum();
      this.findDerivative();
      this._result = [];
   }
   get num() {
      return this._num;
   }
   get derivative() {
      return this._derivative;
   }
   get result() {
      return this._result;
   }
   // Expression lv2
   solveLevel2() {
      let a = this._num[0];
      let b = this._num[1];
      let c = this._num[2];
      let delta = b * b - 4 * a * c;
      if (delta < 0) {
      } else if (delta === 0) {
         this._result.push((-b + Math.sqrt(delta)) / (2 * a));
      } else {
         this._result.push((-b + Math.sqrt(delta)) / (2 * a));
         this._result.push((-b - Math.sqrt(delta)) / (2 * a));
      }
   }
   // Derivative
   findDerivative() {
      this._derivative = [];
      this._num.forEach(element => {
         this._derivative.push(element);
      });
      let leng = this._derivative.length;
      for (let i = 0; i < leng; i++) {
         this._derivative.splice(i, 1, this._derivative[i] * (leng - i - 1));
      }
      this._derivative.pop();
   }
   // Parse num[] to number
   parseToNum() {
      let leng = this._num.length;
      for (let index = 0; index < leng; index++) {
         this._num[index] = Number(this._num[index]);
      }
      return this._num;
   }
   // Calculate value with x
   calValueExp(array, x) {
      let value = 0;
      let leng = array.length;
      for (let i = 0; i < leng; i++) {
         value += array[i] * Math.pow(x, leng - (i + 1));
      }
      return value;
   }
   // Horner's Method
   divHorner(clone, x) {
      let leng = clone.length;
      for (let index = 0; index < leng - 1; index++) {
         let z = clone[index] * x + clone[index + 1];
         clone[index + 1] = z;
      }
      clone.pop();
   }
   haveRoot(clone) {
      let x = 2.0;
      let index = 0;
      let y;
      let leng = clone.length;
      for (let l = 0; l <= 10; l++) {
         if (this.calValueExp(clone, -5.0 + l) === 0) {
            this._result.push(-5.0 + l);
            return true;
         }
      }
      if (leng === 1) {
         return false;
      }
      if (leng === 2) {
         if (clone[0] === 0) {
               return false;
         } else {
            this._result.push(-clone[1] / clone[0]);
            return true;
         }
      }
      do {
         y = x - this.calValueExp(clone, x) / this.calValueExp(this._derivative, x);
         if (y === x) break;
         x = y;
         index++;
         if (index === 10000) return false;
      } while ((x - Math.round(x)) > 0.000000000001 || (x - Math.round(x)) < -0.000000000001);
      this._result.push(x);
      return true;
   }

   findRoot() {
      let clone = [];
      this._num.forEach(ele => {
         clone.push(ele);
      })
      let leng = clone.length;
      for (let k = 0; k < leng; k++) {
         if (leng === 3) {
            this.solveLevel2();
            break;
         }
         if (this.haveRoot(clone)) {
            this.divHorner(clone, this._result[k]);
         }
      }
   }
   printRoot() {
      let strResult = '';
      let leng = this._result.length;
      if (leng === 0)
         strResult = '<pre>The equation does not have root.</pre>';
      else {
         strResult = '<pre>The equation has roots :</pre>';
         for (let i = 0; i < leng; i++) {
            strResult += `<pre>Root ${i + 1} :      ${this._result[i]}</pre>`;
         }
      }
      return strResult;
   }
   printExp() {
      let s1 = '<h2 style="text-align: center;">Your equation ';
      let leng = this._num.length;
      for (let i = 0; i < leng; i++) {
         if (i < leng - 1) {
            if (this._num[i] === 0) {
            } else if (this._num[i] === 1) {
               s1 += 'x' + ((i === leng - 2) ? '' : `<sup>${leng - i - 1}</sup> + `);
            } else {
               s1 += ((i === leng - 2) ? `${this._num[i]}x` : `${this._num[i]}x<sup>${leng - i - 1}</sup>`)
                  + ' + ';
            }
         } else {
            if (this._num[i] === 0) {
               s1 = s1.substring(0, s1.length() - 2);
            } else {
               s1 = s1 + this._num[i];
            }
         }
      }
      while (new RegExp(' [+] -').test(s1)) {
         s1 = s1.replace(' + -', ' - ');
      }
      s1 = s1.trim() + ' = 0</h2>';
      return s1;
   }
}

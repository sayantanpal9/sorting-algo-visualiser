let elarr = document.getElementById("box");
let bbut = document.getElementById('bubble');
let sbut = document.getElementById('selection');
let mbut = document.getElementById('merger');
let qbut = document.getElementById('quick');
let doing = document.getElementById('doing');
let ref = document.getElementById('ref');
let arr = [];
let oparr = [];
let n = 200;
let x = 70;
for (let i = 0; i < n; i++) {
  arr.push(Math.random() * 100);
  const aa = document.createElement('div');
  aa.classList.add('slice');
  aa.id = `${i}`;
  aa.style.height = `${arr[i]}%`;
  aa.style.width = `${100/n}%`;

  elarr.appendChild(aa);
  oparr.push(aa);
}
async function turnoff() {
  bbut.disabled = true;
  sbut.disabled = true;
  mbut.disabled = true;
  qbut.disabled = true;
  doing.disabled = true;
  ref.disabled = true;
}
async function turnon() {
  bbut.disabled = false;
  sbut.disabled = false;
  mbut.disabled = false;
  qbut.disabled = false;
  doing.disabled = false;
  ref.disabled = false;
}
async function stop() {
  for (let i = 0; i < n; i++){
    oparr[i].remove();
  }
  oparr = [];
  arr = [];
  for (let i = 0; i < n; i++) {
  arr.push(Math.random() * 100);
  const aa = document.createElement('div');
  aa.classList.add('slice');
  aa.id = `${i}`;
  aa.style.height = `${arr[i]}%`;
  aa.style.width = `${100/n}%`;

  elarr.appendChild(aa);
  oparr.push(aa);
  }
  turnon();
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function delay(time) {
  await sleep(time);
}
async function bsort() {
  turnoff();
  for (let i = n - 1; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      if (oparr[j].clientHeight > oparr[j + 1].clientHeight) {
        let a = oparr[j].style.height;
        let b = oparr[j + 1].style.height;
        oparr[j].style.height = b;
        oparr[j + 1].style.height = a;
        await sleep(x*0.5);
      }
    }
  }
  for (let i = 0; i < n+5; i++){
    if (i - 5 >= 0&&i-5<n) {
      oparr[i - 5].style.backgroundColor = 'green';
    }
    if (i < n) {
      oparr[i].style.backgroundColor = 'aqua';
    }
    await sleep(x*0.1);
  }
  turnon();
}
async function ssort() {
  turnoff();
  for (let i = 0; i <n; i++) {
    for (let j = i+1; j <n; j++) {
      if (oparr[j].clientHeight < oparr[i].clientHeight) {
        let a = oparr[j].style.height;
        let b = oparr[i].style.height;
        oparr[j].style.height = b;
        oparr[i].style.height = a;
        await sleep(x*0.5);
      }
    }
  }
  for (let i = 0; i < n+5; i++){
    if (i - 5 >= 0&&i-5<n) {
      oparr[i - 5].style.backgroundColor = 'green';
    }
    if (i < n) {
      oparr[i].style.backgroundColor = 'aqua';
    }
    await sleep(x*0.1);
  }
  turnon();
}
async function merge(oparr, left, mid, right) {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    const L = new Array(n1);
    const R = new Array(n2);
    for (let i = 0; i < n1; i++)
        L[i] = oparr[left + i].clientHeight;
    for (let j = 0; j < n2; j++)
        R[j] = oparr[mid + 1 + j].clientHeight;
    let i = 0, j = 0;
    let k = left;
  while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
          oparr[k].style.height = `${L[i]}px`;
          i++;
          await sleep(x*1);
        } else {
          oparr[k].style.height = `${R[j]}px`;
          j++;
          await sleep(x*1);
        }
        k++;
    }
    while (i < n1) {
        oparr[k].style.height = `${ L[i] }px`;
        i++;
      k++;
      await sleep(x*1);
    }
    while (j < n2) {
      oparr[k].style.height = `${ R[j] }px`;
      j++;
      k++;
      await sleep(x*1);
    }
}
async function mergeSort(oparr, left, right) {
    if (left >= right)
        return;

    const mid = Math.floor(left + (right - left) / 2);
    await mergeSort(oparr, left, mid);
    await mergeSort(oparr, mid + 1, right);
    await merge(oparr, left, mid, right);
}
async function msort() {
  turnoff();
  let sum = 0;
  for (let i = 0; i < n - 1; i++){
    if (oparr[i + 1].clientHeight >= oparr[i].clientHeight) {
      sum++;
    }
  }
  if(sum<n-1)await mergeSort(oparr, 0, oparr.length - 1);
  for (let i = 0; i < n+5; i++){
    if (i - 5 >= 0&&i-5<n) {
      oparr[i - 5].style.backgroundColor = 'green';
    }
    if (i < n) {
      oparr[i].style.backgroundColor = 'aqua';
    }
    await sleep(x*0.1);
  }
  turnon();
}
async function partition(oparr, low, high) {
    let pivot = oparr[high].clientHeight;
    let i = low - 1;
    for (let j = low; j <= high - 1; j++) {
        if (oparr[j].clientHeight < pivot) {
          i++;
          let a1 = 0, b1 = 0,a2=0,b2=0;
          [a1, b1] = [oparr[i].clientHeight, oparr[j].clientHeight];
          [a2, b2] = [oparr[j].clientHeight, oparr[i].clientHeight];
          [oparr[i].style.height, oparr[j].style.height] = [`${a2}px`, `${b2}px`];
          [oparr[j].style.height, oparr[i].style.height] = [`${a1}px`, `${b1}px`]; 
          await sleep(x * 0.5);
        }
      
    }
  let a1 = 0, b1 = 0,a2=0,b2=0;
          [a1, b1] = [oparr[i+1].clientHeight, oparr[high].clientHeight];
          [a2, b2] = [oparr[high].clientHeight, oparr[i+1].clientHeight];
          [oparr[i+1].style.height, oparr[high].style.height] = [`${a2}px`, `${b2}px`];
          [oparr[high].style.height, oparr[i+1].style.height] = [`${a1}px`, `${b1}px`]; 
  
  await sleep(x * 0.5);
  return i + 1;
}
async function quickSort(oparr, low, high) {
  if (low >= high) return;
  let index = 0;
  let pi=await partition(oparr, low, high);

    await quickSort(oparr, low, pi - 1);
    await quickSort(oparr, pi + 1, high);
}
async function qsort() {
  turnoff();
  let sum = 0;
  for (let i = 0; i < n - 1; i++){
    if (oparr[i + 1].clientHeight >= oparr[i].clientHeight) {
      sum++;
    }
  }
  if(sum<n-1)await quickSort(oparr, 0, oparr.length - 1);
  turnon();
  for (let i = 0; i < n+5; i++){
    if (i - 5 >= 0&&i-5<n) {
      oparr[i - 5].style.backgroundColor = 'green';
    }
    if (i < n) {
      oparr[i].style.backgroundColor = 'aqua';
    }
    await sleep(x*0.1);
  }
}
function refresh() {
  bbut.disabled = false;
  sbut.disabled = false;
  mbut.disabled = false;
  arr = [];
  x = 1000;
for (let i = 0; i < n; i++) {
  arr.push(Math.random() * 100);
  oparr[i].style.height = `${arr[i]}%`;
}
}
async function xx() {
  x /= 2;
}
async function x1() {
  x *= 2;
}
async function ddo() {
  let newn = document.getElementById('inp').value;
  for (let i = 0; i < n; i++){
    oparr[i].remove();
  }
  oparr = [];
  arr = [];
  n = newn;
  for (let i = 0; i < n; i++) {
  arr.push(Math.random() * 100);
  const aa = document.createElement('div');
  aa.classList.add('slice');
  aa.id = `${i}`;
  aa.style.height = `${arr[i]}%`;
  aa.style.width = `${100/n}%`;

  elarr.appendChild(aa);
  oparr.push(aa);
  }
  bbut.disabled = false;
  sbut.disabled = false;
  mbut.disabled = false;
}

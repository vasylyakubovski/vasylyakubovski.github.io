const name=`Катя`;
const product=`Air Pots`;
const product_price= 4000;
const year= 1;
const garantia_price= 350;
const dostavka_price= 60;
const acount=6;
const total= (product_price  + garantia_price) *6 + dostavka_price; 
console.log(`Вітаю, ${name} Ваше замовлення:
 ${product} за ціною- ${product_price} грн у кількості ${acount} штук
 гарантія на ${year} рік вартістю - ${garantia_price} грн у кількості ${acount} штук
 вартість доставки ${dostavka_price} грн 
 прийнято та буде оброблено протягом 24 години.
 Загальна вартість замовлення - ${total} грн`);
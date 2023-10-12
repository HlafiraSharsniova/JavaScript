function results() {
    const num1 = parseInt(liczba1.value) || 0;
    const num2 = parseInt(liczba2.value) || 0;
    const num3 = parseInt(liczba3.value) || 0;
    const num4 = parseInt(liczba4.value) || 0;

    const min = Math.min(num1,num2,num3,num4);
    const max = Math.max(num1,num2,num3,num4);
    const sum = num1+num2+num3+num4;
    const avg = sum/4;

    wynik.textContent = 'Suma: ' + sum + ', Srednią: ' + avg + ', Min: ' + min + ', Max: ' + max;


}
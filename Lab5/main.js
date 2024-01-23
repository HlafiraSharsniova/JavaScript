function Add(a, b) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(a + b);
      }, 100);
    });
  }
  function randomHundredNumbers() {
    const random = [];
    for (let i = 0; i < 100; i++) {
      random.push(Math.floor(Math.random() * 10));
    }
    return random;
  }
  
  async function measureTime(cb) {
    const startTime = performance.now();
    await cb();
    const endTime = performance.now();
    const time = (endTime - startTime) / 1000;
    console.log(`Czas operacji wyniósł: ${time} sekund`);
  }
  async function addNumbersAsync(...numbers) {
    let asyncResults = [];
  
    for (let i = 0; i < numbers.length; i++) {
      asyncResults.push(Add(0, numbers[i]));
    }
  
    const results = await Promise.all(asyncResults);
  
    const sum = results.reduce((acc, val) => acc + val, 0);
  
    console.log(`Wynik: ${sum}`);
    console.log(`Ilość operacji asynchronicznych: ${results.length}`);
    return sum;
  }
  
  const addRandomNumbers = async () => {
    const numbers = randomHundredNumbers();
    await addNumbersAsync(...numbers);
  };
  
  measureTime(addRandomNumbers);
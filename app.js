const fs = require('fs').promises;

async function readFile(filePath) {
  try {
    // Зчитуємо дані з файлу у кодуванні 'utf-8'
    const data = await fs.readFile(filePath, 'utf-8');
    // Розділяємо рядок на числа, використовуючи символ нового рядка як роздільник,
    // перетворюємо їх у числа.
    return data.split('\n').map(Number);
  } catch (error) {
    // У разі помилки виводимо повідомлення про помилку
    throw new Error(`Помилка при читанні файлу: ${error.message}`);
  }
}

function findLongestIncreasingSequence(numbers) {
  // Ініціалізуємо змінні для поточної та найдовшої зростаючої послідовностей
  let currentSequence = [numbers[0]];
  let longestSequence = [];

  // Проходимо по масиву чисел, починаючи з другого елемента
  for (let i = 1; i < numbers.length; i++) {
    // Перевіряємо, чи поточне число більше за попереднє
    if (numbers[i] > numbers[i - 1]) {
      // Якщо так, додаємо його до поточної зростаючої послідовності
      currentSequence.push(numbers[i]);
    } else {
      // Якщо ні, порівнюємо довжину поточної та найдовшої послідовностей
      // Якщо поточна довше, оновлюємо найдовшу послідовність
      if (currentSequence.length > longestSequence.length) {
        longestSequence = currentSequence.slice();
      }
      // Починаємо нову поточну зростаючу послідовність з поточного числа
      currentSequence = [numbers[i]];
    }
  }

  // Повертаємо найдовшу зростаючу послідовність
  return longestSequence;
}

function findLongestDecreasingSequence(numbers) {
  // Ініціалізуємо змінні для поточної та найдовшої спадаючої послідовностей
  let currentSequence = [numbers[0]];
  let longestSequence = [];

  // Проходимо по масиву чисел, починаючи з другого елемента
  for (let i = 1; i < numbers.length; i++) {
    // Перевіряємо, чи поточне число менше за попереднє
    if (numbers[i] < numbers[i - 1]) {
      // Якщо так, додаємо його до поточної спадаючої послідовності
      currentSequence.push(numbers[i]);
    } else {
      // Якщо ні, порівнюємо довжину поточної та найдовшої послідовностей
      // Якщо поточна довше, оновлюємо найдовшу послідовність
      if (currentSequence.length > longestSequence.length) {
        longestSequence = currentSequence.slice();
      }
      // Починаємо нову поточну спадаючу послідовність з поточного числа
      currentSequence = [numbers[i]];
    }
  }

  // Повертаємо найдовшу спадаючу послідовність
  return longestSequence;
}

function getCalculations(numbers) {
  // Створюємо копію масиву чисел та сортуємо його за зростанням
  const sortedNumbers = numbers.slice().sort((a, b) => a - b);

  // Знаходимо максимальне та мінімальне значення
  const maxNumber = sortedNumbers[sortedNumbers.length - 1];
  const minNumber = sortedNumbers[0];

  // Знаходимо медіану
  const middleIndex = Math.floor(sortedNumbers.length / 2);
  const median =
    sortedNumbers.length % 2 === 0
      ? (sortedNumbers[middleIndex - 1] + sortedNumbers[middleIndex]) / 2
      : sortedNumbers[middleIndex];

  // Знаходимо середнє значення
  const average = numbers.reduce((acc, num) => acc + num, 0) / numbers.length;

  // Знаходимо найдовшу зростаючу та спадну послідовності
  const longestIncreasingSequence = findLongestIncreasingSequence(numbers);
  const longestDecreasingSequence = findLongestDecreasingSequence(numbers);

  // Повертаємо об'єкт з обчисленими статистичними значеннями
  return {
    maxNumber,
    minNumber,
    median,
    average,
    longestIncreasingSequence,
    longestDecreasingSequence,
  };
}

async function findCalculations(filePath) {
  try {
    // Зчитуємо числа з файлу та обчислюємо статистичні значення
    const numbers = await readFile(filePath);
    return getCalculations(numbers);
  } catch (error) {
    // Виводимо повідомлення про помилку у разі необхідності та передаємо помилку далі
    console.error(error.message);
    throw error;
  }
}

// Викликаємо функцію findCalculations для файлу '10m.txt'
findCalculations('./10m.txt')
  .then((result) => {
    // Виводимо результати обчислень
    console.log('Максимум:', result.maxNumber);
    console.log('Мінімум:', result.minNumber);
    console.log('Медіана:', result.median);
    console.log('Середнє значення:', result.average);
    console.log(
      'Найдовша зростаюча послідовність:',
      result.longestIncreasingSequence
    );
    console.log(
      'Найдовша спадаюча послідовність:',
      result.longestDecreasingSequence
    );
  })
  .catch((err) => {
    // Виводимо повідомлення про помилку у разі її виникнення
    console.error('Помилка:', err.message);
  });

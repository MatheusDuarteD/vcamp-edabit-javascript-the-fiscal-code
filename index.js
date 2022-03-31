const months = {
  1: 'A', 2: 'B', 3: 'C', 4: 'D', 5: 'E', 6: 'H', 7: 'L', 8: 'M', 9: 'P', 10: 'R', 11: 'S', 12: 'T'
}

const vowels = ['a', 'e', 'i', 'o', 'u']

function fiscalCode(person) {
  // ********* EXECUÇÃO DO SOBRENOME********

  let surnameCapitalLetters = ''

  // Separando um array para as vogais e um para as consoantes do SOBRENOME
  let surnameVowels = []
  let surnameConsonants = []

  // Encontrando e inserindo vogais e consoantes do SOBRENOME em seus respectivos arrays
  for (surnameLetter of person.surname) {
    // Flag que define se é consoante ou não
    let isConsonant = 1
    for (let vowel of vowels) {
      if (surnameLetter.toLowerCase() === vowel) {
        isConsonant = 0
        surnameVowels.push(surnameLetter)
      }
    }
    if (isConsonant) {
      surnameConsonants.push(surnameLetter)
    }
  }

  // Execução se o SOBRENOME tiver menos de 3 letras
  if (person.surname.length < 3) {
    surnameCapitalLetters = surnameConsonants
      .concat(surnameVowels)
      .concat('X')
      .join('')
      .toUpperCase()
  }
  // Execução se o SOBRENOME tiver 3 ou mais consoantes
  if (surnameConsonants.length >= 3) {
    surnameCapitalLetters = surnameConsonants[0]
      .concat(surnameConsonants[1], surnameConsonants[2])
      .toUpperCase()
  } else if (surnameConsonants.length < 3 && person.surname.length >= 3) {
    // Execução se o SOBRENOME tiver menos de 3 consoantes
    surnameCapitalLetters = surnameConsonants
      .concat(surnameVowels[0])
      .join('')
      .toUpperCase()
  }

  // ********* EXECUÇÃO DO NOME********

  let nameCapitalLetters = ''
  // Separando um array para as vogais e um para as consoantes do NOME
  let nameVowels = []
  let nameConsonants = []

  // Encontrando e inserindo vogais e consoantes do NOME em seus respectivos arrays
  for (nameLetter of person.name) {
    // Flag que define se é consoante ou não
    let isConsonant = 1
    for (let vowel of vowels) {
      if (nameLetter.toLowerCase() === vowel) {
        isConsonant = 0
        nameVowels.push(nameLetter)
      }
    }
    if (isConsonant) {
      nameConsonants.push(nameLetter)
    }
  }

  // Execução se o NOME tiver menos de 3 letras
  if (person.name.length < 3) {
    nameCapitalLetters = nameConsonants
      .concat(nameVowels)
      .concat('X')
      .join('')
      .toUpperCase()
  }

  // Execução se o NOME tiver exatamente 3 consoantes
  if (nameConsonants.length === 3) {
    nameCapitalLetters = nameConsonants.join('').toUpperCase()
  } else if (nameConsonants.length < 3 && person.name.length >= 3) {
    // Execução se o NOME tiver menos de 3 consoantes
    nameCapitalLetters = nameConsonants
      .concat(nameVowels[0])
      .join('')
      .toUpperCase()
  }

  // Execução se o NOME tiver mais de 3 consoantes
  if (nameConsonants.length > 3) {
    nameCapitalLetters = nameConsonants[0]
      .concat(nameConsonants[2])
      .concat(nameConsonants[3])
      .toUpperCase()
  }

  // ********* EXECUÇÃO DO DATE OF BIRTH E DO GENDER ********

  // Separando os dois ultimos digitos do ano de nascimento
  let dateLastTwoDigits = person.dob.slice(-2)

  // Gerando letra correspondente ao mês de nascimento
  let monthOfBirth = person.dob.slice(-7, -5).replace('/', '')
  let monthOfBirthLetter = months[monthOfBirth]

  // Conseguindo o dia de nascimento
  let dayOfBirth = person.dob.slice(0, 2).replace('/', '')

  // Adicionando zero na frente do dia do nascimento caso a pessoa seja do genero masculino e dia do nascimento seja menor do que 10
  if (person.gender === 'M') {
    if (+dayOfBirth < 10) {
      dayOfBirth = '0'.concat(dayOfBirth)
    }
  }

  // Adicionando 40 ao valor de dia do nascimento caso a pessoa seja do genero feminino
  if (person.gender === 'F') {
    dayOfBirth = (+dayOfBirth + 40).toString()
  }

  // ********* FINALIZANDO ********

  // Juntando todas as informações principais em um código único
  let fiscalCode = surnameCapitalLetters.concat(
    nameCapitalLetters,
    dateLastTwoDigits,
    monthOfBirthLetter,
    dayOfBirth
  )

  return fiscalCode
}

fiscalCode({
  name: 'Al',
  surname: 'Capone',
  gender: 'M',
  dob: '17/1/1899'
})



// DEBUG
// console.log('surname Consoantes: ', surnameConsonants)
// console.log('surname Vogais: ', surnameVowels)
// console.log('surnameCapitalLetters: ', surnameCapitalLetters)
// console.log('')
// console.log('name consoantes', nameConsonants)
// console.log('name vogais', nameVowels)
// console.log('nameCapitalLetters: ', nameCapitalLetters)
// console.log('')
// console.log('dob: ', dateLastTwoDigits)
// console.log('month: ', monthOfBirth)
// console.log('monthLetter: ', monthOfBirthLetter)
// console.log('day of birth: ', dayOfBirth)
// console.log('')
// console.log('Código fiscal', fiscalCode)



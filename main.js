const readline = require('readline');
const fs = require('fs');
const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const functionToPromise = (func, ...args) => {
    return new Promise(resolve => func(...args, resolve))
}

const questionFunc = terminal.question.bind(terminal)
const questionAsync = msg => functionToPromise(questionFunc, `${msg}\n`)

const url = './residentes.json'

const fileSyncJson = (url) => {
    return fs.readFileSync(url, 'utf-8')
}

const writeFileSyncJson = (url, json) => {
    return fs.writeFileSync(url, JSON.stringify(json, null, 2), 'utf-8')
}

;
(async function main() {
    try {
        const name = await questionAsync('Digite seu nome: ');
        const age = await questionAsync('Digite sua idade: ');

        const resident = {
            name: name,
            age: Number(age)
        }
        // abrir arquivo JSON (moradores cadastrados)
        const data = JSON.parse(fileSyncJson(url));
        data.push(resident);
        
        writeFileSyncJson(url, data, 'utf-8')
        
        const residents = JSON.parse(fileSyncJson(url))

        const residentsQtd = residents.length
        const mandatoryVoters = residents.filter(voter => voter.age >= 18 && voter.age <= 69).length
        const optionalVoters = residents.filter(voter => voter.age == 16 || voter.age == 17 || voter.age >= 70).length
        const nonVoters = residents.filter(voter => voter.age < 16, 0).length
        
        return console.log(`moradores: ${residentsQtd},
        eleitores obrigatórios: ${mandatoryVoters},
        eleitores facultativos: ${optionalVoters},
        não eleitores: ${nonVoters}
        `)

    } catch (error) {
        console.log(error);
    } finally {
        terminal.close()
    }

})()

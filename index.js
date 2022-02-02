#!/usr/bin/env node 

import chalk from 'chalk'
import chalkAnimation from 'chalk-animation'
import figlet from 'figlet';
import gradient from 'gradient-string';
import inquirer from 'inquirer'
import { createSpinner } from 'nanospinner';

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r , ms)) 

async function welcome (){
    const rainBowTitle = chalkAnimation.rainbow(`
        École supérieure en Sciences et Technologies de l'Informatique et du Numérique
    `)

    await sleep();

    rainBowTitle.stop();

    console.log(`
        ${chalk.bgBlue('HOW TO PLAY')}
        I am a precess in  your computer
        If you get the question wrong I will be ${chalk.bgRed('disappointed')}
        so get the only question  ${chalk.bgGreen('right')}
    `);
}

async function askName () {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name',
        default() {
            return 'player'
        },
    });

    playerName = answers.player_name
}

async function askQst1() {
    const answers = await inquirer.prompt({
        name: 'question_1',
        type : 'list',
        message: 'How many times THE ESTIN changed the exam planning \n',
        choices : [
            'One time',
            'Two time',
            'Three time',
            'Fouth time',
            'Only Allah Knows'
        ],
    });

    return handleAnswer(answers.question_1 == 'Only Allah Knows')
}

async function handleAnswer(isCorrect) {
    const spinner = createSpinner('checking answer...').start()
    await sleep();
    if (isCorrect){
        spinner.success({text : `Nice Work ${playerName}. That's a legit answer`})
        await sleep();
        winner()
    }else {
        spinner.error({text: "Game over man"})
        process.exit(1)
    }
}

function winner(){
    console.clear()
    const msg = `Congrats ${playerName}`;

    figlet(msg , (err , data) => {
        console.log(gradient.pastel.multiline(data))
    })
}

await welcome()
await askName()
await askQst1()
#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

class Person {
    private personBehavior: string;

    constructor() {
        this.personBehavior = "";
    }

    askQuestion(personNature: string) {
        switch (personNature) {
            case "1":
                this.personBehavior = "Outgoing";
                break;
            case "2":
                this.personBehavior = "Reserved";
                break;
            default:
                this.personBehavior = "Still Undetermined";
        }
        console.log(chalk.green(`\nYour temperament is ${this.personBehavior}`));
    }

    getpersonBehavior() {
        return this.personBehavior;
    }
}

async function askQuestion() {
    let question = await inquirer.prompt({
        name: "reply",
        type: "input",
        message: chalk.rgb(64, 224, 208)(`Enter ${chalk.yellow('1')} if you enjoy socializing, or enter ${chalk.yellow('2')} if you prefer solitude: `),
    });
    MyPerson.askQuestion(question.reply);
}

class Student extends Person {
    private studentName: string;

    constructor() {
        super();
        this.studentName = "";
        super.getpersonBehavior();
    }

    get name() {
        return this.studentName;
    }

    set name(value: string) {
        this.studentName = value;
    }

    validateName(name: string): boolean {
        return /^[A-Za-z]+$/.test(name);
    }
}

let MyPerson = new Student();

async function getName() {
    await askQuestion();
    let nameInput = await inquirer.prompt({
        name: "name",
        type: "input",
        message: chalk.rgb(64, 224, 208)("Your Name Please:"),
        validate: (input: string) => MyPerson.validateName(input) ? true : "Enter alphabetical letters ",
    });
    MyPerson.name = nameInput.name;
    console.log(chalk.green(`\nYour chosen name is ${MyPerson.name} and your temperament is "${MyPerson.getpersonBehavior()}"\n`));
}
class Zodiac extends Student {
    constructor() {
        super();
    }

    validateDay(day: number): boolean {
        return !isNaN(day) && Number.isInteger(day) && day >= 1 && day <= 31;
    }

    validateMonth(month: number): boolean {
        return !isNaN(month) && Number.isInteger(month) && month >= 1 && month <= 12;
    }

    async getZodiacSign() {
        await getName();
        let birthInfo = await inquirer.prompt([
            {
                name: 'day',
                type: "number",
                message: chalk.rgb(64, 224, 208)("Enter your day of birth (1-31): "),
                validate: (number: any) => this.validateDay(number) ? true : "Enter a valid day (1-31)",
            },
            {
                name: 'month',
                type: "number",
                message: chalk.rgb(64, 224, 208)("Enter your month of birth (1-12): "),
                validate: (number: any) => this.validateMonth(number) ? true : "Enter a valid month (1-12)",
            }
        ]);
        const signOfTheStar = this.zodiacSign(birthInfo.day, birthInfo.month);
        console.log(chalk.green.bold(`\nBased on your birth date, your zodiac sign is ${chalk.cyanBright(signOfTheStar)}!`));

        let compatibilitySign = await inquirer.prompt({
            name: "compatibilitySign",
            type: "input",
            message: chalk.rgb(64, 224, 208)("Enter another zodiac sign to check compatibility:"),
            validate: (input: string) => input.trim() !== "" ? true : "Please enter a zodiac sign",
        });
        const compatibility = this.getCompatibility(signOfTheStar, compatibilitySign.compatibilitySign.trim());

        // Check compatibility message for keywords instead of full string comparison
        if (compatibility.includes("compatible")) {
            console.log(chalk.green(compatibility));
        } else if (compatibility.includes("face challenges")) {
            console.log(chalk.yellow(compatibility));
        } else {
            console.log(chalk.red(compatibility));
        }
    }

    zodiacSign(day: number, month: number): string {
        let sign = "";
        switch (month) {
            case 3:
                sign = day >= 21 ? "Aries" : "Pisces";
                break;
            case 4:
                sign = day <= 19 ? "Aries" : "Taurus";
                break;
            case 5:
                sign = day <= 20 ? "Taurus" : "Gemini";
                break;
            case 6:
                sign = day <= 20 ? "Gemini" : "Cancer";
                break;
            case 7:
                sign = day <= 22 ? "Cancer" : "Leo";
                break;
            case 8:
                sign = day <= 22 ? "Leo" : "Virgo";
                break;
            case 9:
                sign = day <= 22 ? "Virgo" : "Libra";
                break;
            case 10:
                sign = day <= 22 ? "Libra" : "Scorpio";
                break;
            case 11:
                sign = day <= 21 ? "Scorpio" : "Sagittarius";
                break;
            case 12:
                sign = day <= 21 ? "Sagittarius" : "Capricorn";
                break;
            case 1:
                sign = day <= 19 ? "Capricorn" : "Aquarius";
                break;
            case 2:
                sign = day <= 18 ? "Aquarius" : "Pisces";
                break;
            default:
                sign = "Invalid Date";
        }
        return sign;
    }

    getCompatibility(sign1: string, sign2: string): string {
        // Define compatibility 
        const compatibilityMatrix: { [key: string]: string } = {
            "Aries": "Gemini, Leo, Sagittarius, Aquarius",
            "Taurus": "Cancer, Virgo, Capricorn, Pisces",
            "Gemini": "Aries, Leo, Libra, Aquarius",
            "Cancer": "Taurus, Virgo, Scorpio, Pisces",
            "Leo": "Aries, Gemini, Libra, Sagittarius",
            "Virgo": "Taurus, Cancer, Scorpio, Capricorn",
            "Libra": "Gemini, Leo, Sagittarius, Aquarius",
            "Scorpio": "Cancer, Virgo, Capricorn, Pisces",
            "Sagittarius": "Aries, Leo, Libra, Aquarius",
            "Capricorn": "Taurus, Virgo, Scorpio, Pisces",
            "Aquarius": "Aries, Gemini, Leo, Libra",
            "Pisces": "Taurus, Cancer, Scorpio, Capricorn"
        };

        // Check compatibility 
        if (compatibilityMatrix[sign1]) {
            if (compatibilityMatrix[sign1].includes(sign2)) {
                return `${sign1} and ${sign2} are compatible. They share common traits and values.`;
            } else {
                return `${sign1} and ${sign2} may face challenges in compatibility, but with understanding and compromise, they can build a strong relationship.`;
            }
        } else {
            return `Compatibility information for ${sign1} is not available.`;
        }
    }
}


let studentZodiac = new Zodiac();
let signOfTheStar: string = ""; // Variable to store the user's zodiac sign

async function getZodiacSign() {
    await studentZodiac.getZodiacSign();
}

getZodiacSign();

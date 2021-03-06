import { BadRequest } from '@shared/Errors'

export class BoletoHelpers {
    static generateVerifyDigit(code: string): number {
        const arrCode = code.split('').reverse()
        const factorSumDigits = arrCode.reduce((sum, digit, index) => {
            const factor = (index + 1) % 2 === 0 ? 1 : 2
            const result = factor * parseInt(digit, 10)
            return `${result}`.split('').reduce((innerSum, element) => innerSum + parseInt(element, 10), sum)
        }, 0)
        const generatedAutomateDigit = Math.abs((factorSumDigits % 10) - 10)

        return generatedAutomateDigit === 10 ? 0 : generatedAutomateDigit
    }

    static verifyFieldWithDigit({ code, digit, field }: { code: string; digit: number; field: string }): void {
        if (BoletoHelpers.generateVerifyDigit(code) !== digit)
            throw new BadRequest({ data: { message: `The automatic verification failed for the ${field} field` } })
    }

    static splitBankBoleto(code: string): string[] {
        const [firstField] = code.match(/^\d{10}/)
        const [secondField] = code.match(/(?<=^\d{10})\d{11}/)
        const [thirdField] = code.match(/(?<=^\d{10}\d{11})\d{11}/)
        const [fourthField] = code.match(/(?<=^\d{10}(\d{11}){2})\d/)
        const [fifthField] = code.match(/(?<=^\d{10}(\d{11}){2}\d)\d+/)

        return [firstField, secondField, thirdField, fourthField, fifthField]
    }

    static splitConcessionaryBoleto(code: string): string[] {
        const [firstField, secondField, thirdField, fourthField] = code.match(/\d{12}/g)

        return [firstField, secondField, thirdField, fourthField]
    }

    static generateBankBarcodeVerificationDigit(code: string): number {
        const factors = [2, 3, 4, 5, 6, 7, 8, 9]

        const arrCode = code.split('').reverse()

        const multiplyAndSum = arrCode.reduce((sum, element, index) => {
            const factor = factors[index % factors.length]
            return sum + parseInt(element, 10) * factor
        }, 0)

        const rest = multiplyAndSum % 11

        const result = 11 - rest

        if (result === 11 || result === 10 || result === 0) return 1

        return result
    }

    static verifyOurNumberDigit({ code, digit }: { code: string; digit: number }): void {
        const factors = [9, 8, 7, 6, 5, 4, 3, 2]

        const arrCode = code.split('').reverse()

        const multiplyAndSum = arrCode.reduce((sum, element, index) => {
            const factor = factors[index % factors.length]
            return sum + parseInt(element, 10) * factor
        }, 0)

        let result = multiplyAndSum % 11
        if (result === 10) result = 9

        if (result !== digit)
            throw new BadRequest({ data: { message: `The automatic verification failed for the OurNuber field` } })
    }

    static parseValue(code: string): string {
        const [integers, decimals] = code.split(/(?<=\d+)(?=\d{2}$)/)
        return `${parseInt(integers, 10)}.${decimals}`
    }

    static parseExpirationDate(code: number): string {
        const baseDate = new Date('2000-07-03')
        const today = new Date()
        const day = 864e5
        const interval = 8999

        const days = Math.floor((today.getTime() - baseDate.getTime()) / day)

        const factor = days / interval
        // On the last year of a cycle will try fix the date for the next cycle
        const factorMultiplier = factor > 0.959 && code < 1366 ? Math.ceil(factor) : Math.floor(factor)

        return new Date(baseDate.getTime() + interval * factorMultiplier * day + day * (code - 1000))
            .toISOString()
            .split('T')[0]
    }

    static verifyConcessionaryExpirationDate(date: string): string {
        try {
            const [year] = date.match(/^\d{4}/)
            const [month] = date.match(/(?<=^\d{4})\d{2}/)
            const [day] = date.match(/(?<=^\d{6})\d+/)

            const dateToTest = `${year}-${month}-${day}`
            const testDate = new Date(dateToTest).toISOString()
            // eslint-disable-next-line no-self-compare
            if (testDate.startsWith(dateToTest)) return dateToTest
            return 'Barcode has no expiration date'
        } catch (_) {
            return 'Barcode has no expiration date'
        }
    }
}

import { BarCodeGeneration } from './BarCodeGeneration'

function makeSut() {
    const sut = new BarCodeGeneration()
    return { sut }
}

describe('BarCodeGeneration useCase specs', () => {
    it('If the code have 47 digits length should execute only bank flux', () => {
        const { sut } = makeSut()
        const bankBoletoFluxSpy = jest.spyOn(sut, 'bankBoletoFlux')
        const concessionaryBoletoFluxSpy = jest.spyOn(sut, 'concessionaryBoletoFlux')

        const result = sut.execute('21290001192110001210904475617405975870000002000')
        expect(result.barCode.length).toBe(44)
        expect(bankBoletoFluxSpy).toHaveBeenCalledTimes(1)
        expect(concessionaryBoletoFluxSpy).toHaveBeenCalledTimes(0)
    })
    it('If the code have 48 digits length should execute only concessionary flux', () => {
        const { sut } = makeSut()
        const bankBoletoFluxSpy = jest.spyOn(sut, 'bankBoletoFlux')
        const concessionaryBoletoFluxSpy = jest.spyOn(sut, 'concessionaryBoletoFlux')

        const result = sut.execute('836300000053157800863019653978624019100220176190')
        expect(result.barCode.length).toBe(44)
        expect(bankBoletoFluxSpy).toHaveBeenCalledTimes(0)
        expect(concessionaryBoletoFluxSpy).toHaveBeenCalledTimes(1)
    })
})

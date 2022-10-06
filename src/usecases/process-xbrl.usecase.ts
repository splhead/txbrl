import fs from 'fs'
import path from 'path'
import { XMLParser, XMLBuilder } from 'fast-xml-parser'

class ProcessXBRLUseCase {
  public async execute(): Promise<void> {
    const caminhoDoArquivo = path.join(__dirname, '..', 'template', 'modelo.xml')
    fs.readFile(caminhoDoArquivo, (erro, dados) => {
      const tradutorXML = new XMLParser({ ignoreAttributes: false, ignoreDeclaration: true })
      const construtorXML = new XMLBuilder({ ignoreAttributes: false })
      const objetoXML = tradutorXML.parse(dados)
      //console.log(objetoXML, '\n')

      const xbrlTag = Object.keys(objetoXML)[0]

      const xbrlElemento = {
        [xbrlTag]: {}
      }

      const arrayXBRL = Object.entries(objetoXML[xbrlTag])

      const xbrlAttributos = arrayXBRL.filter(linha => linha[0].includes('@_'))

      // adiciona os atributos
      xbrlAttributos.forEach(linha => {
        Object.assign(xbrlElemento[xbrlTag], { [linha[0]]: linha[1] })
      })

      const xbrlFilhos = arrayXBRL.filter(linha => !linha[0].includes('@_'))

      xbrlFilhos.forEach(linha => {
        Object.assign(xbrlElemento[xbrlTag], { [linha[0]]: linha[1]})
      })

      const saida = construtorXML.build(xbrlElemento)
      console.log(saida)
    })
  }
}

export { ProcessXBRLUseCase }

// type Structure<T extends string> = Partial<Record<T, Structure<T>>>

// type Exemplo2<T1 extends string, T2 extends string> = `${T1}:${T2}`

// type Exemplo3 = Exemplo2<string, string>
// type Exemplo = Structure<Exemplo3>

// const exemplo: Exemplo = { 'teste:dasdf': { 'test:asdf': 2 } }

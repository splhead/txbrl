import fs from 'fs'
import path from 'path'
import { XMLParser, XMLBuilder } from 'fast-xml-parser'

type Elemento = {
  [K: string]: Elemento | Array<Elemento> | string
}
type ParsedElement = {
  [K: string]: Elemento | [ParsedElement] | string
}
// type First<T extends Element> = {
//   [K in keyof T]: T[K] extends [infer Head, ...Array<infer Tail>] ? [Head extends Element ? First<Head> : never] : never
// }

function getFirstChild(element: Elemento): ParsedElement {
  const entries = Object.entries(element)

  return Object.fromEntries(
    entries.map(([key, value]) => {
      if (key === 'gl-cor:accountMainID') {
        console.log(value)
      }

      if (Array.isArray(value)) {
        const [head] = value

        return [key, [getFirstChild(head)]]
      }
      if (typeof value === 'string' || typeof value === 'number') {
        return [key, value]
      }
      return [key, getFirstChild(value)]
    })
  )
}

// console.log(
//   JSON.stringify(
//     getFirstChild({
//       first: [{ second: { third: 'hello third' } }, { second2: 'hello' }]
//     })
//   )
// )
class ProcessXBRLUseCase {
  private eObjeto(valor: unknown): boolean {
    return valor !== null && !Array.isArray(valor) && typeof valor === 'object'
  }

  public async execute(): Promise<void> {
    const caminhoDoArquivo = path.join(
      __dirname,
      '..',
      'template',
      'modelo.xml'
    )
    fs.readFile(caminhoDoArquivo, (erro, dados) => {
      const tradutorXML = new XMLParser({
        ignoreAttributes: false,
        ignoreDeclaration: true
      })
      const construtorXML = new XMLBuilder({ ignoreAttributes: false })
      const objetoXML = tradutorXML.parse(dados)
      //console.log(objetoXML, '\n')

      const xbrlTag = Object.keys(objetoXML)[0]

      const objetoXBRL = {
        [xbrlTag]: {}
      }

      const arrayXBRL = Object.entries(objetoXML[xbrlTag])

      // obtem os atributos
      const xbrlAttributos = arrayXBRL.filter(([nome]) => nome.startsWith('@_'))

      // adiciona os atributos
      xbrlAttributos.forEach(([nome, valor]) => {
        Object.assign(objetoXBRL[xbrlTag], { [nome]: valor })
      })

      const xbrlFilhos = arrayXBRL.filter(([nome]) => !nome.startsWith('@_'))

      const element = Object.fromEntries(xbrlFilhos) as ParsedElement

      const xbrlSimplificado = getFirstChild(element)
      console.log('Testando', JSON.stringify(xbrlSimplificado))
      Object.assign(objetoXBRL[xbrlTag], xbrlSimplificado)

      // xbrlFilhos.forEach(([nome, valor]) => {

      //   console.log({ [nome]: valor }, this.eObjeto(valor))
      //   // if (nome === 'gl-cor:accountingEntries') {
      //   //this.simplificaObjeto({ [nome]: valor })
      //   Object.assign(objetoXBRL[xbrlTag], { [nome]: valor })
      //   // }
      // })

      //console.log('\n\n\n', objetoXBRL)
      const saida = construtorXML.build(objetoXBRL)
      const caminhoDoArquivoSaida = path.join(
        __dirname,
        '..',
        'template',
        'saida.xml'
      )
      fs.writeFile(caminhoDoArquivoSaida, saida, (erro) => {
        if (erro) {
          console.error(erro)
        }
      })

      //console.log(saida)
    })
  }
}

export { ProcessXBRLUseCase }

// type Structure<T extends string> = Partial<Record<T, Structure<T>>>

// type Exemplo2<T1 extends string, T2 extends string> = `${T1}:${T2}`

// type Exemplo3 = Exemplo2<string, string>
// type Exemplo = Structure<Exemplo3>

// const exemplo: Exemplo = { 'teste:dasdf': { 'test:asdf': 2 } }

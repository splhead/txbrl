import fs from 'fs'
import path from 'path'
import { XMLParser, XMLBuilder } from 'fast-xml-parser'

type Element = {
  [K: string]: Element | Array<Element> | string
}
type ParsedElement = {
  [K: string]: Element | [ParsedElement] | string
}
// type First<T extends Element> = {
//   [K in keyof T]: T[K] extends [infer Head, ...Array<infer Tail>] ? [Head extends Element ? First<Head> : never] : never
// }

// console.log(
//   JSON.stringify(
//     getFirstChild({
//       first: [{ second: { third: 'hello third' } }, { second2: 'hello' }]
//     })
//   )
// )
class ProcessXBRLUseCase {
  private simplifyObject(element: Element): ParsedElement {
    const entries = Object.entries(element)

    return Object.fromEntries(
      entries.map(([key, value]) => {
        if (Array.isArray(value)) {
          const [head] = value

          if (!head) throw new Error(`Arquivo inválido! ${key}`)

          return [key, [this.simplifyObject(head)]]
        }
        if (typeof value === 'string' || typeof value === 'number') {
          return [key, value]
        }
        return [key, this.simplifyObject(value)]
      })
    )
  }

  private isObject(valor: unknown): boolean {
    return valor !== null && !Array.isArray(valor) && typeof valor === 'object'
  }

  public async execute(): Promise<void> {
    // TODO: Configurar e carregar o datasource
    const caminhoDoArquivo = path.join(
      __dirname,
      '..',
      'template',
      'modelo.xml'
    )
    fs.readFile(caminhoDoArquivo, (erro, dados) => {
      const parser = new XMLParser({
        ignoreAttributes: false,
        ignoreDeclaration: true
      })
      const builder = new XMLBuilder({ ignoreAttributes: false })
      const objectXML = parser.parse(dados)
      //console.log(objetoXML, '\n')

      const xbrlTag = Object.keys(objectXML)[0]

      const objectXBRL = {
        [xbrlTag]: {}
      }

      const arrayXBRL = Object.entries(objectXML[xbrlTag])

      // obtem os atributos
      const xbrlAttributes = arrayXBRL.filter(([name]) => name.startsWith('@_'))

      // adiciona os atributos
      xbrlAttributes.forEach(([name, value]) => {
        Object.assign(objectXBRL[xbrlTag], { [name]: value })
      })

      const xbrlChildren = arrayXBRL.filter(([name]) => !name.startsWith('@_'))

      const element = Object.fromEntries(xbrlChildren) as ParsedElement

      const xbrlSimplified = this.simplifyObject(element)
      //console.log('Testando', JSON.stringify(xbrlSimplificado))
      Object.assign(objectXBRL[xbrlTag], xbrlSimplified)

      // xbrlFilhos.forEach(([nome, valor]) => {

      //   console.log({ [nome]: valor }, this.eObjeto(valor))
      //   // if (nome === 'gl-cor:accountingEntries') {
      //   //this.simplificaObjeto({ [nome]: valor })
      //   Object.assign(objetoXBRL[xbrlTag], { [nome]: valor })
      //   // }
      // })

      //console.log('\n\n\n', objetoXBRL)
      const out = builder.build(objectXBRL)
      const outPath = path.join(__dirname, '..', 'template', 'saida.xml')
      fs.writeFile(outPath, out, (error) => {
        if (error) {
          console.error(error)
        }
      })

      //console.log(out)
    })
  }
}

export { ProcessXBRLUseCase }

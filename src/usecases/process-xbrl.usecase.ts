import fs from 'fs'
import path from 'path'
import { XMLParser, XMLBuilder } from 'fast-xml-parser'

class ProcessXBRLUseCase {
  private eObjeto(valor: unknown): boolean {
    return valor !== null && !Array.isArray(valor) && typeof valor === 'object'
  }

  private mesclaObjetos(
    objeto: Record<string, unknown>,
    objeto2: Record<string, unknown>
  ): Record<string, unknown> {
    Object.assign(objeto, objeto2)
    return objeto
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

      const xbrlElemento = {
        [xbrlTag]: {}
      }

      const arrayXBRL = Object.entries(objetoXML[xbrlTag])

      // obtem os atributos
      const xbrlAttributos = arrayXBRL.filter((posicao) =>
        posicao[0].startsWith('@_')
      )

      // adiciona os atributos
      xbrlAttributos.forEach((posicao) => {
        Object.assign(xbrlElemento[xbrlTag], { [posicao[0]]: posicao[1] })
      })

      const xbrlFilhos = arrayXBRL.filter(
        (posicao) => !posicao[0].startsWith('@_')
      )

      xbrlFilhos.forEach((posicao) => {
        console.log({ [posicao[0]]: posicao[1] }, this.eObjeto(posicao[1]))
        if (posicao[0] === 'gl-cor:accountingEntries') {
          Object.assign(xbrlElemento[xbrlTag], { [posicao[0]]: posicao[1] })
        }
      })

      console.log('\n\n\n', xbrlElemento)
      //const saida = construtorXML.build(xbrlElemento)
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
